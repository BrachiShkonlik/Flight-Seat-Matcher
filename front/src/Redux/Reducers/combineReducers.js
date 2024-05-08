import { combineReducers } from "redux";
import userReducer from "./userReducer";
import passengerReducer from "./passengerReducer";

export const allReducers = combineReducers({
    userReducer : userReducer ,
    passengerReducer : passengerReducer,
})