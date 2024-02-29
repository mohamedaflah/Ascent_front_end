import AscentIcon from "../../assets/lightico.svg";
import AscentDarkIcon from "../../assets/darkIco.svg";
import { RiMenu3Fill } from "react-icons/ri";
import { ModeToggle } from "../them-modal-toggle";
import { useContext, useEffect, useState } from "react";
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/shadcn/theme-provider";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const context: ThemeProviderState = useContext(ThemeProviderContext);
  const [theme, setTheme] = useState<"dark" | "light" | "system">();
  const [landing,setisLanding]=useState<boolean>()
  const location=useLocation()
  useEffect(() => {
    setTheme(context?.theme);
  }, [context]);
  useEffect(()=>{
    setisLanding(location.pathname==='/')
  },[location])
  return (
    <header className={`h-20 flex items-center justify-center sticky top-0 left-0 z-10 ${landing?"bg-accenting":""}`}>
      <div className="h-[90%] bg-transparent w-full  flex justify-between">
        <div className="flex items-center gap-20">
          <img src={theme === "light" ? AscentIcon : AscentDarkIcon} />

          <div className=" gap-10 hidden sm:flex">
            <Link to={"/jobs"} className="text-textPrimary">
              Find Jobs
            </Link>
            <Link to={"/companies"} className="text-textPrimary">
              Brows companies
            </Link>
          </div>
        </div>

        <div className="flex items-center text-2xl gap-4 ">
          <div className="text-sm flex gap-4">
            <Link
              to={"/login"}
              className="px-5 py-2 rounded-md border border-textPrimary text-textPrimary font-semibold"
            >
              Login
            </Link>
            <Link
              to={"/login"}
              className="px-5 py-2 rounded-md  border-black text-textPrimary font-semibold bg-primary border-none text-white"
            >
              Signup
            </Link>
          </div>
          <ModeToggle />
          <RiMenu3Fill className="sm:hidden" />
        </div>
      </div>
    </header>
  );
};
export default Header;
