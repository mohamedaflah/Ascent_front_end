export type SignupForm = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  confirmpass?: string;
  phonenumber?:string,
  type?:string
};
// export type SignupData={
//   firstane
// }

export type companySignup = {
  name?: string;
  email: string;
  password: string;
};
export type UserReducerInitial = {
  loading: boolean;
  err: boolean | string;
  role: "user" | "admin" | "company" | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: null | any;
  message?: string;
  status?: string;
  savedJobs:string[]
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
  _id?: string;
  currengDesignation: string;
};

export interface signupUserReducerPayload {
  message: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}
export type Login = {
  email: string;
  password: string;
  role: "user" | "admin" | "company";
};

export interface ErrorPayload {
  message: string;
}
