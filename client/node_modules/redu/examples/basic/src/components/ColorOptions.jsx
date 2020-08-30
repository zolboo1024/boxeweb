"use strict";

import React from 'react';
import { createSubscriber } from 'redu';

/**
 * This is the lowest-level component in the tree.
 * Notice that it derives its props from the ColorListStore's state and actions.
 */
function ColorOptions(props) {
    return (
        <div>
            <a className="btn" onClick={e => props.changeColor(props.color)}>
                Replace {props.selectedColor} with {props.color}
            </a>
        </div>
    );
}
/**
 * The "toProps" function is inlined here,
 * and allows ColorOptions to access the selectedColor state as well as the changeColor action.
 */
export default createSubscriber(ColorOptions, (colorListStoreState, colorListStoreProps, colorListStoreActions) => {

    return {
        selectedColor: colorListStoreState.selectedColor,
        changeColor: colorListStoreActions.changeColor
    };
});