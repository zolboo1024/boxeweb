"use strict";

import { createStore } from 'redu'; // will create a StoreComponent wrapping the top-most component.

import ColorList from '../components/ColorList'; // our top-most component.

/**
 * Create our ColorListStore StoreComponent.
 *
 * @type {StoreComponent}
 */
const ColorListStore = createStore(ColorList);

/**
 * These are the props that we'd like our StoreComponent to have.
 * Consequently, all our actions and our SubscriberComponents
 * will also gain access to these props.
 *
 * This is a handy place to put utilities and config that will be used across the application.
 */
ColorListStore.defaultProps = {
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
};

/**
 * This is the full representation of the application-level state that we would like to keep track of
 * across all components.
 */
ColorListStore.initialState = {
    selectedColor: ColorListStore.defaultProps.colors[0]
};

/**
 * The actions you can perform to change the StoreComponent's state.
 *
 * They are all bound to the StoreComponent, so you have access to it's setState function,
 * props, and other action functions.
 */
ColorListStore.actions = {
    /**
     * Change the color.
     *
     * @param {string} color
     */
    changeColor(color) {

        this.setState({ selectedColor: color });
    }
};

export default ColorListStore;