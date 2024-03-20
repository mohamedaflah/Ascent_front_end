import { Globe, Settings, User2, UserCircle } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export function ProfileLayout() {
  return (
    <main className="w-full flex flex-col">
      <div className="flex flex-col w-[95%] md:w-[95%] mx-auto">
        {/* <div className="w-full h-80 border flex flex-col rounded-md">
          <div className="w-full h-56">
            <img src={"https://media.istockphoto.com/id/1208738316/photo/abstract-geometric-network-polygon-globe-graphic-background.webp?b=1&s=170667a&w=0&k=20&c=Ewa2JDeA8E9k9ch3IYWkSYdEkTEhyaMNfNLkClag-j4="} className="h-full w-full object-cover" alt="" />
          </div>
          <div className="w-full h-28  border relative">
            <div className="absolute h-36 w-36 rounded-full border -top-16 left-4">

            </div>
          </div>
        </div> */}
        <div className="w-full  min-h-20  flex flex-col justify-between border-b">
          <div className="w-full">
            <h2 className="maintxt text-xl font-semibold">My Profile</h2>
          </div>
          <div className="w-full flex justify-between gap-2 md:gap-16 md:justify-normal">
            <NavLink
              to={"/"}
              className={`flex gap-2 border-b border-primary p-2 font-semibold`}
            >
              <User2 /> Personal
            </NavLink>
            <NavLink
              to={"/"}
              className={`flex gap-2 border-b border-primary p-2 font-semibold`}
            >
              <UserCircle /> Profile
            </NavLink>
            <NavLink
              to={"/"}
              className={`flex gap-2 border-b border-primary p-2 font-semibold`}
            >
              <Globe /> Social Links
            </NavLink>
            <NavLink
              to={"/"}
              className={`flex gap-2 border-b border-primary p-2 font-semibold`}
            >
              <Settings /> Account Settings
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </main>
  );
}
