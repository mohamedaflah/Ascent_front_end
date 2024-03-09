import { AuthAxios, UserAxios } from "@/constants/axiosInstance";
import { handleErrors } from "@/util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";
// type methods={method:"GET"|"POST"}
export const verifyForgotEmail = createAsyncThunk(
  "user/forgotpass",
  async (sendPayload: { email: string }, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post(
        `/forgotpass-sendmail`,
        sendPayload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const passwordUpdation = createAsyncThunk(
  "user/updatepass",
  async (
    sendPaylod: { email: string; newPass: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await UserAxios.post(`/update-password`, sendPaylod);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
