import { ChatInitial } from "@/types/types.chat.reducer";
import { createSlice } from "@reduxjs/toolkit";
import {
  createOneTwoOneChat,
  getAllUsersforChat,
  getAllcompaniesforchat,
} from "../actions/chatActions";
import { ErrorPayload } from "@/types/AllTypes";
import toast from "react-hot-toast";

const initialState: ChatInitial = {
  loading: false,
  companies: null,
  err: false,
  selectedUser: null,
  users: null,
  chatId: "",
  typingUsers: [],
};
const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setTypingUser: (state, { payload }) => {
      const typingUsers = state.typingUsers;
      typingUsers?.push(payload);
      state.typingUsers = typingUsers;
    },
    removeTypingUsers: (state, { payload }) => {
      state.typingUsers = state.typingUsers?.filter(
        (value) => value !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllcompaniesforchat.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllcompaniesforchat.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companies = payload.companies;
        state.err = false;
      })
      .addCase(getAllcompaniesforchat.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.companies = null;
        toast.error(state.err);
      })
      .addCase(createOneTwoOneChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOneTwoOneChat.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.selectedUser = payload.selectedUser;
        state.err = false;
        state.chatId = payload.chat._id;
      })
      .addCase(createOneTwoOneChat.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
      })
      .addCase(getAllUsersforChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersforChat.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload.users;
        state.err = false;
      })
      .addCase(getAllUsersforChat.rejected, (state, { payload }) => {
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.users = null;
        toast.error(state.err);
      });
  },
});
export const {setTypingUser,removeTypingUsers}=chatReducer.actions
export default chatReducer.reducer;
