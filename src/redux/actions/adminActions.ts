import { CompanyAxios } from "@/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPendingCompanies = createAsyncThunk(
  "admin/getPendingcompanies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await CompanyAxios.get(`/get-approvelcompanies`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeApprovleStatus = createAsyncThunk(
  "admin/changeApprovel",
  async (
    changeApprovel: {
      status: "Accepted" | "Rejected" | "Pending";
      description?: string;
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await CompanyAxios.post(
        `/change-approvel`,
        changeApprovel
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any) {
      if (error.message) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);
