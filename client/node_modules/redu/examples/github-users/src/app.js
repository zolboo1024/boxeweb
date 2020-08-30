/**
 * The entrypoint of our example app.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import PageStore from './stores/PageStore';

ReactDOM.render(
    React.createElement(PageStore), // notice we are mounting the PageStore component, not our Page component.
    document.getElementById('root')
);