"use strict";

import React from 'react';

import {createSubscriber} from 'redu';

/**
 * A list item component specific to repos.
 */
function ReposListItem(props) {

    return (
        <div className="component-repos-list-item">

            <div className="media">

                <div className="media-body">
                    <a href={props.repo.html_url} target="_blank">
                        <h4
                            className="media-heading"
                        >
                            {props.repo.name}
                        </h4>
                    </a>
                    <p>
                        {props.repo.description}
                    </p>
                </div>

            </div>
        </div>
    );

}

export default createSubscriber(ReposListItem, (userSubStoreState, userSubStoreProps, userSubStoreActions) => {

    return {
        displayRepo: userSubStoreActions.displayRepo
    };
});