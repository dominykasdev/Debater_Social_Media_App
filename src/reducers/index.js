import { combineReducers } from "redux";
import oAuthReducer from "./oAuthReducer";
import userReducer from "./userReducer";
import { reducer as FormReducer } from 'redux-form';

export default combineReducers({
  auth: oAuthReducer,
  form: FormReducer,
  user: userReducer
});
