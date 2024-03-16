export interface JobPosting {
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
