import LogoutModal from "@/components/LogoutModal";
import {
  Home,
  MessageCircleCode,
  Search,
  BarChart,
  User,
  Settings,
  LogOut,
  HelpCircle,
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
export const userSidebarLayout: Labels[] = [
  {
    id: uuidv4(),
    label: "Home",
    icon: Home,
    link:"/"
  },
  {
    id: uuidv4(),
    label: "Messages",
    icon: MessageCircleCode,
    link:"messages"

  },
  {
    id: uuidv4(),
    label: "Find jobs",
    icon: Search,
    link:"findjobs",

  },
  {
    id: uuidv4(),
    label: "Brows companies",
    icon: BarChart,
    link:"bro"

  },
  {
    id: uuidv4(),
    label: "My profile",
    icon: User,

  },
];

export const useSidbarLayoutSection2: Labels[] = [
  {
    id: uuidv4(),
    label: "Settings",
    icon: Settings,
  },
  {
    id: uuidv4(),
    label: LogoutModal,
    icon: LogOut,
    extraLabel: "Logout",
  },
  {
    id: uuidv4(),
    label: "Help center",
    icon: HelpCircle,
  },
];
