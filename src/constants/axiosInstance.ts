import axios from "axios";
export const authbaseUrl = String(import.meta.env.VITE_AUTHENTICATION_SERVICE_URI);
export const userbaseURl = import.meta.env.VITE_USER_SERVICE_URI as string;
export const companybaseURL = import.meta.env.VITE_COMPANY_SERVICE as string;
export const AuthAxios = axios.create({
  baseURL: authbaseUrl,
  withCredentials: true,
});
export const UserAxios = axios.create({
  baseURL: userbaseURl,
  withCredentials: true,
});
export const CompanyAxios = axios.create({
  baseURL: companybaseURL,
  withCredentials: true,
});
type Role = "admin" | "user" | "company";
export const getUserWithRole: Record<Role, string> = {
  user: `${userbaseURl}/user/get-user`,
  admin: `${userbaseURl}/user/get-user`, // Assuming admins might have a different endpoint
  company: `${companybaseURL}/company`, // Placeholder, adjust as needed
};


// seperate folder for connection
// constant -> constant.js
// endpoint.js -> required