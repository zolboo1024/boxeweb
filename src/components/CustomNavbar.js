import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, NavItem, Icon} from 'react-materialize';

//The Link component is a pre-made component imported as a part of the router package.
//So you can just specify "to" prop and then make the button.

//The router for the front end is different in a sense that they don't really
//do the same thing. Here, it just makes component bases on what the router says.
//In the backend, you can make REST requests.
//But that can only happen in this case where the backend and the frotend are
//running on different ports.
//*If there are only one "port"(just a )
class CustomNavbar extends Component {
  render() {
    return (<Navbar alignLinks="right" brand={<a className = "brand-logo" href = "/" > boxE</a>} id="mobile-nav" menuIcon={<Icon> menu</Icon>} options={{
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true
      }}>
      <NavItem href="/">
        Spaces
      </NavItem>
      {
        this.props.isAuthenticated
          ? (<NavItem href="/create">
            Create Space Log
          </NavItem>)
          : null
      }
      {
        this.props.isAuthenticated
          ? (<NavItem href="/logout">
            Log out
          </NavItem>)
          : (<NavItem href="/register">
            Register
          </NavItem>)
      }
      {
        this.props.isAuthenticated
          ? null
          : (<NavItem href="/login">
            Login
          </NavItem>)
      }
    </Navbar>);
  }
}
//MApping state to props means that these values are actually attacked to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps)(CustomNavbar);
