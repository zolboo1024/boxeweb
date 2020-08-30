"use strict";

import React from 'react';
import { createSubscriber } from 'redu';

function ColorOptions(props) {
    return (
        <div>
            <a className="btn" onClick={e => props.changeColor(props.color)}>
                Replace {props.selectedColor} with {props.color}
            </a>
        </div>
    );
}

export default createSubscriber(ColorOptions, (colorListSubStoreState, colorListSubStoreProps, colorListSubStoreActions) => {

    return {
        selectedColor: colorListSubStoreState.selectedColor,
        changeColor: colorListSubStoreActions.changeColor
    };
});