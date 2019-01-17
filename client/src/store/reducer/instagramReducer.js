import data from "../../dummyData";
import { TOGGLE_LIKES } from "../action/types";
const initialState = {
  data
};

export default function instagramReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LIKES:
      return {
        ...state,
        data: action.newData
      };
    default:
      return state;
  }
}
