export interface Company {
  email?: string;
  name?: string;
  password?: string;
  description?: string;
  contatct?: string;
  officeLocations?: { name: string; icon: string }[];
  joinDate?: Date;
  industry?: string;
  images?: string[];
  benefits?: { icon: string; headline: string; description: string }[];
  foundedDate?: Date;
  teams?: { name: string; profile: string; designation: string }[];
  techStack?: { name: string; icon: string }[];
  website?: string;
  coverImage?: string;
  icon?: string;
  approvelStatus?: {
    status: "Accepted" | "Rejected" | "Pending";
    description: string;
  };
  profileCompleted?: boolean;
  profileCompletionStatus?: "1%" | "2%" | "3%";
  LinkedInLink: string;
  socialLinks?: string[];
  _id?: string;
  certificate?: string;
  registrationId?: string;
}
