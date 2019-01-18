import axios from "axios";
import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT,
  GET_ERRORS,
  TOGGLE_LIKES
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
        payload: err.response.data
      })
    );
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// export const addInstaComments = (text, data) => dispatch => {
//   const newComments = [
//     ...data,
//     {
//       text,
//       _id: Date.now().toString(),
//       updatedAt: new Date(),
//       createdAt: new Date()
//     }
//   ];
//   dispatch({
//     type: ADD_COMMENT,
//     newComments
//   });
//   axios
//     .post(URL, { text })
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err));
// };

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

// export const getErrors = () => {
//   return {
//     type: COMMENT_ERRORS
//   };
// };
