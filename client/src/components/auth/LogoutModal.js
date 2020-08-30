import React, { Component } from 'react';
import {logout} from '../../actions/authActions';
import {connect} from 'react-redux';
import store from '../../store';
import {Alert} from 'reactstrap';
import {clearErrors} from '../../actions/errorActions';
import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

class LogoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    }
  }

  componentDidMount() {
    console.log("Component mounted");
    store.dispatch(logout());
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  //When the component updates and the reducers throw an error, we save it in the component state.
  //handling it in better ways.
  //when the errors get cleared, this component gets updated.
  componentDidUpdate(prevProps) {
    const {error} = this.props;
    if(error !== prevProps.error) {
      //Check for register error
      if(error.id === 'LOGOUT_FAIL') {
        this.setState({msg: error.msg});
      } else {
        this.setState({msg: null});
      }
    }
  }
  render() {
    return (
    <div>
      {this.state.msg ? (<Alert color = "danger">{this.state.msg}</Alert>)
                      : (<Alert color = "success">You are logged out!</Alert>)}
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
  {logout, clearErrors}
) (LogoutModal);
