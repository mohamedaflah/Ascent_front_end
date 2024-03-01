import { UserReducerInitial } from "@/types/AllTypes";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

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
    builder;
  },
});
export default userReducer.reducer;
