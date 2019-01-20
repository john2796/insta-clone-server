import axios from "axios";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT,
  GET_ERRORS,
  POST_LOADING
} from "./types";

// http://localhost:5000
const URL = "/api/insta/";
export const getInstaComments = () => dispatch => {
  axios
    .get(URL)
    .then(({ data }) =>
      dispatch({
        type: GET_COMMENT,
        data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const addInstaComments = (
  username,
  newComments,
  postComments
) => dispatch => {
  dispatch({
    type: ADD_COMMENT,
    newComments
  });
  axios
    .post(`${URL}/comments/${username}`, postComments)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
};

export const deleteInstaComment = (commentId, username) => dispatch => {
  axios
    .delete(`${URL}/comments/${commentId}/${username}`)
    .then(({ data }) =>
      dispatch({
        type: DELETE_COMMENT,
        data
      })
    )
    .catch(err => console.log(err));
};

export const setPostsLoading = () => {
  return {
    type: POST_LOADING
  };
};
