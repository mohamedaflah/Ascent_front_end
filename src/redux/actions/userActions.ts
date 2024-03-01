import { AuthAxios } from "@/constants/axiosInstance";
import { SignupForm } from "@/types/AllTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "users/signupuser",
  async (userData: SignupForm, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post("/signup", userData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
