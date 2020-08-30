import React, {Component} from 'react';
import {login} from '../../actions/authActions';
import {connect} from 'react-redux';
import store from '../../store';
import {Alert} from 'reactstrap';
import {clearErrors} from '../../actions/errorActions';
import PropTypes from 'prop-types';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      msg: ''
    }
  }

  componentDidMount() {
    const {isAuthenticated} = this.props;
    if (isAuthenticated) {
      this.props.history.push('/')
    };
    console.log("Component mounted");
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const thisUser = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(thisUser);
    //Attempt to create the user. If it is not created properly, we throw an
    //error and if it is, we save the token in a local storage.
    store.dispatch(login(thisUser));
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  //When the component updates and the reducers throw an error, we save it in the component state.
  //handling it in better ways.
  //when the errors get cleared, this component gets updated.
  componentDidUpdate(prevProps) {
    const {error} = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({msg: error.msg});
      } else {
        this.setState({msg: null});
      }
    }
    const {isAuthenticated} = this.props;
    if (isAuthenticated) {
      this.props.history.push('/')
    }
  }
  render() {
    var logincss = {
      'margin': '100'
    };
    return (<div>
      {
        this.state.msg
          ? (<Alert color="danger">{this.state.msg}</Alert>)
          : null
      }
      <h3 style={{textAlign: "center"}}>Login</h3>
      <form onSubmit={this.onSubmit} style={logincss}>
        <div className="form-group">
          <label>Email:
          </label>
          <input type="email" required="required" name="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail}/>
        </div>
        <div className="form-group">
          <label>Password:
          </label>
          <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
        </div>
        <div className="form-group" style={{textAlign: "center"}}>
          <input type="submit" value="Login" className="btn btn-primary"/>
        </div>
      </form>
    </div>)
  }
}
//MApping state to props means that these values are actually attacked to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated, error: state.error});

export default connect(mapStateToProps, {login, clearErrors})(LoginModal);
