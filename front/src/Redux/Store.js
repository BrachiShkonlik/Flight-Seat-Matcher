import { createStore } from "redux"
import { allReducers } from "./Reducers/combineReducers"

const store = createStore(
     allReducers,
     );
store.getState();
export default store;