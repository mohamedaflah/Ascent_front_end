import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import AscentIcon from "../assets/lightico.svg";
import AscentDarkIcon from "../assets/darkIco.svg";
import { useContext, useEffect, useState } from "react";
import defaultProfile from '../assets/IMG 3.png'
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/shadcn/theme-provider";
import { userSidebarLayout } from "@/constants/userSidLayout";
import { RiMenu3Fill } from "react-icons/ri";
import { HelpCircle, LogOut, Settings } from "lucide-react";
import LogoutModal from "@/components/LogoutModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Layout = ({ role }: { role?: "user" | "admin" | "company" | null }) => {
  const [theme, setTheme] = useState<"dark" | "light" | "system">();
  const {user}=useSelector((staet:RootState)=>staet.userData)
  const context: ThemeProviderState = useContext(ThemeProviderContext);
  useEffect(() => {
    setTheme(context?.theme);
  }, [context]);

  if (role === "user") {
    return (
      <main className=" grid grid-cols-7 ">
        <aside className="h-screen border-r  flex-col pt-4 px-4 gap-5 relative hidden lg:flex">
          <div className="flex justify-between items-center text-lg">
            <img
              src={theme === "light" ? AscentIcon : AscentDarkIcon}
              className="w-28"
            />
            <RiMenu3Fill className="cursor-pointer" />
          </div>
          <div className="flex flex-col gap-3  ">
            {userSidebarLayout.map((item) => (
              <div
                key={item.id}
                className="flex text-1xl items-center gap-4 hover:bg-primary px-3 py-2 cursor-pointer rounded-sm"
              >
                {/* <Home /> <span>Home</span> */}
                <item.icon className="text-textPrimary" />{" "}
                <span className="text-textPrimary">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] bg-textPrimary" />
          <div className="w-full flex flex-col mt-4 text-textPrimary">
            <div>
              <span className="uppercase font-semibold">settings</span>
            </div>
            <div className="flex flex-col gap-3 mt-4 px-3 ">
              <div className="flex text-1xl items-center gap-4 py-2 cursor-pointer">
                <Settings /> <span >Settings</span>
              </div>
              <div className="flex text-1xl items-center gap-4 py-2 cursor-pointer">
                <LogOut /> <LogoutModal />
              </div>
              <div className="flex text-1xl items-center gap-4 py-2 cursor-pointer">
                <HelpCircle/> <span>Help centere</span>
              </div>
            </div>
          </div>
          <div className="w-full absolute left-0 bottom-0 h-40  flex items-end p-2">
            <div className=" w-full border flex items-center gap-2 bg-backgroundAccent rounded-md px-2">
              <div className="h-16 w-16  rounded-full">
                <img src={defaultProfile} alt="" />
              </div>
              <div className="flex flex-col h-20 justify-center gap-2">
                <span>{user.firstname}</span>
                <span className="line-clamp-1">{user.email}</span>
              </div>
            </div>
          </div>
        </aside>
        <main className="col-span-6">
          <Header />
          <Outlet />
        </main>
      </main>
    );
  } else {
    return (
      <main>
        <Header />
        <Outlet />
      </main>
    );
  }
};
export default Layout;
