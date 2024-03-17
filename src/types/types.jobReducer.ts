export type JobReduerInitial = {
  loading: boolean;
  err: boolean | string;
  job: Job | null;
  jobs: Job[] | null;
};
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
}

export interface JobfirstSchema {
  jobTitle: string;
  employment: string 
  description: string;
  category: string 
  joblocation: string 
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

export interface JobPayload{
  jobTitle: string;
  employment: string 
  description: string;
  category: string 
  joblocation: string 
  experience: number;
  vacancies: number;
  responsibilities: string;
  expiry: string;
  salaryrange: SalaryRange;
  qualification: string[];
  skills: string[];
  companyId:string
}