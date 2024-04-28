import { Company } from "./oneCompanyType";
import { User } from "./types.user";

export type JobReduerInitial = {
  loading: boolean;
  err: boolean | string;
  job: Job | null;
  bookmark: Job | null;
  jobs: Job[] | null;
  bookmarks: Job[] | null;
  applicants: Applicant[] | null;
  pages?: number;
  candidate: Applicant[] | null;
  applications:Job[]|null
};
export interface ApplicantType {
  applicantId: string;
  appliedDate: Date;
  hiringstage:
    | "Applied"
    | "Inreview"
    | "Shortlisted"
    | "Interview"
    | "Selected"
    | "Rejected";
  resume: string;
}
export interface Job {
  jobTitle: string;
  employment: string;
  description: string;
  category: string;
  joblocation: string;
  salaryrange: {
    status: boolean;
    from: number;
    to: number;
  };
  vacancies: {
    available: number;
    filled: number;
  };
  responsibilities: string;
  qualification?: string[];
  skills?: string[];
  experience?: string;
  companyId?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiry?: Date;
  completdJobAdd: "first" | "second";
  categoryId?: string;
  expired: boolean;
  status: boolean;
  company?: Company;
  applicants?: ApplicantType[] | ApplicantType;
  applicantDetails: User;
  applicant: ApplicantType;
  companyName?: string;
  companyIcon?: string;
  applicationStatus?: string[];
  appliedDate?: Date[];
}

export interface JobfirstSchema {
  jobTitle: string;
  employment: string;
  description: string;
  category: string;
  joblocation: string;
  experience: number;
  vacancies: number;
  responsibilities: string;
  expiry: string;
}

export interface SalaryRange {
  from: number;
  to: number;
}

export interface JobSecondSchema {
  salaryrange: SalaryRange;
  qualification: string[];
  skills: string[];
}

export interface JobPayload {
  jobTitle: string;
  employment: string;
  description: string;
  category: string;
  joblocation: string;
  experience: number;
  vacancies?: { status: boolean; available: number; filled: number };
  responsibilities: string;
  expiry: string;
  salaryrange: SalaryRange;
  qualification: string[];
  skills: string[];
  companyId?: string;
}

export interface Applicant {
  jobTitle?: string;
  employment?: string;
  description?: string;
  category?: string;
  joblocation?: string;
  salaryrange?: {
    status: boolean;
    from: number;
    to: number;
  };
  vacancies?: {
    available: number;
    filled: number;
  };
  responsibilities?: string;
  qualification?: string[];
  skills?: string[];
  experience?: string;
  companyId?: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiry?: Date;
  completdJobAdd: "first" | "second";
  categoryId?: string;
  expired: boolean;
  status: boolean;
  company?: Company;
  applicants?: {
    applicantId: string;
    appliedDate: Date;
    hiringstage:
      | "Applied"
      | "Inreview"
      | "Shortlisted"
      | "Interview"
      | "Selected"
      | "Rejected";
    resume: string;
    statusDescription: {
      title: string;
      description: string;
      joiningDate: Date;
    };
    interviewDate: Date;
    applicationSeen: boolean;
    interviewSchedules: {
      _id: string;
      title: string;
      time: string;
      status: "Pending" | "Completed";
      feedback: string;
      feedbackDescription: string;
    }[];
  };
  applicantDetails: User;
}
