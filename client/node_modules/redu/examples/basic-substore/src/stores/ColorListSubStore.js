/**
 * Note that, in order to highlight differences,
 * the original comments from the basic example have been removed.
 */

"use strict";

import { createStore, createSubscriber } from 'redu';

import ColorList from '../components/ColorList';

const ColorListStore = createStore(ColorList);

ColorListStore.defaultProps = {
    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
};

ColorListStore.initialState = {
    selectedColor: ColorListStore.defaultProps.colors[0]
};

ColorListStore.actions = {
    /**
     * This helper action will set the ColorListStore's state,
     * as well as add that state to the HistoryStore.
     * 
     * @param {{}} state
     */
    setStateAndHistory(state = {}) {

        this.props.addToHistory(state, (state) => {
            this.setState(state);
        });
    },
    /**
     * Will change the selectedColor.
     * Note that it uses the setStateAndHistory helper action.
     * 
     * @param {string} color
     */
    changeColor(color) {

        this.actions.setStateAndHistory({
            selectedColor: color
        });
    },
    /**
     * Will undo the previous state change.
     */
    undo() {
        this.props.removeFromHistory((state) => {
            this.setState(state);
        });
    }
};

/**
 * We will wrap our StoreComponent in a SubscriberComponent to create a "SubStoreComponent",
 * which will subscribe to a higher-level StoreComponent called HistoryStore,
 * which will allow us to record and manage the original StoreComponent's state history.
 *
 * The tree looks like this now: ColorListSubStore > ColorListStore > ColorList
 *
 * @type {SubscriberComponent}
 */
export default createSubscriber(ColorListStore, (historyStoreState, historyStoreProps, historyStoreActions) => {

    return {
        hasHistory: historyStoreActions.hasHistory,
        addToHistory: historyStoreActions.addToHistory,
        removeFromHistory: historyStoreActions.removeFromHistory
    };
});