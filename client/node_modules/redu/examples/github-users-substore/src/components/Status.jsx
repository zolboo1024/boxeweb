"use strict";

import React from 'react';

import {createSubscriber} from 'redu';

/**
 * This is a more generic version of the Status component from the github-users example.
 * It determines the status of both the users search and the repos search.
 */
class Status extends React.Component {

    makeStatus() {

        if (this.props.listItems && this.props.listItems.length) {

            let suffix = 's';
            if (this.props.listItems.length === 1) {
                suffix = '';
            }

            return `Found ${this.props.listItems.length} ${this.props.entity}${suffix}.`;
        }

        if (!this.props.searchQuery) {
            return `Please enter a GitHub ${this.props.entity}.`;
        }

        if (this.props.listItems === null) {
            return 'Searching...';
        }
    }

    render() {

        return (
            <div className="component-status">

                <p>
                    {this.makeStatus()}
                    <button
                        className="btn btn-default"
                        onClick={this.props.reset}
                        style={{marginLeft: 10, display: this.props.listItems ? 'inline-block': 'none'}}
                    >
                        reset
                    </button>
                </p>
            </div>
        );
    }
}

/**
 * Regardless of which store it is subscribed to, it will pull out the relevant search query,
 * the relevant list items, entity ("user", or "repo"), and the relevant reset action.
 */
export default createSubscriber(Status, (storeState, storeProps, storeActions) => {

    return {
        searchQuery: storeState.searchQuery,
        listItems: storeState.listItems,
        entity: storeProps.entity,
        reset: storeActions.reset
    };
});