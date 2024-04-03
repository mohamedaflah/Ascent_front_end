import {
  CreateMessagePayload,
  Message,
  MessageReducerInitial,
} from "@/types/types.messagereducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createMessage, getAllMessages } from "../actions/messageAction";
import { ErrorPayload } from "@/types/AllTypes";
import toast from "react-hot-toast";

const initialState: MessageReducerInitial = {
  loading: false,
  err: false,
  message: null,
  messages: null,
};
const messageReducer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Message>) => {
      const messages = state.messages;
      messages?.push(action.payload);
      state.messages = messages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createMessage.fulfilled,
        (state, action: PayloadAction<CreateMessagePayload>) => {
          state.loading = false;
          const { payload } = action;
          const messages = state.messages;
          messages?.push(payload.message);
          state.messages = messages as Message[] | null;
        }
      )
      .addCase(createMessage.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.messages = null;
        toast.error(state.err);
      })
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.messages = payload.messages;
        state.err = false;
      })
      .addCase(getAllMessages.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.messages = null;
        toast.error(state.err);
      });
  },
});

export const {setMessage}=messageReducer.actions
export default messageReducer.reducer;
