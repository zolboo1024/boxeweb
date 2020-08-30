"use strict";

import React from 'react';

import {createSubscriber} from 'redu';

/**
 * This is a more generic version of the UsersList component from the github-users example.
 * It is able to be used as both a list of users and as a list of repos.
 */
class List extends React.Component {

    makeList() {

        return this.props.listItems.map(listItem => {

            const props = {
                [this.props.entity]: listItem
            };
            return (
                <li key={listItem.id} className="list-group-item">
                    <this.props.listItemComponent {...props} />
                </li>
            );
        });
    }

    render() {

        return (
            <div className="component-list">
                <ul className="list-group" style={{marginTop: 0}}>
                    {this.makeList()}
                </ul>
            </div>
        );
    }
}
/**
 * Regardless of which store it is subscribed to, it will pull out the relevant listItems
 * and the entity ("user", or "repo").
 */
export default createSubscriber(List, (storeState, storeProps, storeActions) => {

    return {
        listItems: storeState.listItems || [],
        entity: storeProps.entity
    }
});