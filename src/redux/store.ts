// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";
import categoryReducer from "./reducers/categoryReducer";
import jobReducer from "./reducers/jobReducer";
import chatReducer from "./reducers/chatReducer";
import messageReducer from "./reducers/messageReducer";

// Combine your reducers
const rootReducer = combineReducers({
  userData: userReducer,
  admin: adminReducer,
  category: categoryReducer,
  job: jobReducer,
  chats: chatReducer,
  message: messageReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create the persistor
const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
