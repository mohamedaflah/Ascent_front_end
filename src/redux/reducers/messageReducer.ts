import {
  CreateMessagePayload,
  Message,
  MessageReducerInitial,
} from "@/types/types.messagereducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createMessage,
  deleteMessage,
  getAllMessages,
} from "../actions/messageAction";
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
    deleteMessageLocaly: (state, { payload }) => {
      const messages = state.messages;
      state.messages = messages?.map((value) => {
        if (value._id === payload.messageId) {
          return { ...value, deleteStatus: true };
        } else {
          return value;
        }
      }) as Message[] | null;
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
      })
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, { payload }) => {
        state.loading = false;
        const messages = state.messages;

        state.messages = messages?.map((value) => {
          if (value._id === payload.message._id) {
            return { ...value, deleteStatus: true };
          } else {
            return value;
          }
        }) as Message[] | null;
      })
      .addCase(deleteMessage.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(state.err);
      });
  },
});

export const { setMessage, deleteMessageLocaly } = messageReducer.actions;
export default messageReducer.reducer;
