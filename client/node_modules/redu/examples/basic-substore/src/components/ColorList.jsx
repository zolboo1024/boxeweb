"use strict";
import React from 'react';
import { createSubscriber } from 'redu';
import Color from './Color';

function undoButton(props) {

    if (!props.showUndoButton) {
        return null;
    }

    return (
        <button className="btn" style={{background: 'transparent'}} onClick={e => props.undo()}>
            <span className="glyphicon glyphicon-circle-arrow-left" />
        </button>
    );
}

function ColorList(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <h3>
                        {undoButton(props)}
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

export default createSubscriber(ColorList, (colorListSubStoreState, colorListSubStoreProps, colorListSubStoreActions) => {

    return {
        selectedColor: colorListSubStoreState.selectedColor,
        colors: colorListSubStoreProps.colors,
        showUndoButton: colorListSubStoreProps.hasHistory(),
        undo: colorListSubStoreActions.undo
    };
});