import { adminReducerInitial } from "@/types/adminReducer";
import { createSlice } from "@reduxjs/toolkit";
import {
  changeApprovleStatus,
  getPendingCompanies,
} from "../actions/adminActions";
import toast from "react-hot-toast";
import { ErrorPayload } from "@/types/AllTypes";

const initialState: adminReducerInitial = {
  loading: false,
  err: false,
  company: null,
};
const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPendingCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingCompanies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.company = payload?.companies;
      })
      .addCase(getPendingCompanies.rejected, (state, { payload }) => {
        state.company = null;
        state.loading = false;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
      })
      // change approvle status
      .addCase(changeApprovleStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeApprovleStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.company = state.company?.filter(
          (value) => value._id !== payload.company._id
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) as any;
        state.err = false;
      })
      .addCase(changeApprovleStatus.rejected, (state, { payload }) => {
        state.loading = true;
        const errorPayload = payload as ErrorPayload;
        state.err = errorPayload.message;
        toast.error(errorPayload.message);
        state.company = null;
      });
  },
});

export default adminReducer.reducer;
