import dummyData from "../../dummyData";

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT,
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
      let conditionalData;
      if (!state.data) {
        conditionalData = dummyData;
      } else {
        conditionalData = action.data;
      }
      return {
        ...state,
        data: conditionalData,
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
    case DELETE_COMMENT:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}
