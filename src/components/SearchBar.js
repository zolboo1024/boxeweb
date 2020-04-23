import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import { setTokenSourceMapRange } from 'typescript';
import axios from "axios";

const SearchBar = () =>  {
const [searchState, setSearchState] = useState("");
const mapkey = process.env.REACT_APP_MY_GMAPS_KEY;
const handleClick = async () => {
    /* const inputLocation = await axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json", {params: {
key: mapkey,
input: searchState,
inputtype: "textquery",
fields: "geometry"
}}); */ //better to do this in backend
axios.get(`localhost:3000/spaces/search/${searchState}`);
//console.log(inputLocation.data.candidates[0].geometry.location);
}

   return(
    <div>
        <input  value={searchState} onChange={e => setSearchState(e.target.value)} type="text" className="input" placeholder="Search..." />
        <button onClick={handleClick}> Search</button>
    </div>
   )
}


const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps)(SearchBar);