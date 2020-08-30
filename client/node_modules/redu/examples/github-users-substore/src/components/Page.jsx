"use strict";

import React from 'react';

import Search from './Search';
import Status from './Status';
import List from './List';
import UsersListItem from './UsersListItem';
import UserSubStore from '../stores/UserSubStore';

/**
 * Notice that, unlike the Page component in the github-users example,
 * this one is using the UserSubStore component instead of the User component.
 *
 * It is also using the more generic List component instead of the UsersList component.
 */
function Page() {

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
                        <List listItemComponent={UsersListItem} />
                    </div>

                    <div className="col-xs-6">
                        <UserSubStore />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;