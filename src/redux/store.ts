import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import categoryReducer from "./reducers/categoryReducer";
import jobReducer from "./reducers/jobReducer";
import chatReducer from "./reducers/chatReducer";
import messageReducer from "./reducers/messageReducer";

const store = configureStore({
  reducer: {
    userData: userReducer,
    admin: adminReducer,
    category: categoryReducer,
    job: jobReducer,
    chats: chatReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
