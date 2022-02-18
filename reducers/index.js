import { combineReducers } from "redux";
import verificationReducer from "./verificationReducer";

export default combineReducers({
  verification: verificationReducer,
});
