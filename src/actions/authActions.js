import axios from 'axios';
import {returnErrors} from './errorActions';
import authReducer from '../reducers/authReducer';
import errorReducer from '../reducers/errorReducer';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch,getState) => {
  //User loading
  //Dispatch calls this action. Once it reaches the reducer,
  //it contains nothing in the payload. Just an empty file with a type
  var action = {
    type: USER_LOADING
  };
  dispatch(action);
  //Once it gets the user, then it dispatches something that actually
  //contains something.
  axios.get('http://localhost:3000/login/user/', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};
//Register a users
export const register = ({username,email,password}) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }
  const body = JSON.stringify({username, email, password});
  console.log(body)
  axios.post('http://localhost:3000/users/', body, config)
    .then(res=>{
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      console.log("User created");
    }).catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    });
}
//Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application"
    }
  }
  //If we find the token, then it takes it and puts it in the
  //config. Config is what is ultimately made into an HTTP request.
  if(token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}
