import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import { setTokenSourceMapRange } from 'typescript';

const SearchBar = () =>  {
const [searchState, setSearchState] = useState("");

   return(
    <div>
        <input  value={searchState} onChange={e => setSearchState(e.target.value)} type="text" className="input" placeholder="Search..." />
    </div>
   )
}


const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps)(SearchBar);