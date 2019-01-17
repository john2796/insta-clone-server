import axios from "axios";
import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT,
  COMMENT_ERRORS
} from "./types";

const URL = "http://localhost:5000/api/insta/comments";
export const getInstaComments = () => dispatch => {
  axios
    .get(URL)
    .then(({ data: { comments } }) =>
      dispatch({
        type: GET_COMMENT,
        comments
      })
    )
    .catch(err => dispatch({ type: COMMENT_ERRORS, err }));
};

export const addInstaComments = (text, data) => dispatch => {
  const newComments = [
    ...data,
    {
      text,
      _id: Date.now().toString(),
      updatedAt: new Date(),
      createdAt: new Date()
    }
  ];
  dispatch({
    type: ADD_COMMENT,
    newComments
  });
  // axios
  //   .post(URL, { text })
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err));
};

// export const getErrors = () => {
//   return {
//     type: COMMENT_ERRORS
//   };
// };
