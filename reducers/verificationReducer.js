import { FETCH_VERIFICATION, SET_VERIFICATION } from "../actions/types";

const initialState = {
  isPhoneVerification: Boolean,
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_VERIFICATION:
      return {
        ...state,
        items: action.payload,
      };
    case SET_VERIFICATION:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
