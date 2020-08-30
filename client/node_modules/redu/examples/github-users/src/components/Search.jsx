"use strict";

import React from 'react';

import {createSubscriber} from 'redu';


class Search extends React.Component {

    constructor(props) {

        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(e) {

        const searchQuery = e.currentTarget.value;

        this.props.search(searchQuery); // an action derived from the StoreComponent.
    }

    /**
     * Below, we use "query" prop, which is actually derived from
     * the StoreComponent's "searchQuery" state.
     *
     * Examine the "createSubscriber" function below to see how this derivation happens.
     */
    render() {

        return (
            <div className="component-search" style={{paddingTop: 20}}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        value={this.props.query}
                        onChange={this.onSearchChange}
                        placeholder="GitHub user search"
                    />
                </div>
            </div>
        );
    }
}

/**
 * Wrap the Search component in a SubscriberComponent.
 */
export default createSubscriber(Search, (pageStoreState, pageStoreProps, pageStoreActions) => {

    /**
     * The resulting SubscriberComponent will take this function and execute it against
     * the StoreComponent's state, props, and actions. The resulting object will get merged into
     * the Search component's props, which is how we have "query" prop,
     * without it being explicitly passed in by the Page component.
     *
     * This is also how we turned "searchQuery" from the StoreComponent's state into "query"
     * in the Search component's props.
     *
     */

    return {
        query: pageStoreState.searchQuery,
        search: pageStoreActions.search
    };
});