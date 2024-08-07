import { CommunicationAxios } from "@/constants/axiosInstance";
import { Message } from "@/types/types.messagereducer";
import { handleErrors } from "@/util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createMessage = createAsyncThunk(
  "message/create-message",
  async (
    sendData: // {
    //   senderId: string;
    //   chatId: string;
    //   senderName: string;
    //   senderProfile: string;
    //   content: {
    //     type: "audio" | "video" | "text" | "image" | "doc";
    //     content: string;
    //     subcontent?: {
    //       type: "audio" | "video" | "text" | "image" | "doc";
    //       content: string;
    //     };
    //   };
    // },
    Message,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await CommunicationAxios.post(
        `/api/v2/messages`,
        sendData
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "messages/get-allmessages",
  async (chatId: string, { rejectWithValue }) => {

    try {
      const { data } = await CommunicationAxios.get(`/api/v2/chats/${chatId}`);
      return data;
    } catch (error) {

      return rejectWithValue(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "messages/delte-message",
  async (messageId: string, { rejectWithValue }) => {
    try {
      const { data } = await CommunicationAxios.delete(
        `/api/v2/messages/${messageId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateMessageStatus = createAsyncThunk(
  "message/update-message-status",
  async (messageId: string, { rejectWithValue }) => {
    try {
      const { data } = await CommunicationAxios.patch(
        `/api/v2/messages/${messageId}`,
        { status: "read" }
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
