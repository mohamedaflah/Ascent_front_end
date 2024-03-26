import { IconLeft } from "react-day-picker";
import HeaderPic from "../../../assets/Header_Photo.svg";
import { Mail, MessageSquareText, Phone, Star } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
export function ApplicantLayout() {
  return (
    <main className="w-full min-h-screen ">
      <section className="mx-auto w-[95%] h-full  ">
        <div className="w-full h-20 flex items-center ">
          <div className="maintxt flex gap-3 text-2xl items-center ">
            <IconLeft />
            Applicant Details
          </div>
        </div>
        <div className="w-full h-full flex flex-col lg:flex-row gap-5 ">
          <div className="min-w-96   flex flex-col border pt-5 px-5 ">
            <div className="w-full flex flex-col gap-4 ">
              <div className="flex min-h-28 gap-4 ">
                <div className="w-28 h-28 rounded-full ">
                  <img
                    src={HeaderPic}
                    className="h-full w-full object-cover rounded-full"
                    alt=""
                  />
                </div>
                <div className="h-28 flex flex-col justify-between py-1">
                  <div>
                    <h1 className="maintxt text-3xl font-semibold">Aflu</h1>
                  </div>
                  <div>
                    <h2 className="text-textPrimary ">Product designer</h2>
                  </div>
                  <div className="flex gap-2">
                    <Star className="w-5" /> 4.0
                  </div>
                </div>
              </div>
              <div className="w-full min-h-28 p-3 bg-primary/5 rounded-md ">
                <div className="h-9 w-full border-b flex justify-between">
                  <span>Applied jobs</span>
                  <span className="text-textPrimary">2 days ago</span>
                </div>
                <div className="w-full flex flex-col pt-2">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Product development
                    </h2>
                  </div>
                  <div className="flex text-textPrimar items-center gap-3">
                    <h4>Marketing</h4>
                    <span className="w-[4px] h-[4px] block bg-textPrimary rounded-full"></span>
                    <h4>Full time</h4>
                  </div>
                </div>
              </div>
              <div className="w-full min-h-20 p-3 flex flex-col gap-3 bg-primary/5 rounded-md">
                <div className="maintxt w-full flex justify-between b">
                  <span>Stage</span>
                  <div className="flex gap-2 items-center">
                    <span className="w-[8px] h-[8px] block bg-primary rounded-full"></span>
                    Interview
                  </div>
                </div>
                <div>
                  <div className="w-full flex gap-1">
                    <div className="h-2 w-20 bg-primary"></div>
                    <div className="h-2 w-20 bg-primary"></div>
                    <div className="h-2 w-20 bg-primary"></div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between  ">
                  <div className="h-12 w-64 border flex items-center justify-center text-primary font-bold">
                    Shedule Interview
                  </div>
                  <div className="h-12 w-12 flex items-center justify-center border">
                    <MessageSquareText />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 min-h-56 mt-5 border-t">
              <div className="maintxt">
                <h1 className="text-2xl font-semibold">Contact </h1>
              </div>
              <div className="flex flex-col text-textPrimary mt-2 gap-3">
                <div className="w-full flex-col gap-2 ">
                  <div className="w-full flex gap-2">
                    <Mail className="w-5" />
                    Email
                  </div>
                  <div className="pl-7">aadf@gmail.com</div>
                </div>
                <div className="w-full flex-col ">
                  <div className="w-full flex gap-2">
                    <Phone className="w-5" />
                    Phone
                  </div>
                  <div className="pl-7">aadf@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full border ">
            <div className="w-full h-16 border-b flex py-3 px-5 items-center gap-5">
                <NavLink to={'/company/applicantdetail/d'} className={`applicant text-textPrimary font-semibold`}>Applicant profile</NavLink>
                <NavLink to={'resume'} className={`applicant text-textPrimary font-semibold`}>Resume</NavLink>
                <NavLink to={'hiringstage'} className={`applicant text-textPrimary font-semibold`}>Hiring stage</NavLink>
                <NavLink to={'/'} className={`applicant text-textPrimary font-semibold`}>interview Schedule</NavLink>
            </div>
            <div className="p-4">
                <Outlet/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
