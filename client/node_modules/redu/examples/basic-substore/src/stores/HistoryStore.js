"use strict";

import { createStore } from 'redu';

import ColorListSubStore from './ColorListSubStore';

/**
 * Now we have a higher-level StoreComponent.
 *
 * The tree looks like this now: HistoryStore > ColorListSubStore > ColorListStore > ColorList
 *
 * @type {StoreComponent}
 */
const HistoryStore = createStore(ColorListSubStore);

/**
 * We want to use the ColorListStore's initiaState as the first item in our history,
 * so we need to get the ColorListStore back from the ColorListSubStore that wraps it.
 */
const ColorListStore = ColorListSubStore.WrappedComponent;

/**
 * The HistoryStore's state will keep track of the ColorListStore's state history via an array.
 *
 * @type {{history: [*]}}
 */
HistoryStore.initialState = {
    history: [ColorListStore.initialState] // use the ColorListStore's initialState as the first item in the history.
};

HistoryStore.actions = {
    /**
     * Check if there is a history to undo.
     *
     * @returns {boolean}
     */
    hasHistory() {
        return this.state.history.length > 1;
    },
    /**
     * Adds the current state to the history.
     *
     * @param {{}} state
     * @param {function} getState
     */
    addToHistory(state, getState) {

        this.setState((prevState) => {
            return {
                history: prevState.history.concat(state)
            };
        }, () => {
            getState(this.state.history[this.state.history.length - 1]);
        });
    },
    /**
     * Removes the latest state from the history.
     *
     * @param getState
     */
    removeFromHistory(getState) {

        this.setState((prevState) => {

            let history = prevState.history.filter((state, index) => {
                return index < prevState.history.length - 1;
            });

            if (!history.length) {
                history.push(ColorListStore.initialState);
            }

            return { history };

        }, () => {
            getState(this.state.history[this.state.history.length - 1]);
        });
    }
};

/**
 * We don't want changes to the history doubly-render the app.
 *
 * The tree looks like this now: DoNotRenderHistoryStoreComponent > ColorListSubStore > ColorListStore > ColorList
 *
 */
export default class DoNotRenderHistoryStore extends HistoryStore {

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
}