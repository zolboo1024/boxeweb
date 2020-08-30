"use strict";

import React from 'react';

import Search from './Search';
import Status from './Status';
import UsersList from './UsersList';
import User from './User';

/**
 * Our top-level component. Using React's "functional" component style:
 * https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components
 *
 * This could've easily been a subclass of React.Component though.
 *
 * Notice that none of the child components have props directly passed to them.
 * It doesn't have to be this way, but we're trying to show that the child components
 * will have access to the StoreComponent's state, props, and actions as props regardless of what's
 * manually passed to them.
 *
 */
function Page(props) {

    return (
        <div className="component-page">
            <div className="container">

                <div className="row">
                    <div className="col-xs-12">
                        <Search />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <Status />
                    </div>
                </div>

                <div className="row">

                    <div className="col-xs-6">
                        <UsersList />
                    </div>

                    <div className="col-xs-6">
                        <User />
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 *
 * The Page component is not actually using any props derived out of the StoreComponent,
 * so we do not need to wrap it. All of its child components that are SubscriberComponents
 * will still function regardless.
 */
export default Page;