import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERRORS,
  TOGGLE_LIKES
} from "../action/types";

const initialState = {
  comments: [],
  errors: {},
  data: [],
  loading: false
};
export default function instaCommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return {
        ...state,
        data: action.data
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };

    // case ADD_COMMENT:
    //   return {
    //     ...state,
    //     comments: action.newComments
    //   };
    // case TOGGLE_LIKES:
    //   return {
    //     ...state,
    //     data: action.newData
    //   };
    default:
      return state;
  }
}
