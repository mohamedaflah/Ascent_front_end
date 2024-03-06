
import { AppWindow, Building2,  GitPullRequest,  LayoutDashboard,  Users } from "lucide-react";
import { ElementType } from "react";
import { v4 as uuidv4 } from "uuid";
type Labels = {
  id: string;
  label: string | ElementType;
  icon: ElementType;
  extraLabel?: string;
  link?:string
};
export const adminSidebarLabel: Labels[] = [
  {
    id: uuidv4(),
    label: "Dashbaord",
    icon: LayoutDashboard,
  },
  {
    id:uuidv4(),
    label:"Request and Approvel",
    icon:GitPullRequest,
    link:'approvels'
  },
  {
    id: uuidv4(),
    label: "Users",
    icon: Users,
  },
  {
    id: uuidv4(),
    label: "Companies",
    icon: Building2,
  },
  {
    id: uuidv4(),
    label: "Applicants",
    icon: AppWindow,
  },
];

