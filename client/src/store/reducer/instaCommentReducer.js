import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERRORS,
  TOGGLE_LIKES,
  GET_COMMENT,
  GET_ERRORS,
  POST_LOADING
} from "../action/types";

const initialState = {
  data: [],
  loading: false
};
export default function instaCommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      console.log(action.data);

      return {
        ...state,
        data: action.data,
        loading: false
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_COMMENT:
      return {
        ...state,
        data: action.newComments
      };
    // case TOGGLE_LIKES:
    //   return {
    //     ...state,
    //     data: action.newData
    //   };
    default:
      return state;
  }
}
