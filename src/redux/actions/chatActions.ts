import {
  CommunicationAxios,
  CompanyAxios,
  UserAxios,
} from "@/constants/axiosInstance";
import { handleErrors } from "@/util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 } from "uuid";
export const getAllcompaniesforchat = createAsyncThunk(
  "chat/get-allcomapnies",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (body: { type: "user" | "chat"; query?: any }, { rejectWithValue }) => {
    try {
      body;
      const { data } = await CompanyAxios.get(`/get-allcompanies?${body.query}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const createOneTwoOneChat = createAsyncThunk(
  "chat/create-onetwoonechat",
  async (
    sendPayload: { firstId: string; secondId: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await CommunicationAxios.post(
        `/api/v1/chat`,
        sendPayload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllUsersforChat = createAsyncThunk(
  "chat/get-allusers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserAxios.get("/user/get-allusers");

      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const fetchUnreadAndLastMessage = createAsyncThunk(
  "chat/fetch-last-unread-message",
  async (sendPayload: { userId: string }, { rejectWithValue }) => {
    try {
      const { data } = await CommunicationAxios.post(
        `/api/v2/chats/${v4()}`,
        sendPayload
      );

      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
