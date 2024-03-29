import { AuthAxios, CompanyAxios } from "@/constants/axiosInstance";
import { Company } from "@/types/oneCompanyType";

import { handleErrors } from "@/util/handleErrors";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { createAsyncThunk } from "@reduxjs/toolkit";

// type methods={method:"GET"|"POST"}
export const verifyForgotEmail = createAsyncThunk(
  "user/forgotpass",
  async (
    sendPayload: { email: string; role: "user" | "admin" | "company" },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await AuthAxios.post(
        `/forgotpass-sendmail`,
        sendPayload
      );
      const expirationTime = new Date().getTime() + 5 * 60 * 1000;
      const dataToStore = {
        isVerificationState: true,
        expiration: expirationTime,
      };
      if (!localStorage.getItem("forgoVerificationState")) {
        localStorage.setItem(
          "forgoVerificationState",
          JSON.stringify(dataToStore)
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const passwordUpdation = createAsyncThunk(
  "user/updatepass",
  async (sendPaylod: { newPass: string }, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post(`/update-password`, sendPaylod);
      return data;
    } catch (error) {
      console.log("🚀 ~ error:", error);

      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateProfile = createAsyncThunk(
  "company/updatepass",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payload: { sendData: Company; id: string }, { rejectWithValue }) => {
    try {
      const coverImage: string = await uploadImageToCloudinary(
        payload.sendData.coverImage
      );
      console.log("🚀 ~ coverImage:", coverImage);
      const icon: string = await uploadImageToCloudinary(payload.sendData.icon);
      console.log("🚀 ~ icon:", icon);
      const { data } = await CompanyAxios.post(`/update-profile`, {
        data: {
          ...payload.sendData,
          coverImage,
          icon,
          profileCompletionStatus: "2%",
        },
        id: payload.id,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
export const updateProfileTwoPercent = createAsyncThunk(
  "company/updateProfileTwopercent",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payload: { sendData: Company; id: string }, { rejectWithValue }) => {
    try {
      const { data } = await CompanyAxios.post(`/update-profile`, {
        data: { ...payload.sendData, profileCompletionStatus: "3%" },
        id: payload.id,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateProfileThreePercent = createAsyncThunk(
  "company/updateprofileThree",
  async (
    sendPayload: { ceritificate: File | string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const ceritificate = await uploadImageToCloudinary(
        sendPayload.ceritificate
      );
      const { data } = await CompanyAxios.post(`/update-profile`, {
        data: { certificate: ceritificate, profileCompleted: true },
        id: sendPayload.id,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateCompleteProfileCompany = createAsyncThunk(
  "company/update-completed-profile-company",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  async (sendData: { data: any; id: string }, { rejectWithValue }) => {
    console.log("🚀 ~ sendData:", sendData)
    try {
      sendData.data.certificate = await uploadImageToCloudinary(
        sendData.data.certificate
      );
      sendData.data.coverImage=await uploadImageToCloudinary(sendData.data.coverImage)
      sendData.data.icon=await uploadImageToCloudinary(sendData.data.icon)
      const { data } = await CompanyAxios.post(`/update-profile`, {
        data: sendData.data,
        id: sendData.id,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
