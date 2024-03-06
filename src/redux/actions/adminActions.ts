import { CompanyAxios } from "@/constants/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPendingCompanies = createAsyncThunk(
  "admin/getPendingcompanies",
  async (_, { rejectWithValue }) => {
    try {
        const {data}=await CompanyAxios.get(`/get-approvelcompanies`)
        return data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
