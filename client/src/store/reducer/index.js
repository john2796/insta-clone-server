import { combineReducers } from "redux";
import auth from "./authReducer";
import errors from "./errorReducers";
import insta from "./instaCommentReducer";

export default combineReducers({
  auth,
  errors,
  insta
});
