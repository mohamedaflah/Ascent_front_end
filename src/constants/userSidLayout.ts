import { Home, MessageCircleCode,Search,BarChart,User } from "lucide-react";
import { ElementType } from "react";
import { v4 as uuidv4 } from 'uuid';
type Labels = {
  id:string
  label: string;
  icon: ElementType;
};
export const userSidebarLayout: Labels[] = [
  {
    id:uuidv4(),
    label: "Home",
    icon: Home,
  },
  {
    id:uuidv4(),
    label: "Messages",
    icon: MessageCircleCode,
  },
  {
    id:uuidv4(),
    label:"Find jobs",
    icon:Search,
  },
  {
    id:uuidv4(),
    label:"Brows companies",
    icon:BarChart
  },
  {
    id:uuidv4(),
    label:"My profile",
    icon:User
  }
];
