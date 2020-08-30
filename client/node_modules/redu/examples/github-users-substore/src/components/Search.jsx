"use strict";

import React from 'react';

import {createSubscriber} from 'redu';

/**
 * This is a more generic version of the Search component from the github-users example.
 * It is able to search both users and repos.
 */
class Search extends React.Component {

    constructor(props) {

        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(e) {

        const searchQuery = e.currentTarget.value;

        this.props.search(searchQuery);
    }

    render() {

        return (
            <div className="component-search" style={{paddingTop: 20}}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        value={this.props.query}
                        onChange={this.onSearchChange}
                        placeholder={`GitHub ${this.props.entity} search`}
                    />
                </div>
            </div>
        );
    }
}

/**
 * Regardless of which store it is subscribed to, it will pull out the relevant search query,
 * the entity ("user", or "repo"), and the relevant search action.
 */
export default createSubscriber(Search, (storeState, storeProps, storeActions) => {

    return {
        query: storeState.searchQuery,
        entity: storeProps.entity,
        search: storeActions.search
    };
});