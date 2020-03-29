import React, { Component } from "react";

class SearchBox extends Component {
    render() {
        return (
            <div className="card serach-box">
                <div className="card-content">
                    <div className="content">
                        <h1 className="is-size-3">
                            Click and Store.
                         </h1>
                        <div className="form">
                            <div class="field search-box-input">
                                <label class="label">WHERE</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select>
                                            <option>Select</option>
                                            <option>New York</option>
                                            <option>Los Angeles</option>
                                            <option>Philadelphia</option>
                                            <option>San Francisco</option>
                                            <option>Washington D.C</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="card-footer">
                    <div className="card-footer-item">
                        <button class="button search-box-btn is-link is-fullwidth">
                            Search
                        </button>
                    </div>
                </footer>
            </div>
        );
    }
}


export default SearchBox;