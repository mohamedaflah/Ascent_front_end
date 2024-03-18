import { JobReduerInitial } from "@/types/types.jobReducer";
import { createSlice } from "@reduxjs/toolkit";
import { addJob, getJobWithCompany } from "../actions/jobActions";
import { ErrorPayload } from "@/types/AllTypes";
import toast from "react-hot-toast";

const initialState: JobReduerInitial = {
  loading: false,
  err: false,
  job: null,
  jobs: null,
};
const jobReducer = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(addJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        const jobs = state.jobs;
        jobs?.push(payload.job);
        state.jobs = jobs;
      })
      .addCase(addJob.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.jobs = null;
      })
      // get job with Company
      .addCase(getJobWithCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobWithCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.jobs = payload.jobs;
      })
      .addCase(getJobWithCompany.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.job = null;
        state.jobs = null;
        toast.error(state.err);
      });
  },
});
export default jobReducer.reducer;
