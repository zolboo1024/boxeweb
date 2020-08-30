"use strict";

import React from 'react';

import ColorOptions from './ColorOptions';

/**
 * Displays the color.
 */
function Color(props) {

    return (
        <li className="list-group-item">
            <p>This color is <span style={{color: props.color}}>{props.color}</span></p>
            <ColorOptions color={props.color} />
        </li>
    );
}

export default Color;