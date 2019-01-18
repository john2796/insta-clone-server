import axios from "axios";
import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT,
  GET_ERRORS,
  TOGGLE_LIKES,
  POST_LOADING
} from "./types";

const URL = "http://localhost:5000/api/insta/";
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

export const addInstaComments = (username, newComments) => dispatch => {
  dispatch({
    type: ADD_COMMENT,
    newComments
  });
  axios
    .post(`${URL}/comments/${username}`, { newComments })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
};

// export const onToggleLikesHandler = (id, data) => {
//   let newData = [...data];
//   newData = newData.map(item => {
//     if (item.id === id) {
//       item.isLiked = !item.isLiked;
//     }
//     return item;
//   });
//   return {
//     type: TOGGLE_LIKES,
//     newData
//   };
// };

export const setPostsLoading = () => {
  return {
    type: POST_LOADING
  };
};
