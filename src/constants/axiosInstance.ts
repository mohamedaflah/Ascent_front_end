import axios from 'axios'
const baseUrl=String(import.meta.env.VITE_AUTHENTICATION_SERVICE_URI)
export const AuthAxios=axios.create({baseURL:baseUrl})