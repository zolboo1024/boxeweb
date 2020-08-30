import axios from 'axios';
import {returnErrors} from './errorActions';
import {clearErrors} from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //User loading
  //Dispatch calls this action. Once it reaches the reducer,
  //it contains nothing in the payload. Just an empty file with a type
  var action = {
    type: USER_LOADING
  };
  dispatch(action);
  //Once it gets the user, then it dispatches something that actually
  //contains something.
  axios.get('/login/user/', tokenConfig(getState)).then(res => {
    dispatch({type: USER_LOADED, payload: res.data});
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({type: AUTH_ERROR});
  });
};
//Register a users
export const register = ({username, email, password}) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({username, email, password});
  console.log(body)
  axios.post('/users/', body, config).then(res => {
    dispatch({type: REGISTER_SUCCESS, payload: res.data});
    dispatch(clearErrors());
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({type: REGISTER_FAIL});
  });
}

//Logs out a user
export const logout = () => (dispatch, getState) => {
  try {
    dispatch({type: LOGOUT_SUCCESS})
  } catch (err) {
    dispatch(returnErrors('Could not log you out', '', 'LOGOUT_FAIL'));
    dispatch({type: LOGOUT_FAIL});
  }
}

//Logs in a user
export const login = ({email, password}) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({email, password});
  console.log(body)
  axios.post('/login/', body, config).then(res => {
    dispatch({type: LOGIN_SUCCESS, payload: res.data})
    dispatch(clearErrors());
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({type: LOGIN_FAIL});
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
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}
