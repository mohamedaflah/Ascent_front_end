import AscentIcon from "../../../assets/lightico.svg";
import AscentDarkIcon from "../../../assets/darkIco.svg";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/shadcn/theme-provider";
import defaultProfile from "../../../assets/IMG 3.png";
import ascentFirecon from "../../../assets/Ascent_firicon.svg";
import {
  useSidbarLayoutSection2,
  userSidebarLayout,
} from "@/constants/userSidLayout";
import { RiMenu3Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../common/Header";
import { getUser } from "@/redux/actions/userActions";
function UserLayout() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">();
  const { user } = useSelector((staet: RootState) => staet.userData);
  const context: ThemeProviderState = useContext(ThemeProviderContext);
  const [sideExpand, setIsSideExpand] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setTheme(context?.theme);
  }, [context]);
  useEffect(() => {
    if (!user) {
      dispatch(getUser()).then();
    }
  }, [dispatch,user]);
  return (
    <main className=" flex ">
      <aside
        className={`h-screen border-r fixed flex-col pt-4 px-4 gap-5 lg:sticky top-0 left-0  lg:flex z-10 bg-background  ${
          sideExpand ? "w-60" : "w-24 hidden "
        } transition-all duration-500 ease-in-out`}
      >
        <div
          className={`flex justify-between items-center text-lg ${
            !sideExpand && ""
          }`}
        >
          {sideExpand ? (
            <img
              src={theme === "light" ? AscentIcon : AscentDarkIcon}
              className="w-28"
            />
          ) : (
            <img src={ascentFirecon} alt="" />
          )}

          <RiMenu3Fill
            className="cursor-pointer"
            onClick={() => setIsSideExpand(!sideExpand)}
          />
        </div>
        <div
          className={`flex flex-col gap-3 ${!sideExpand && "justify-center"}`}
        >
          {userSidebarLayout.map((item) => (
            <NavLink
              key={item?.id}
              to={
                item.label !== "My profile"
                  ? item?.link
                    ? item?.link
                    : "/"
                  : `myprofile/${user?._id}`
              }
              className={`flex text-sm items-center gap-4 hover:bg-primary hover:text-white px-2  h-9 cursor-pointer rounded-sm text-textPrimary  ${
                !sideExpand && "justify-center"
              }`}
            >
              {/* <Home /> <span>Home</span> */}
              <item.icon className="w-5" />{" "}
              {sideExpand && <span className="">{item.label as string}</span>}
            </NavLink>
          ))}
        </div>
        <div className="w-full h-[1px] bg-textPrimary" />
        <div className="w-full flex flex-col mt-4 text-textPrimary">
          <div>
            {sideExpand && (
              <span className="uppercase font-semibold">settings</span>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-4 px-3 ">
            {useSidbarLayoutSection2.map((value) => (
              <div
                key={value.id}
                className={`flex text-1xl items-center gap-4 py-2 cursor-pointer ${
                  !sideExpand && "justify-center"
                }`}
              >
                <value.icon className="w-5" />{" "}
                {sideExpand &&
                  (value.extraLabel === "Logout" ? (
                    <value.label />
                  ) : (
                    <span>{value.label as string}</span>
                  ))}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full absolute left-0 bottom-0 h-40  flex items-end p-2">
          <div
            className={` w-full border flex items-center gap-2 bg-backgroundAccent rounded-md px-2 ${
              !sideExpand && "py-2 px-2 justify-center"
            }`}
          >
            <div
              className={`h-16 w-16  rounded-full flex items-center justify-center `}
            >
              <img src={user?.icon?user?.icon:defaultProfile} alt="" className="rounded-full object-cover h-full w-full" />
            </div>
            {sideExpand && (
              <div className="flex flex-col h-20 justify-center gap-1 line-clamp-1 pr-2">
                <span>{user?.firstname}</span>
                <span className="line-clamp-1" title={user?.email}>
                  {user?.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="w-full">
        <Header setSideBarState={setIsSideExpand} />
        <Outlet />
      </main>
    </main>
  );
}
export default UserLayout;
