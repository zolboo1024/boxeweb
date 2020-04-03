import React, { Component } from 'react';
import axios from 'axios';
import {tokenConfig} from '../actions/authActions';
import {loadUser} from '../actions/authActions';
import {connect} from 'react-redux';
import store from '../store';
import {tokenConfigJS} from './tokenConfig'
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

class CreateSpace extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      location: '',
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const thisspace = {
      username: this.props.user.username,
      description: this.state.description,
      location: this.state.location,
    }
    console.log(this.props.token);
    axios.post('http://localhost:3000/spaces/add', thisspace, tokenConfigJS(this.props.token))
      .then(res => console.log(res.data));
  }

  render() {
    return (
    <div>
      <h3>Create New Space</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Location: </label>
          <input
              type="text"
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create Space Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  {loadUser}) (CreateSpace);
