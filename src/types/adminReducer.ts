import { Company } from "./oneCompanyType";

export type oneCompanyType = {
  _id: string;
  approvelStatus: {
    status: "Pending" | "Rejected" | "Accepted";
    description: string;
  };
  email: string;
  password: string;
  name: string;
  images: string[];
  teams?: string;
  createdAt: Date;
  updatedAt: Date;
  officeLocations: string[];
  benefits: string[];
  techStack: string[];
  icon: string;
  LinkedInLink: string;
};

export type adminReducerInitial = {
  loading: boolean;
  err: boolean | string;
  company: null | Company[];
  page?:number
};

export interface categoryPayload {
  categoryname: string;
  categoryDescription: string;
  categoryImage: File | null | FileList;
}
