/**
 * The Store of our example app, which allows you to search for and display GitHub users,
 * just like the github-users example. Unlike that example, this one also allows you to search
 * through the selected user's repos.
 *
 * Also like the github-users example, this file should provide an accurate representation of this app,
 * however, there is a sub-store "below" this store, which represents a sufficiently isolated portion
 * of this app's functionality.
 *
 * Note that, in order to highlight differences,
 * the original comments from the github-users example have been removed.
 */

"use strict";

import 'whatwg-fetch';
import _debounce from 'lodash.debounce';

import Page from '../components/Page';
import { createStore } from 'redu';

const PageStore = createStore(Page);

PageStore.defaultProps = {
    utils: {
        searchUsersApi(query) {
            return fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`)
                .then((resp) => resp.json());
        }
    },
    entity: 'user' // this gives context to generic components like the Search component
};

PageStore.initialState = {
    searchQuery: '',
    userToDisplay: null,
    listItems: null
};

PageStore.actions = {

    displayUser(userToDisplay) {

        this.setState({ userToDisplay });
    },

    reset() {

        this.setState(PageStore.initialState);
    },

    search(searchQuery) {

        this.setState({ searchQuery });

        this.actions.debouncedSearch(searchQuery);
    },

    debouncedSearch: _debounce(function debouncedSearch(searchQuery) {

        this.setState({
            searchQuery,
            listItems: null // indicates that we're currently fetching these
        });

        this.props.utils.searchUsersApi(searchQuery).then((results) => {

            this.setState({
                listItems: results.items || []
            });
        });

    }, 500)
};

export default PageStore;
