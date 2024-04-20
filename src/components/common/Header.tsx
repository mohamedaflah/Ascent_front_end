import AscentIcon from "../../assets/lightico.svg";
import AscentDarkIcon from "../../assets/darkIco.svg";

import { ModeToggle } from "../them-modal-toggle";
import { useContext, useEffect, useState } from "react";
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/shadcn/theme-provider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SignupModal from "../SignupModal";
import LoginModal from "../LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CustomNavLink } from "../custom/CustomNav";
import { Menu } from "lucide-react";
import { NavbarSheet } from "../HeaderSheet";

interface ChildProp {
  setSideBarState?: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ setSideBarState }: ChildProp) => {
  const [theme, setTheme] = useState<"dark" | "light" | "system">();
  const [landing, setisLanding] = useState<boolean>();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.userData);
  const context: ThemeProviderState = useContext(ThemeProviderContext);
  useEffect(() => {
    setTheme(context?.theme);
  }, [context]);
  useEffect(() => {
    setisLanding(location.pathname === "/");
  }, [location]);
  const navigate = useNavigate();

  return (
    <header
      className={`w-full mx-auto sticky top-0 left-0 z-10 ${
        user && "border-b"
      }   ${
        landing && !user
          ? `dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative ${
              location.pathname !== "/" ? "bg-background" : "bg-accenting "
            }`
          : `${location.pathname !== "/" ? "bg-background" : "bg-accenting "}`
      } `}
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <header
        className={`h-20 flex items-center justify-center   ${
          !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
        } mx-auto`}
      >
        {!user ? (
          <div className="h-[80%] bg-transparent w-full   flex justify-between">
            <div className="flex items-center gap-20">
              <img
                src={theme === "light" ? AscentIcon : AscentDarkIcon}
                className="cursor-pointer"
                onClick={() => navigate("/")}
              />

              <div className=" gap-10 hidden md:flex">
                <CustomNavLink to="/findjobs">Find jobs</CustomNavLink>
                <CustomNavLink to={"/browscompanies"}>Brows companies</CustomNavLink>
              </div>
            </div>

            <div className="flex items-center text-2xl gap-4 ">
              <div className="text-sm flex gap-4">
                <LoginModal />

                <SignupModal />
              </div>

              <ModeToggle />
              <div className="grid justify-center">
                <NavbarSheet />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[80%] bg-transparent w-full flex justify-between items-center ">
            <div className="flex">
              <Menu
                className="w-5 lg:hidden flex "
                onClick={() =>
                  setSideBarState && setSideBarState((prev) => !prev)
                }
              />
            </div>
            <div className="h-full flex gap-3 items-center">
              <NavLink
                to={"/"}
                className={
                  "px-3 min-w-28 text-primary font-semibold h-10 border  flex items-center justify-end rounded-sm"
                }
              >
                Back to home
              </NavLink>
              <ModeToggle />
            </div>
          </div>
        )}
      </header>
    </header>
  );
};
export default Header;
