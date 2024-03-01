import { UserReducerInitial } from "@/types/AllTypes";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { signupUser } from "../actions/userActions";

const initialState: UserReducerInitial = {
  loading: false,
  err: false,
  role: "user",
  user: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserReducerInitial>) => {
    builder.addCase(signupUser.pending,(state)=>{
        state.loading=true
    })
    .addCase(signupUser.fulfilled,(state,{payload})=>{
        state.loading=false
        state.user=payload
        state.err=false
    })
    .addCase(signupUser.rejected,(state)=>{
        state.loading=false
        state.user=null;
        state.err=true
    })
  },
});
export default userReducer.reducer;
