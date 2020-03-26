import React, { Component } from 'react';
import axios from 'axios';
import {tokenConfig} from '../../actions/authActions';
import {register} from '../../actions/authActions';
import {connect} from 'react-redux';
import store from '../../store';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    console.log("Component mounted");
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const thisUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }

    console.log(thisUser);
    //Attempt to create the user. If it is not created properly, we throw an
    //error and if it is, we save the token in a local storage.
    store.dispatch(register(thisUser));
  }

  render() {
    return (
    <div>
      <h3>Register</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text"
              required
              name="usernam"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
          </input>

        </div>
        <div className="form-group">
          <label>Email: </label>
          <input  type="email"
              required
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Register" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  {register}
) (RegisterModal);
