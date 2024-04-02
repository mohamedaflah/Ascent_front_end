import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import categoryReducer from "./reducers/categoryReducer";
import jobReducer from "./reducers/jobReducer";
import chatReducer from "./reducers/chatReducer";

const store = configureStore({
  reducer: {
    userData: userReducer,
    admin: adminReducer,
    category: categoryReducer,
    job: jobReducer,
    chats: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
