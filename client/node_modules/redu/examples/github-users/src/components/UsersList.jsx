"use strict";

import React from 'react';
import UsersListItem from './UsersListItem';

import {createSubscriber} from 'redu';


class UsersList extends React.Component {

    /**
     * Utilizes the "usersListItems" state property from the StoreComponent,
     * but is renamed to "users" when derived as a prop. See the "createSubscriber"
     * call at the bottom to examine how this happens.
     *
     * @returns {Array}
     */
    usersList() {

        return this.props.users.map(user => {

            return (
                <li key={user.id} className="list-group-item">
                    <UsersListItem user={user} />
                </li>
            );
        });
    }

    render() {

        return (
            <div className="component-users-list">
                <ul className="list-group" style={{marginTop: 0}}>
                    {this.usersList()}
                </ul>
            </div>
        );
    }
}

/**
 * Wrap the UsersList component in a SubscriberComponent.
 */
export default createSubscriber(UsersList, (pageStoreState, pageStoreProps, pageStoreActions) => {

    /**
     * The resulting SubscriberComponent will take this function and execute it against
     * the StoreComponent's state, props, and actions. The resulting object will get merged into
     * the UsersList component's props, which is how we have the "users" prop,
     * without being explicitly passed in by the Page component.
     *
     * This is also how we turned "usersListItems" from the StoreComponent's state into "users"
     * in the UsersList component's props.
     */

    return {
        users: pageStoreState.usersListItems || []
    }
});