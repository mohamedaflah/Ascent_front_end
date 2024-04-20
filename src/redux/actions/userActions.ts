/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthAxios,
  UserAxios,
  // UserAxios,
  getUserWithRole,
} from "@/constants/axiosInstance";
import { Login, SignupForm, companySignup } from "@/types/AllTypes";
import { decodeJWT } from "@/util/decodeToken";
import { generateToken } from "@/util/generateToken";
import { handleErrors } from "@/util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const signupUser = createAsyncThunk(
  "users/signupuser",
  async (userData: SignupForm, { rejectWithValue }) => {
    try {
      const signupToken = generateToken({ ...userData, role: "user" });
      localStorage.setItem("signupToken", signupToken);
      const { data } = await AuthAxios.post("/signup", {
        ...userData,
        role: "user",
      });
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
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const companySignupSubmit = createAsyncThunk(
  "company/signup",
  async (signupData: companySignup, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post("/signup", {
        ...signupData,
        role: "company",
      });
      const expirationTime = new Date().getTime() + 5 * 60 * 1000; // Current time + 5 minutes in milliseconds
      const dataToStore = {
        isVerificationState: true,
        expiration: expirationTime,
      };

      if (!localStorage.getItem("companyVerification")) {
        localStorage.setItem(
          "companyVerification",
          JSON.stringify(dataToStore)
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const verifyinguser = createAsyncThunk(
  "users/verifyemail",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.get(`/verify-email/${token}`);

      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.get(`/check-role/`);

      const { role }: { role: "admin" | "user" | "company" } = data;
      const { data: user } = await axios.get(getUserWithRole[role], {
        withCredentials: true,
      });

      return user;
    } catch (error) {

      return rejectWithValue(handleErrors(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.get("/logout");
      return data;
    } catch (error: any | Error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginuser",
  async (loginData: Login, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post("/login", { ...loginData });
      const { data: user } = await axios.get(getUserWithRole[loginData.role], {
        withCredentials: true,
      });
      if (data.status) {
        return user;
      }
    } catch (error: any | Error) {
  

      return rejectWithValue(handleErrors(error));
    }
  }
);

export const submitLinks = createAsyncThunk(
  "company/submitLInks",
  async (links: { website: string; linkedIn: string }) => {
    links;
  }
);

export const resendMail = createAsyncThunk(
  "users/resend-mail",
  async (_, { rejectWithValue }) => {
    try {
      const sendPayload = decodeJWT(String(localStorage.getItem("signupToken")))
        .payload as SignupForm;
      if (!sendPayload.email) {
        toast.error("Something went wrong");
        return;
      }

      const { data } = await AuthAxios.post(`/resendMail`, sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  "users/update-profile",
  async (
    sendPayload: {
      userId: string;
      sendData: {
        phonenumber: string;
        skills: string[];
        currengDesignation: string;
        dateofbirth: Date;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await UserAxios.patch(
        `/user/update-profile/${sendPayload.userId}`,
        sendPayload.sendData
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const chanagePassword = createAsyncThunk(
  "users/change-password",
  async (
    sendData: { email: string; currentpass: string; newpass: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await AuthAxios.put(`/change-pass`, sendData);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
