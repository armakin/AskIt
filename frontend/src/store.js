import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userDeleteReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers.js";

import { questionListReducer } from "./reducers/questionReducers.js";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
});

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const initialState = {
  userLogin: {
    userInfo: userInfo,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
