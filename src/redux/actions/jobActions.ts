import { JobAxios } from "@/constants/axiosInstance";
import { JobPayload } from "@/types/types.jobReducer";
import { handleErrors } from "@/util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addJob = createAsyncThunk(
  "job/add-job",
  async (sendPayload: JobPayload, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.post(`/api/v1/job`, sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
