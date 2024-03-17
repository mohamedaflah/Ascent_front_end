import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import categoryReducer from "./reducers/categoryReducer";
import jobReducer from "./reducers/jobReducer";

const store = configureStore({
  reducer: {
    userData: userReducer,
    admin: adminReducer,
    category: categoryReducer,
    job:jobReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
