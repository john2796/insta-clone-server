import { combineReducers } from "redux";
import instagramReducer from "./instagramReducer";
import auth from "./authReducer";
import errors from "./errorReducers";
import insta from "./instaCommentReducer";

export default combineReducers({
  instagram: instagramReducer,
  auth,
  errors,
  insta
});
