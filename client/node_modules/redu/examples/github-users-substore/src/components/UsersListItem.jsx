"use strict";

import React from 'react';

import {createSubscriber} from 'redu';

/**
 * A list item component specific to users.
 */
class UsersListItem extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            clicked: false
        };

        this.onClickOnUser = this.onClickOnUser.bind(this);
    }

    onClickOnUser(e) {

        e.preventDefault();

        this.setState({
            clicked: true
        }, () => {

            this.props.displayUser(this.props.user);
        });
    }

    render() {

        return (
            <div className="component-users-list-item">

                <div className="media">

                    <a href="#" onClick={this.onClickOnUser}>

                        <div className="media-left">
                            <img
                                style={{width: 50}}
                                className="media-object"
                                src={this.props.user.avatar_url}
                            />
                        </div>
                        <div className="media-body">
                            <h4
                                className="media-heading"
                                style={{color: this.state.clicked ? 'purple': 'inherit'}}
                            >
                                {this.props.user.login}
                            </h4>
                        </div>

                    </a>
                </div>
            </div>
        );
    }
}

export default createSubscriber(UsersListItem, (pageStoreState, pageStoreProps, pageStoreActions) => {

    return {
        displayUser: pageStoreActions.displayUser
    };
});