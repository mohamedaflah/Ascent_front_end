import {

  GitPullRequest,
  LayoutDashboard,
  PackageSearch,

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
export const adminSidebarLabel: Labels[] = [
  {
    id: uuidv4(),
    label: "Dashbaord",
    icon: LayoutDashboard,
    link: "/admin//",
  },
  {
    id: uuidv4(),
    label: "Request and Approvel",
    icon: GitPullRequest,
    link: "approvels/?page=1&pageSize=7",
  },
  // {
  //   id: uuidv4(),
  //   label: "Users",
  //   icon: Users,
  //   link: "users",
  // },
  // {
  //   id: uuidv4(),
  //   label: "Companies",
  //   icon: Building2,
  //   link: "companies",
  // },
  // {
  //   id: uuidv4(),
  //   label: "Applicants",
  //   icon: AppWindow,
  //   link: "applicatns",
  // },
  {
    id: uuidv4(),
    label: "Categories",
    icon: PackageSearch,
    link: "categories/",
  },
];
