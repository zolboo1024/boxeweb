import {GET_ERRORS, CLEAR_ERRORS} from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null
}
//Basically a complex type of state for React. Once the state changes, it updates.
//And action includes what kind of changes are made.
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.msg,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
