import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import categoryReducer from "./reducers/categoryReducer";

const store = configureStore({
  reducer: {
    userData: userReducer,
    admin: adminReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
