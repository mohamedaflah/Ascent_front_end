import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";

const store = configureStore({
  reducer: {
    userData: userReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
