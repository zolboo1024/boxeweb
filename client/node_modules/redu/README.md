# Redu

Simple application-level state management for React apps.

&nbsp;

## What is it?

Redu brings React's component-level state management up to the application level.

As far as application-level state management solutions go, Redux is a simple solution.  At least, that's the idea.  The reality is that while action creators, actions, and reducers are simple, open-ended concepts, their implementations can become unwieldy, and often leaves us with a lot of boilerplate.

What _is_ simple, is React's built-in **component-level** state management, where events trigger action functions, which in turn call `setState`, to update that component's state:
```jsx harmony
class Counter extends React.Component {
  constructor(props) {
      super(props);
      this.state = { value: 0 }; // initial state
      this.increment = this.increment.bind(this);
  }
  
  increment() { // action function, which calls this.setState
    this.setState(prevState => ({
        value: prevState.value + 1 // hooray, the state is updated!
    }));       
  }
  
  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}
```

No reducers, no string constants, just _event_ => _action function_ => _setState_.

Redu performs this exact same flow, but at the **application level**, where a single "store" component's state acts as your application-level state, and any of its descendant "subscriber" components may derive props from the store component's state and props, which can include action functions to request application-level state changes.

&nbsp;

## How does it work?

Redu is comprised of two functions: `createStore(Component)`, and `createSubscriber(Component, toProps)`.

Both functions take in a `React.Component`, and create and return wrapper components around them.

`createStore(Component)` creates and returns a `StoreComponent`. `StoreComponents` wrap your top-level component and manages the application-level state.

`createSubscriber(Component, toProps)` creates and returns a `SubscriberComponent`. `SubscriberComponents` can derive props directly out of the `StoreComponent's` state, props, and action functions via the `toProps` function, and pass them down to the components that they wrap.

With just these two concepts, you can keep your application state in a single `StoreComponent`, and any descendant components can "cut the line" to receive exactly what they need from that `StoreComponent`.

`StoreComponents` and `SubscriberComponents` are just regular `React.Components` themselves, so you get all the familiarity, freedom, and tooling that "vanilla" React provides, but with the powerful benefits of application-level state management.


### Quickstart Example

Imagine an app with the following structure:
```jsx harmony
<ComponentA>
    <ComponentB>
        <ComponentC />
    </ComponentB>
</ComponentA>
```
We could create a `StoreComponent` like so:
```jsx harmony
import { createStore } from 'redu';

/**
* Wrap your top-most component (ComponentA) in a StoreComponent.
*/
const StoreComponent = createStore(ComponentA);
/**
* This is your application-level state. This will become the StoreComponent's state.
*/
StoreComponent.initialState = {
    greeting: 'Hello'
};
/**
* These are the actions you can perform to modify the StoreComponent's state.
*/
StoreComponent.actions = {
    changeGreeting() {
        
        this.setState({ greeting: 'Hola' });
    }
};
/**
* Here we are exporting the StoreComponent that wraps ComponentA, which will end up being mounted to the DOM.
*/
export default StoreComponent;
```

And have components subscribe to that store like so:
```jsx harmony
import { createSubscriber } from 'redu';
/**
* ComponentC, though three levels down from the StoreComponent, 
* will be able to utilize and even modify that StoreComponent's state via its derived props.
*/
function ComponentC(props) {
    return (
        <div>
            <p>{props.greeting} World!</p>
            <button onClick={props.changeGreeting}>Translate</button>
        </div>
    );
}
/**
* This is a function that can take in the StoreComponent's state, props, and actions,
* and derive and return an object that will be passed to ComponentC as props.
*/
const toProps = (storeState, storeProps, storeActions) => {
                   
    return {
        greeting: storeState.greeting,
        changeGreeting: storeActions.changeGreeting
    };
}

/**
* Here we are actually exporting a SubscriberComponent that wraps ComponentC, which will end up being used in place of ComponentC seamlessly.
*/
export default createSubscriber(ComponentC, toProps);

```
`createSubscriber's` first argument is `ComponentC`, the component you wish to wrap in a `SubscriberComponent`.

The second argument is the `toProps` function that is used to derive and return a single object based on the `StoreComponent's` state, props, and actions.

This object is then used by the `SubscriberComponent` to pass down to `ComponentC` as props. `ComponentC` is now able to use aspects of the application-level state (`greeting`), as well as request changes to that state (`changeGreeting`).

Note that, while we only chose to showcase `ComponentC`, we could create subscribers out of `ComponentA` or `ComponentB` as well, should they need to derive anything from the store.

&nbsp;

## What does Redu solve?

### Problem #1: threading props down multiple levels

In the [Quickstart Example](#quickstart-example), we had an app with the following structure:
```jsx harmony
<ComponentA>
    <ComponentB>
        <ComponentC />
    </ComponentB>
</ComponentA>
```
Without Redu, if `ComponentC` wanted to utilize props or state from the top-level component, `ComponentA`, you'd have to pass them down first to `ComponentB`, then to the `ComponentC`. Also, if you wanted to modify `ComponentA's` state from `ComponentC`, you'd have to pass down an action function in the same manner, so that `ComponentC` would be able to call it.

With Redu, the application-level state is stored in the `StoreComponent` which wraps `ComponentA`, and `ComponentC` gets wrapped in a `SubscriberComponent`, which can pass down anything to `ComponentC` that it needs from the `StoreComponent` as props, skipping the need to pass down anything to `ComponentB`:
```jsx harmony
<StoreComponent>
    <ComponentA>
        <ComponentB>
            <SubscriberComponent>
                <ComponentC />
            </SubscriberComponent>
        </ComponentB>
    </ComponentA>
</StoreComponent>
```
This same idea can be applied to any child component, regardless of how far down the tree they are.


### Problem #2: Scattered application state

Redu can eliminate as much component-level state as you want, and combine them into a single application-level state object. Your descendant components can then pull out or modify whichever properties of this state that they wish. 

Condensing your application's state into a single object can be beneficial for quickly understanding what your app
does and how it does it, along with other bonuses like being able to serialize/save/deserialize your app state.
 
That said, there's nothing wrong with having component-level state. You have the freedom to choose what state should be application-level and what should be component-level.


### Problem #3: Redux boilerplate

It's no secret that implementing a new stateful feature in Redux can be a chore. You create action creators, actions, and reducers, and if what you need to do is asynchronous, there are even more hoops to jump through.

With Redu, the process is almost exactly the same as creating a stateful feature in a single "vanilla" component, with the addition of implementing simple `toProps` functions to allow ancestor components to derive what they need out of the store as props.

&nbsp;

## Installation, API and more examples and concepts

Continue reading [here](https://github.com/shaunpersad/redu/wiki).