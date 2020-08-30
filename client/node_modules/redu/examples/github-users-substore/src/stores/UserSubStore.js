/**
 * This is our UserSubStore.
 *
 * This store can be thought of as a sub (or mini) app within the larger app.
 * It is sufficiently isolated to warrant separating out into its own store.
 *
 * The hierarchy is PageStore => UserSubStore.
 */

"use strict";
import _debounce from 'lodash.debounce';

import { createStore, createSubscriber } from 'redu';

import User from '../components/User'; // the child component

/**
 * Create our UserStore StoreComponent.
 *
 * @type {StoreComponent}
 */
const UserStore = createStore(User);

UserStore.defaultProps = {
    utils: {
        searchUserReposApi(userName, query) {
            return fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+user:${userName}`)
                .then((resp) => resp.json());
        }
    },
    entity: 'repo' // this gives context to generic components like the Search component
};

/**
 * Notice that this state is similar to the PageStore's state.
 * This is to facilitate using generic components like the Search component,
 * which can be used as a child of both the PageStore and the UserStore.
 */
UserStore.initialState = {
    searchQuery: '',
    listItems: null
};


UserStore.actions = {

    reset() {

        this.actions.search();
    },

    search(searchQuery = '') {

        this.setState({ searchQuery });

        this.actions.debouncedSearch(searchQuery);
    },

    debouncedSearch: _debounce(function debouncedSearch(searchQuery) {

        this.setState({
            searchQuery,
            listItems: null // indicates that we're currently fetching these
        });

        this.props.utils.searchUserReposApi(this.props.user.login, searchQuery).then((results) => {

            this.setState({
                listItems: results.items || []
            });
        });

    }, 500)
};

/**
 * We now create the UserSubStore, by subscribing the UserStore to the PageStore.
 * The UserStore will now have access to the selected user.
 */
export default createSubscriber(UserStore, (pageStoreState, pageStoreProps, pageStoreActions) => {

    return {
        user: pageStoreState.userToDisplay
    };
});
