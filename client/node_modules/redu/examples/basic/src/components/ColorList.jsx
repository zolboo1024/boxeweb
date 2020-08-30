"use strict";
import React from 'react';
import { createSubscriber } from 'redu';
import Color from './Color';

/**
 * The top-level component.
 *
 * Notice that it derives its props from the ColorListStore's state and props.
 */
function ColorList(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <h3>
                        The selected color is <span className="badge">{props.selectedColor}</span>
                    </h3>
                    <ul className="list-group">
                        {props.colors.map(color =>
                            <Color key={color} color={color} />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
/**
 * The "toProps" function is inlined here,
 * and allows ColorList to access the selectedColor state as well as the colors prop.
 */
export default createSubscriber(ColorList, (colorListStoreState, colorListStoreProps) => {

    return {
        selectedColor: colorListStoreState.selectedColor,
        colors: colorListStoreProps.colors
    };
});