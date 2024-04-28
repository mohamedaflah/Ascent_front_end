import { Message } from "./types.messagereducer";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "user" | "admin" | "company";
  _id?: string;
  phonenumber?: string;
  blockStatus?: boolean;
  status?: boolean;
  resume?: string;
  skills?: string[];
  experiences?: {
    title: string;
    description: string;
    location: string;
    image: string;
    _id: string;
  }[];
  personalsite?: string;
  sociallinks?: string[];
  coverImage?: string;
  icon?: string;
  location?: string;
  about?: string;
  education?: {
    image: string;
    university: string;
    course: string;
    year: { from: Date; to: Date };
    description: string;
    _id: string;
  }[];
  profileCompleted?: boolean;
  dateofbirth?: Date;
  currengDesignation?: string;
  lastMessage?: Message;
  messageCount?: number;
  resumes?: string[];
  stage?: string;
  savedJobs?: string[];
}
