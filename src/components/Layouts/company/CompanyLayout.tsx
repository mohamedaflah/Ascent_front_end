import AscentIcon from "../../../assets/lightico.svg";
import AscentDarkIcon from "../../../assets/darkIco.svg";
import { useContext, useEffect, useState } from "react";

import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/shadcn/theme-provider";
import defaultProfile from "../../../assets/IMG 3.png";
import ascentFirecon from "../../../assets/Ascent_firicon.svg";
import { useSidbarLayoutSection2 } from "@/constants/userSidLayout";
import { RiMenu3Fill } from "react-icons/ri";
import { Outlet } from "react-router-dom";


import CompanyHeader from "@/components/common/CompanyHeader";
import AscentText from "@/components/common/AscentText";
import { Loader } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import LogoutModal from "@/components/LogoutModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getUser } from "@/redux/actions/userActions";
import CompanyProfileCompletion from "@/components/company/ProfileComplete";
import { companySidBarLabels } from "@/constants/companySideLayout";




function CompanyLayout() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">();
  const { user, role, status } = useSelector(
    (staet: RootState) => staet.userData
  );

  const context: ThemeProviderState = useContext(ThemeProviderContext);
  const [sideExpand, setIsSideExpand] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setTheme(context?.theme);
    if(!user){
      dispatch(getUser()).then();
    }
  }, [context?.theme, dispatch,user]);



  return (
    <main className=" flex ">
      <aside
        className={`h-screen border-r  flex-col pt-4 px-4 gap-5  sticky top-0 left-0 hidden lg:flex ${
          sideExpand ? "w-72" : "w-28"
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
          {companySidBarLabels.map((item) => (
            <div
              key={item?.id}
              className={`flex text-1xl items-center gap-4 hover:bg-primary hover:text-white px-3 py-2 cursor-pointer rounded-sm ${
                !sideExpand && "justify-center"
              }`}
            >
              {/* <Home /> <span>Home</span> */}
              <item.icon className="text-textPrimary" />{" "}
              {sideExpand && (
                <span className="text-textPrimary">
                  {item?.label as string}
                </span>
              )}
            </div>
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
                <value.icon />{" "}
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
              <img src={!user?.icon?defaultProfile:user?.icon} alt="" className="rounded-full object-cover h-14 w-14" />
            </div>
            {sideExpand && (
              <div className="flex flex-col h-20 justify-center gap-1 line-clamp-1 pr-2">
                <span>{user?.firstname ? user?.firstname : user?.name}</span>
                <span className="line-clamp-1" title={user?.email}>
                  {user?.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="w-full relative">
        <CompanyHeader />
        
        {!user?.profileCompleted && <CompanyProfileCompletion/>}
        {role === "company" &&
        (status === "Pending" ||
          status === "Rejected" ||
          user?.approvelStatus?.status == "Rejected" ||
          user?.approvelStatus?.status == "Pending") ? (
          <main className="w-full h-screen flex items-center justify-center absolute top-0 left-0">
            <div className="absolute top-0 left-0 w-full h-full -z-10 backdrop-blur-sm opacity-70"></div>
            <div className="w-[90%] sm:w-[80%] md:w-[40%] lg:w-[34%] h-96  bg-backgroundAccent rounded-xl border flex flex-col p-5 gap-4">
              <div className="w-full h-10  flex justify-center items-center text-3xl font-bold">
                <AscentText />
              </div>
              <div className="w-full ">
                <p className="text-lg text-center font-semibold">
                  Your Request is currently {status}{" "}
                  {status === "Pending" ||
                  user?.approvelStatus?.status == "Pending"
                    ? "Admin not Responded you Request Waiting for Getting Response from adming "
                    : `Your Response hasbeen Rejected by Admin Alreaady have been send reason of rejection please check and improve Reason : ${user?.approvelStatus?.description}`}
                    
                </p>
              </div>
              <div className="w-full flex justify-center mt-10 font-semibold flex-col items-center gap-4">
                {status === "Pending" ||
                user?.approvelStatus?.status == "Pending" ? (
                  <>
                    Waiting for getting response from admin 
                    {/* <TechnologyIcon technology="javascript  " key={"1"} /> */}
                    <div className="flex justify-center items-center ">
                      <Loader className="animate-spin text-2xl" />
                    </div>
                  </>
                ) : (
                  "Admin has been rejected you "
                )}
              </div>
              <div className="flex justify-center gap-2">
                <div
                  className={`w-40 h-10 border flex items-center justify-center rounded-xl text-white font-bold ${
                    status === "Pending" ||
                    user?.approvelStatus?.status == "Pending"
                      ? "bg-yellow-300"
                      : "bg-red-400"
                  }`}
                >
                  {status ? status : user?.approvelStatus?.status}
                </div>
                <Button className="px-3 rounded-xl font-thin" title="Logout">
                  <LogoutModal />
                </Button>
              </div>
            </div>
          </main>
        ) : (
          <Outlet />
        )}
      </main>
    </main>
  );
}
export default CompanyLayout;
