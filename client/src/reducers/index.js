import { combineReducers } from 'redux'; //a class that combines reducers.
//also can be used as a function
//import spaceReducer from './spaceReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import spaceReducer from './spaceReducer';
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  space: spaceReducer
});
