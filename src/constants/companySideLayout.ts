import {
  Blinds,
  BookText,
  Landmark,
  LayoutDashboard,
  MessagesSquare,
} from "lucide-react";
import { ElementType } from "react";
import { v4 as uuidv4 } from "uuid";
type Labels = {
  id: string;
  label: string | ElementType;
  icon: ElementType;
  extraLabel?: string;
  link?: string;
};
export const companySidBarLabels: Labels[] = [
  {
    id: uuidv4(),
    label: "Dashbaord",
    icon: LayoutDashboard,
    link: "/company/",
  },
  {
    id: uuidv4(),
    label: "Messages",
    icon: MessagesSquare,
    link: "messages",
  },
  {
    id: uuidv4(),
    label: "Jobs",
    icon: Blinds,
    link:"jobs"
  },
  {
    id: uuidv4(),
    label: "Company Profile",
    icon: Landmark,
    link:"companyprofile"
  },
  {
    id: uuidv4(),
    label: "Applicants",
    icon: BookText ,
    link:"applicants"
  },
];
