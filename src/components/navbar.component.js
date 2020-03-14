import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from './auth/RegisterModal';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
//The Link component is a pre-made component imported as a part of the router package.
//So you can just specify "to" prop and then make the button.

//The router for the front end is different in a sense that they don't really
//do the same thing. Here, it just makes component bases on what the router says.
//In the backend, you can make REST requests.
//But that can only happen in this case where the backend and the frotend are
//running on different ports.
//*If there are only one "port"(just a )
export default class CustomNavbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">boxE</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Spaces</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Space Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
