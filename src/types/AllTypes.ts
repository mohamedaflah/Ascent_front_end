export type SignupForm = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpass?:string
  
};
// export type SignupData={
//   firstane
// }

export type UserReducerInitial = {
  loading: boolean;
  err: boolean |string;
  role: "user" | "admin" | "company"|null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: null | any;
  message?:string
};

export type userType = {
  firstname: string;
  lastname: string;
  email: string;
  profilePicture?: string;
  experiences?: string[];
  skills?: string[];
  title?: string;
  personalSite?: string;
  resume?: string;
  educations?: string[];
  socialLinks?: string[];
};
