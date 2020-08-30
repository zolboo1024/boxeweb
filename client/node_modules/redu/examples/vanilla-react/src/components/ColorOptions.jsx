"use strict";

import React from 'react';

function ColorOptions(props) {
    return (
        <div>
            <span>Replace {props.selectedColor} with {props.color}?</span>
            <button onClick={e => props.changeColor(props.color)}>yes</button>
        </div>
    );
}

export default ColorOptions;