"use strict";

import React from 'react';
import { createStore, createSubscriber } from '../redu';

import { mount, shallow, render } from 'enzyme';
import chai from 'chai';

const expect = chai.expect;

describe('redu', function() {

    describe('createStore(Component: React.Component): StoreComponent', function() {

        it('returns a StoreComponent', function() {

            class Component extends React.Component {}

            const StoreComponent = createStore(Component);
            expect(StoreComponent.name).to.equal('StoreComponent');
        });

        describe('StoreComponent', function() {

            describe('StoreComponent.initialState: Object', function() {

                it('sets the initial state of the StoreComponent', function() {

                    class Component extends React.Component {}

                    const StoreComponent = createStore(Component);

                    StoreComponent.initialState = {
                        foo: 'bar'
                    };

                    const store = React.createElement(StoreComponent);
                    const wrapper = shallow(store);
                    const instance = wrapper.instance();

                    expect(instance.state).to.have.property('foo', 'bar');
                });

                it('does not modify any future state', function() {

                    class Component extends React.Component {}

                    const StoreComponent = createStore(Component);

                    StoreComponent.initialState = {
                        foo: 'bar'
                    };

                    const store = React.createElement(StoreComponent);
                    const wrapper = shallow(store);
                    const instance = wrapper.instance();

                    expect(instance.state).to.have.property('foo', 'bar');
                    instance.setState({
                        foo: 'baz'
                    }, () => {
                        expect(instance.state).to.have.property('foo', 'baz');
                    });
                });

                it('will not change the state of a component if it is modified', function() {

                    class Component extends React.Component {}

                    const StoreComponent = createStore(Component);

                    StoreComponent.initialState = {
                        foo: 'bar'
                    };

                    const store = React.createElement(StoreComponent);
                    const wrapper = shallow(store);
                    const instance = wrapper.instance();

                    expect(instance.state).to.have.property('foo', 'bar');

                    StoreComponent.initialState.foo = 'baz';

                    expect(instance.state).to.have.property('foo', 'bar');

                    instance.setState({
                        foo: 'qux'
                    }, () => {
                        expect(instance.state).to.have.property('foo', 'qux');
                    });
                });
            });

            describe('StoreComponent.actions: Object', function() {

                it('sets the actions of the StoreComponent, accessible via the "actions" property', function() {

                    class Component extends React.Component {}

                    const StoreComponent = createStore(Component);

                    StoreComponent.actions = {
                        foo() {}
                    };

                    const store = React.createElement(StoreComponent);
                    const wrapper = shallow(store);
                    const instance = wrapper.instance();

                    expect(instance.actions).to.have.property('foo').and.is.a('function');
                });

                it('these actions are bound to the StoreComponent', function() {

                    class Component extends React.Component {}

                    const StoreComponent = createStore(Component);

                    StoreComponent.actions = {
                        foo() {
                            expect(this).to.be.an.instanceof(StoreComponent);
                        }
                    };

                    const store = React.createElement(StoreComponent);
                    const wrapper = shallow(store);
                    const instance = wrapper.instance();

                    expect(instance.actions).to.have.property('foo').and.is.a('function');
                    instance.actions.foo();
                });

                it('will not change the actions of a component if it is modified', function() {

                    class Component extends React.Component {}

                    const StoreComponent = createStore(Component);

                    StoreComponent.actions = {
                        foo() {
                            expect(this).to.be.an.instanceof(StoreComponent);
                        }
                    };

                    const store = React.createElement(StoreComponent);
                    const wrapper = shallow(store);
                    const instance = wrapper.instance();

                    expect(instance.actions).to.have.property('foo').and.is.a('function');
                    instance.actions.foo();

                    StoreComponent.actions.foo = () => {
                        throw new Error('Oops!');
                    };

                    instance.actions.foo();
                });
            });

            describe('StoreComponent.WrappedComponent: React.Component', function() {

                it('returns the component wrapped by the StoreComponent', function() {

                    class Component extends React.Component {}

                    const StoreComponent = createStore(Component);

                    expect(StoreComponent.WrappedComponent).to.equal(Component);
                });
            });
        });
    });

    describe('createSubscriber(Component: React.Component, toProps: function): SubscriberComponent', function() {

        it('returns a SubscriberComponent', function() {

            class Component extends React.Component {}

            const SubscriberComponent = createSubscriber(Component);
            expect(SubscriberComponent.name).to.equal('SubscriberComponent');
        });

        describe('toProps(storeState: Object, storeProps: Object, storeActions: Object): Object', function() {

            it('gives you access to the state, props, and actions of the StoreComponent', function() {

                let corge = false;

                class ComponentB extends React.Component {
                    render() {
                        return React.createElement('div');
                    }
                }

                const SubscriberComponent = createSubscriber(ComponentB, (state, props, actions) => {

                    expect(state).to.have.property('foo', 'bar');
                    expect(props).to.have.property('baz', 'qux');
                    expect(actions).to.have.property('quux').and.is.a('function');
                    actions.quux();
                    expect(corge).to.equal(true);

                    return {};
                });

                class ComponentA extends React.Component {
                    render() {
                        return React.createElement(SubscriberComponent)
                    }
                }

                const StoreComponent = createStore(ComponentA);
                StoreComponent.initialState = {
                    foo: 'bar'
                };
                StoreComponent.defaultProps = {
                    baz: 'qux'
                };
                StoreComponent.actions = {
                    quux() {
                        corge = true;
                    }
                };

                const store = React.createElement(StoreComponent);
                const wrapper = render(store);
            });

            it('returns an object that will be passed as props to the wrapped component', function() {

                class ComponentB extends React.Component {
                    render() {

                        expect(this.props).to.have.property('foo', 'bar');
                        return React.createElement('div');
                    }
                }

                const SubscriberComponent = createSubscriber(ComponentB, (state) => {

                    return state;
                });

                class ComponentA extends React.Component {
                    render() {
                        return React.createElement(SubscriberComponent)
                    }
                }

                const StoreComponent = createStore(ComponentA);
                StoreComponent.initialState = {
                    foo: 'bar'
                };

                const store = React.createElement(StoreComponent);
                const wrapper = render(store);
            });

        });

        describe('SubscriberComponent', function() {

            it('can be used at any level deep, without intermediate SubscriberComponent', function() {

                class ComponentC extends React.Component {
                    render() {

                        expect(this.props).to.have.property('foo', 'bar');
                        return React.createElement('div');
                    }
                }

                const SubscriberComponent = createSubscriber(ComponentC, (state) => {

                    return state;
                });

                class ComponentB extends React.Component {
                    render() {

                        return React.createElement(SubscriberComponent);
                    }
                }

                class ComponentA extends React.Component {
                    render() {
                        return React.createElement(ComponentB)
                    }
                }

                const StoreComponent = createStore(ComponentA);
                StoreComponent.initialState = {
                    foo: 'bar'
                };

                const store = React.createElement(StoreComponent);
                const wrapper = render(store);
            });

            describe('StoreComponent.WrappedComponent: React.Component', function() {

                it('returns the component wrapped by the SubscriberComponent', function() {

                    class Component extends React.Component {}

                    const SubscriberComponent = createSubscriber(Component);

                    expect(SubscriberComponent.WrappedComponent).to.equal(Component);
                });
            });
        });
    });
});