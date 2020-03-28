import {GET_ERRORS, CLEAR_ERRORS} from './types';

// RETURN CLEAR_ERRORS
export const returnErrors = (msg,status, id=null) => {
  return {
    type: GET_ERRORS,
    payload: {msg, status, id}
  }
}

//Clear errors
export const clearErrors = () => {
  console.log("Clear errors called");
  return {
    type: CLEAR_ERRORS
  };
};
