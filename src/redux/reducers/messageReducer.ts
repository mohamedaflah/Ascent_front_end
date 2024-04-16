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
  updateMessageStatus,
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
      // state.messages?.splice(payload.messageId,1)

      if (state.messages) {
        const index = payload.messageId;
        if (index >= 0 && index < state.messages.length) {
          state.messages[index].deleteStatus = true;
        }
      }
    },
    updateMessageStatusLocaly: (
      status,
      action: PayloadAction<{ chatId: string; userId: string }>
    ) => {
      const { payload } = action;
      status.messages = status.messages?.map((message) => {
        if (
          message.chatId === payload.chatId &&
          message.senderId == payload.userId
        ) {
          return { ...message, status: "read" };
        } else {
          return message;
        }
      }) as Message[];
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.loading = false;
      })
      .addCase(
        createMessage.fulfilled,
        (state, action: PayloadAction<CreateMessagePayload>) => {
          state.loading = false;
          const { payload } = action;
          payload;
          // const messages = state.messages;
          // messages?.push(payload.message);
          // // state.messages = messages as Message[] | null;
        }
      )
      .addCase(createMessage.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
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
      })
      .addCase(updateMessageStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMessageStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.messages = state.messages?.map((message) => {
          if (message._id === payload.message._id) {
            return { ...message, status: "read" };
          } else {
            return message;
          }
        }) as Message[];
        state.err = false;
      })
      .addCase(updateMessageStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = (payload as ErrorPayload).message;
        toast.error(state.err);
      });
  },
});

export const { setMessage, deleteMessageLocaly, updateMessageStatusLocaly } =
  messageReducer.actions;
export default messageReducer.reducer;
