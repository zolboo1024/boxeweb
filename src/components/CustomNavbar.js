import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from './auth/RegisterModal';
import {connect} from 'react-redux';
import store from '../store';

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
class CustomNavbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">boxE</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Spaces</Link>
          </li>
          {
          this.props.isAuthenticated?
          (
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Space Log</Link>
          </li>
          )
          :
          null
          }
          {
          this.props.isAuthenticated
          ?
          (<li className="navbar-item">
          <Link to="/logout" className="nav-link">Logout</Link>
          </li>)
          :
          (
          <li className="navbar-item">
          <Link to="/register" className="nav-link">Register</Link>
          </li>
          )
          }
          {
          this.props.isAuthenticated
          ?
          null
          :
          (
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
          </li>
          )
          }
        </ul>
        </div>
      </nav>
    );
  }
}
//MApping state to props means that these values are actually attacked to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps
) (CustomNavbar);
