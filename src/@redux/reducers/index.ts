import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "../slices/UserSlice";
import pageMetaReducer from "../slices/PageMetaSlice";
import activePagesSlice from "../slices/ActivePagesSlice";

const persistConfig = {
  key: "clinic-app",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  activePages: activePagesSlice,
  pageMeta: pageMetaReducer,
});

export { persistConfig, rootReducer };
