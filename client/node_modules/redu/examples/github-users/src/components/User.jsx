"use strict";

import React from 'react';

import {createSubscriber} from 'redu';

/**
 * Another "functional" component style.
 *
 * Utilizes the "userToDisplay" state property from the StoreComponent,
 * but is renamed to "user" when derived as a prop. See the "createSubscriber"
 * call at the bottom to examine how this happens.
 */
function User(props) {

    if (!props.user) {
        return null;
    }

    return (
        <div className="component-user">

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{props.user.login}</h3>
                </div>
                <div className="panel-body">
                    <img style={{width: '100%'}} src={props.user.avatar_url} />
                    <p style={{paddingTop: 15}}>
                        <a
                            className="btn btn-default"
                            href={props.user.html_url}
                            target="_blank"
                        >
                            profile on GitHub
                        </a>
                    </p>
                </div>
            </div>

        </div>
    );
}

/**
 * Wrap the User component in a SubscriberComponent.
 */
export default createSubscriber(User, (pageStoreState, pageStoreProps, pageStoreActions) => {

    /**
     * The resulting SubscriberComponent will take this function and execute it against
     * the StoreComponent's state, props, and actions. The resulting object will get merged into
     * the User component's props, which is how we have the "user" prop,
     * without being explicitly passed in by the Page component.
     *
     * This is also how we turned "userToDisplay" from the StoreComponent's state into "user"
     * in the User component's props.
     *
     */

    return {
        user: pageStoreState.userToDisplay
    };
});