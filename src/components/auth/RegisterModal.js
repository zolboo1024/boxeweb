import React, { Component } from 'react';
import {register} from '../../actions/authActions';
import {connect} from 'react-redux';
import store from '../../store';
import {Alert} from 'reactstrap';
import {clearErrors} from '../../actions/errorActions';
import PropTypes from 'prop-types';
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
      msg: ''
    }
  }

  componentDidMount() {
    console.log("Component mounted");
    const {isAuthenticated} = this.props;
    if(isAuthenticated) {
      this.props.history.push('/')
    }
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
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  //When the component updates and the reducers throw an error, we save it in the component state.
  //handling it in better ways.
  //when the errors get cleared, this component gets updated.
  componentDidUpdate(prevProps) {
    const {error} = this.props;
    if(error !== prevProps.error) {
      //Check for register error
      if(error.id === 'REGISTER_FAIL') {
        this.setState({msg: error.msg});
      } else {
        this.setState({msg: null});
      }
    }
    const {isAuthenticated} = this.props;
    if(isAuthenticated) {
      this.props.history.push('/')
    }
  }
  render() {
    return (
    <div>
      {this.state.msg ? (<Alert color = "danger">{this.state.msg}</Alert>) : null}
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
//MApping state to props means that these values are actually attacked to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  {register, clearErrors}
) (RegisterModal);
