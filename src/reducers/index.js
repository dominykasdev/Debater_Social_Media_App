import { combineReducers } from "redux";
import oAuthReducer from "./oAuthReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import { reducer as FormReducer } from 'redux-form';

export default combineReducers({
  auth: oAuthReducer,
  form: FormReducer,
  user: userReducer,
  post: postReducer
});
