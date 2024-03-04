import { UserReducerInitial } from "@/types/AllTypes";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { signupUser, verifyinguser } from "../actions/userActions";
import toast from "react-hot-toast";

const initialState: UserReducerInitial = {
  loading: false,
  err: false,
  role: null,
  user: null,
  message: "",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserReducerInitial>) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.err = false;
        state.message = payload.message;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.err = true;
        if (payload?.message == "Network Error") {
          toast.error(payload?.message);
        } else {
          toast.error(payload?.response?.data?.message);
        }
      })
      .addCase(verifyinguser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyinguser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.role=payload.user.role
        state.err = false;
      })
      .addCase(verifyinguser.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload)
        state.err = payload?.response?.data?.message;
        state.user = null;
        toast.error(payload?.response?.data?.message);
      });
  },
});
export default userReducer.reducer;
