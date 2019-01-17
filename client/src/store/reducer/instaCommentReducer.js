import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT,
  COMMENT_ERRORS
} from "../action/types";

const initialState = {
  comments: [],
  errors: {}
};
export default function instaCommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return {
        ...state,
        comments: action.comments,
        errors: action.err
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: action.newComments
      };
    default:
      return state;
  }
}
