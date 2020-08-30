"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

import ColorListStore from './stores/ColorListStore';

ReactDOM.render(
    React.createElement(ColorListStore), // notice we are mounting the ColorListStore component, not our ColorList component.
    document.getElementById('root')
);