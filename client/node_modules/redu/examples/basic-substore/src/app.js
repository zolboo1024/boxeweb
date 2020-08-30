"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import HistoryStore from './stores/HistoryStore';

ReactDOM.render(
    React.createElement(HistoryStore),
    document.getElementById('root')
);