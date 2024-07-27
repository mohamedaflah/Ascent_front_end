import axios from "axios";
export const authbaseUrl = String(
  import.meta.env.VITE_AUTHENTICATION_SERVICE_URI
);
export const userbaseURl = import.meta.env.VITE_USER_SERVICE_URI as string;
export const companybaseURL = import.meta.env.VITE_COMPANY_SERVICE as string;
export const jobBaseURL = import.meta.env.VITE_JOB_SERVICE as string;
export const communicationbaseURL = import.meta.env
  .VITE_COMMUNICATION_SERVICE as string;
export const AuthAxios = axios.create({
  baseURL: `${authbaseUrl}/api/auth-service`,
  withCredentials: true,
});
export const UserAxios = axios.create({
  baseURL: `${userbaseURl}/api/user-service`,
  withCredentials: true,
});
export const CompanyAxios = axios.create({
  baseURL: `${companybaseURL}/api/company-service`,
  withCredentials: true,
});
export const JobAxios = axios.create({
  baseURL: `${jobBaseURL}/api/job-service`,
  withCredentials: true,
});

export const CommunicationAxios = axios.create({
  baseURL: `${communicationbaseURL}/api/communication-service`,
  withCredentials: true,
});
type Role = "admin" | "user" | "company";
export const getUserWithRole: Record<Role, string> = {
  user: `${userbaseURl}/user/get-user`,
  admin: `${userbaseURl}/user/get-user`, // Assuming admins might have a different endpoint
  company: `${companybaseURL}/company`, // Placeholder, adjust as needed
};

export const verifyForgotLinkWithRole: Record<Role, string> = {
  user: `${authbaseUrl}/verify-forgotlink`,
  admin: `${userbaseURl}/user/verify-forgotlink`,
  company: `${userbaseURl}/verify-forgotlink`,
};

// seperate folder for connection
// constant -> constant.js
// endpoint.js -> required
