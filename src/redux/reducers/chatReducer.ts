import { ChatInitial } from "@/types/types.chat.reducer";
import { createSlice } from "@reduxjs/toolkit";
import {
  createOneTwoOneChat,
  fetchUnreadAndLastMessage,
  getAllUsersforChat,
  getAllcompaniesforchat,
} from "../actions/chatActions";
import { ErrorPayload } from "@/types/AllTypes";
import toast from "react-hot-toast";

import { User } from "@/types/types.user";
import { Message } from "@/types/types.messagereducer";
import { Company } from "@/types/oneCompanyType";

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
    setLastMessage: (state, { payload }) => {
      console.log(state.users);
      console.log(state.companies);

      if (state.users) {
        state.users = state.users.map((user) =>
          user._id === payload.reciverId
            ? { ...user, lastMessage: payload.message }
            : user
        );
      }

      if (state.companies) {
        state.companies = state.companies.map((company) =>
          company._id === payload.reciverId
            ? { ...company, lastMessage: payload.message }
            : company
        );
      }
    },
    setMessageCount: (state, { payload }) => {
      if (state.users) {
        state.users = state.users.map((user) =>
          user._id === payload ? { ...user, messageCount: 0 } : user
        );
      }

      if (state.companies) {
        state.companies = state.companies.map((company) =>
          company._id === payload ? { ...company, messageCount: 0 } : company
        );
      }
    },
    updateunreadMessageCountAndLastMessage: (state, { payload }) => {
      if (state.users) {
        state.users = state.users.map((user) => {
          if (user._id == payload.userId) {
            let messageCount;
            if (user && user.messageCount) {
              messageCount = user?.messageCount + 1;
            } else {
              messageCount = 0;
            }
            return {
              ...user,
              lastMessage: payload.message,
              messageCount: Number(messageCount),
            };
          } else {
            return user;
          }
        });
      }
      if (state.companies) {
        state.companies = state.companies.map((user) => {
          if (user._id == payload.userId) {
            let messageCount;
            if (user && user.messageCount) {
              messageCount = user?.messageCount + 1;
            } else {
              messageCount = 0;
            }
            return {
              ...user,
              lastMessage: payload.message,
              messageCount: Number(messageCount),
            };
          } else {
            return user;
          }
        });
      }

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
      })
      .addCase(fetchUnreadAndLastMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUnreadAndLastMessage.fulfilled,
        (
          state,
          {
            payload,
          }: { payload: { result: { message: Message; count: number }[] } }
        ) => {
          state.loading = false;
          const { result } = payload;

          state.users = state.users?.map((user) => {
            const userResult = result.find(
              (data) => data?.message?.reciverId == user._id
            );

            if (userResult) {
              return {
                ...user,
                messageCount: userResult.count,
                lastMessage: userResult.message,
              };
            } else {
              return user;
            }
          }) as User[];

          state.companies = state.companies?.map((user) => {
            const userResult = result.find(
              (data) => data?.message?.reciverId == user._id
            );
            if (userResult) {
              return {
                ...user,
                messageCount: userResult.count,
                lastMessage: userResult.message,
              };
            } else {
              return user;
            }
          }) as Company[];
        }
      )
      .addCase(fetchUnreadAndLastMessage.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = (payload as ErrorPayload).message;
        toast.error(state.err);
      });
  },
});
export const {
  setTypingUser,
  removeTypingUsers,
  setLastMessage,
  setMessageCount,
  updateunreadMessageCountAndLastMessage,
} = chatReducer.actions;
export default chatReducer.reducer;
