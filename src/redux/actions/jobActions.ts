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

export const getJobWithCompany = createAsyncThunk(
  "job/get-job-company",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.get(`/api/v1/get-jobs/${companyId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateJob = createAsyncThunk(
  "job/update-job",
  async (
    payload: { id: string; sendPayload: JobPayload },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await JobAxios.patch(
        `/api/v1//job/${payload.id}`,
        payload.sendPayload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/delete-job",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.put(`/api/v1//job/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllJobs = createAsyncThunk(
  "job/get-alljob",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.get(`/api/v1/job`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getSpecificJob = createAsyncThunk(
  "job/get-onejob",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.get(`/api/v1/job/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
