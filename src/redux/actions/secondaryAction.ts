import { AuthAxios } from "@/constants/axiosInstance";
import { handleErrors } from "@/util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";

// type methods={method:"GET"|"POST"}
export const verifyForgotEmail = createAsyncThunk(
  "user/forgotpass",
  async (sendPayload: { email: string,role:"user"|"admin"|"company" }, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post(
        `/forgotpass-sendmail`,
        sendPayload
      );
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
      console.log("🚀 ~ error:", error)
 
      
      return rejectWithValue(handleErrors(error));
    }
  }
);

// export const verifyForgotLink = createAsyncThunk(
//   "user/verifyforgotpasslink",
//   async (
//     payload: { role: "user" | "admin" | "company" },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await axios.get(verifyForgotLinkWithRole[payload.role], {
//         withCredentials: true,
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(handleErrors(error));
//     }
//   }
// );
