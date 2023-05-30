import {createStore} from "redux";
import userReducer from "./reduces/userReducer";

const store = createStore(userReducer);

export default store;