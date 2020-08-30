/**
 * Redu is comprised of two functions:
 * createStore(Component), and createSubscriber(Component, toProps).
 * Both functions take in a React.Component, and create and return wrapper components around them.
 *
 * createStore(Component) creates and returns a StoreComponent.
 * createSubscriber(Component, toProps) creates and returns a SubscriberComponent.
 *
 * StoreComponents wrap your top-level component and manages the application-level state.
 *
 * SubscriberComponents can derive props directly out of the StoreComponent's state, props, and action functions,
 * and pass them down to the components that they wrap.
 *
 * SubscriberComponents are linked to a StoreComponent via React's "context" feature:
 * https://facebook.github.io/react/docs/context.html
 */

"use strict";
import React from 'react'; // peer dependency
import PropTypes from 'prop-types'; // bundled dependency

/**
 * For use with setting up React contexts.
 */
const contextTypes = {
    storeComponent: PropTypes.object.isRequired
};

/**
 * Creates a StoreComponent that wraps the given component.
 *
 * The given component should be a top-level component.
 * Generally you're only going to want to have one usage of this,
 * to wrap your top-most component.
 *
 * All SubscriberComponent descendants of this StoreComponent will be able to derive any props they need out of
 * this StoreComponent's state, props, and actions.
 *
 * @param {React.Component|SubscriberComponent} Component
 * @returns {StoreComponent}
 */
export function createStore(Component) {

    /**
     * The initial state of the StoreComponent. It should represent a complete picture of your application-level state.
     *
     * @type {{}}
     * @private
     */
    let _initialState = {};

    /**
     * An object containing action functions that will be bound to the StoreComponent,
     * and made available through the "actions" property. Action functions will generally call "this.setState",
     * which will update the StoreComponent's state.
     *
     * @type {{}}
     * @private
     */
    let _actions = {};

    class StoreComponent extends React.Component {

        constructor(props) {

            super(props);

            this.state = Object.assign({}, _initialState); // set the initial state.
            this.actions = {}; // make the action functions available via the "actions" property.

            Object.keys(_actions).forEach(action => {

                this.actions[action] = _actions[action].bind(this); // bind to the StoreComponent.
            });
        }

        /**
         * Use React's "context" feature to maintain a link from the StoreComponent to SubscriberComponents.
         *
         * @returns {{storeComponent: StoreComponent}}
         */
        getChildContext() {

            return { storeComponent: this };
        }

        /**
         * Render the supplied component, and pass through any props.
         *
         * @returns {*|Element}
         */
        render() {

            return React.createElement(Component, this.props);
        }

        /**
         * You may directly set the initial state.
         *
         * @param {{}} initialState
         */
        static set initialState(initialState) {
            _initialState = initialState;
        }

        /**
         * You may directly set the actions.
         *
         * @param {{}} actions
         */
        static set actions(actions) {
            _actions = actions;
        }

        /**
         * You can get the initial state back.
         *
         * @returns {{}}
         */
        static get initialState() {
            return _initialState;
        }

        /**
         * You can get the unbound action functions back.
         *
         * @returns {{}}
         */
        static get actions() {
            return _actions;
        }

        /**
         * Necessary to use React's "context" feature.
         *
         * @returns {*}
         */
        static get childContextTypes() {

            return contextTypes;
        }

        /**
         * You can get the wrapped component back.
         *
         * @returns {React.Component|SubscriberComponent}
         * @constructor
         */
        static get WrappedComponent() {
            return Component;
        }
    }

    return StoreComponent;
}


/**
 * Creates a SubscriberComponent that wraps the given component.
 *
 * All SubscriberComponents have the ability to derive any props they need out of
 * this StoreComponent's state, props, and actions, via the "toProps" function.
 *
 * @param {React.Component|StoreComponent} Component
 * @param {function} toProps
 * @returns {SubscriberComponent}
 */
export function createSubscriber(Component, toProps = (storeState, storeProps, storeActions) => {return {};}) {

    class SubscriberComponent extends React.Component {

        /**
         * Get the StoreComponent out of the context.
         * Then, use the toProps function to convert its state, props, and actions
         * into the props that the wrapped component has asked for.
         */
        render() {

            const { storeComponent } = this.context;

            if (!storeComponent) {
                throw new Error(
                    'No StoreComponent found as a parent of this SubscriberComponent. ' +
                    'Did you mean to use the WrappedComponent instead?'
                );
            }

            const { state, props, actions } = storeComponent;

            return React.createElement(Component, Object.assign(
                toProps(state, props, actions),
                this.props
            ));
        }

        /**
         * You can get the toProps function back.
         *
         * @returns {function}
         */
        static get toProps() {
            return toProps;
        }

        /**
         * Necessary to use React's "context" feature.
         *
         * @returns {*}
         */
        static get contextTypes() {

            return contextTypes;
        }

        /**
         * You can get the wrapped component back.
         *
         * @returns {React.Component|StoreComponent}
         * @constructor
         */
        static get WrappedComponent() {
            return Component;
        }
    }

    return SubscriberComponent;
}
