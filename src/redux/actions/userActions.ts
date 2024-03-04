/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthAxios, UserAxios, getUserWithRole } from "@/constants/axiosInstance";
import { SignupForm } from "@/types/AllTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "users/signupuser",
  async (userData: SignupForm, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post("/signup", {...userData,role:"user"});
      const expirationTime = new Date().getTime() + 5 * 60 * 1000; // Current time + 5 minutes in milliseconds
      const dataToStore = {
        isVerificationState: true,
        expiration: expirationTime,
      };
      if (!localStorage.getItem("verificationState")) {
        localStorage.setItem("verificationState", JSON.stringify(dataToStore));
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyinguser = createAsyncThunk(
  "users/verifyemail",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.get(`/verify-email/${token}`);
      console.log("🚀 ~ data:", data)
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error)
    
      return rejectWithValue(error);
    }
  }
);

export const getUser=createAsyncThunk(
  "user/getUser",
  async(_,{rejectWithValue})=>{
    try {
      const {data}=await AuthAxios.get(`/check-role/`)
      const {role}:{role:"admin"|"user"|"company"}=data
      const {data : user}=await UserAxios.get(getUserWithRole[role])
      console.log("🚀 ~ async ~ user:", user)
      return user
    } catch (error) {
      console.log("🚀 ~ async ~ error:", error)
      
      return rejectWithValue(error)
    }
  }
)

export const logoutUser=createAsyncThunk(
  "user/logoutUser",
  async(_,{rejectWithValue})=>{
    try {
      const {data}=await AuthAxios.get('/logout')
      return data
    } catch (error:any|Error) {
      return rejectWithValue(error.message)
    }
  }
)