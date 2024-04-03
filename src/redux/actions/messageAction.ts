import { CommunicationAxios } from "@/constants/axiosInstance";
import { handleErrors } from "@/util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createMessage = createAsyncThunk(
  "message/create-message",
  async (
    sendData: {
      senderId: string;
      chatId: string;
      senderName: string;
      senderProfile: string;
      content: {
        type: "audio" | "video" | "text" | "image" | "doc";
        content: string;
        subcontent?: {
          type: "audio" | "video" | "text" | "image" | "doc";
          content: string;
        };
      };
    },
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
    console.log("🚀 ~ chatId:", chatId);
    try {
      const { data } = await CommunicationAxios.get(`/api/v2/chats/${chatId}`);
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);
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
