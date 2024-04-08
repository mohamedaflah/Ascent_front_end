import { Job, JobReduerInitial } from "@/types/types.jobReducer";
import { createSlice } from "@reduxjs/toolkit";
import {
  addJob,
  applyJob,
  deleteJob,
  fetchSelectedAndRejectedCandidates,
  getAllJobs,
  getApplicants,
  getJobWithCompany,
  getOneApplicant,
  getSpecificJob,
  scheduleInterview,
  shortListApplication,
  updateInterviewFeedback,
  updateJob,
} from "../actions/jobActions";
import { ErrorPayload } from "@/types/AllTypes";
import toast from "react-hot-toast";

const initialState: JobReduerInitial = {
  loading: false,
  err: false,
  job: null,
  jobs: null,
  applicants: null,
  pages: 0,
  candidate: null,
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
      })
      // update job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        const jobs = state.jobs?.map((job: Job) => {
          if (job._id === payload.id) {
            return { ...job, ...payload.job };
          }
          return job;
        });
        state.jobs = jobs as Job[] | null;
        state.err = false;
      })
      .addCase(updateJob.rejected, (state, { payload }) => {
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.loading = false;
        state.jobs = null;
        toast.error(state.err);
      })
      // delete job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        const jobs = state.jobs?.map((job: Job) => {
          if (job._id === payload.id) {
            return { ...job, ...payload.job };
          }
          return job;
        });
        state.jobs = jobs as Job[] | null;
        state.err = false;
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.jobs = null;
        state.loading = false;
      })
      // get all jobs especially for users
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.jobs = payload.jobs;
        state.err = false;
        state.pages = payload.totalPages;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.jobs = null;
        toast.error(errorPayload.message);
      })
      // get one job
      .addCase(getSpecificJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSpecificJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.job = payload.job;
        state.err = false;
      })
      .addCase(getSpecificJob.rejected, (state, { payload }) => {
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.job = null;
        state.loading = false;
        toast.error(state.err);
      })
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyJob.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        const jobs = state.jobs?.map((job: Job) => {
          if (job._id === payload.id) {
            return { ...job, ...payload.job };
          }
          return job;
        });
        state.jobs = jobs as Job[] | null;
        state.err = false;
      })
      .addCase(applyJob.rejected, (state, { payload }) => {
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.jobs = null;
        state.loading = false;
        toast.error(state.err);
      })
      .addCase(getApplicants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApplicants.fulfilled, (state, { payload }) => {
        state.applicants = payload.applicants;
        state.err = false;
        state.loading = false;
      })
      .addCase(getApplicants.rejected, (state, { payload }) => {
        state.applicants = null;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        state.loading = false;
        toast.error(state.err);
      })
      .addCase(getOneApplicant.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneApplicant.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.job = payload.applicant;
        state.err = false;
      })
      .addCase(getOneApplicant.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
      })
      .addCase(shortListApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(shortListApplication.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.job = payload.applicant;
        state.err = false;
      })
      .addCase(shortListApplication.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(state.err);
      })
      .addCase(scheduleInterview.pending, (state) => {
        state.loading = true;
      })
      .addCase(scheduleInterview.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.job = payload.applicant;
        state.err = false;
      })
      .addCase(scheduleInterview.rejected, (state, { payload }) => {
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(state.err);
      })
      .addCase(fetchSelectedAndRejectedCandidates.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSelectedAndRejectedCandidates.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.candidate = payload.canidates;
          state.err = false;
        }
      )
      .addCase(
        fetchSelectedAndRejectedCandidates.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.err = (payload as ErrorPayload).message;
          toast.error(state.err);
        }
      )
      .addCase(updateInterviewFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInterviewFeedback.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.job = payload.applicant;
        state.err = false;
      })
      .addCase(updateInterviewFeedback.rejected, (state, { payload }) => {
        state.loading = false;
        state.job = null;
        state.err = (payload as ErrorPayload).message;
        toast.error(state.err)
      });
  },
});
export default jobReducer.reducer;
