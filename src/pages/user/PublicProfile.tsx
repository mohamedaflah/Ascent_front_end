import {
  CalendarDays,
  Edit,
  Flag,
  Languages,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2Icon,
} from "lucide-react";
import HeaderPic from "../../assets/Header_Photo.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import pdfImage from "@/assets/pdf.png";
import { User } from "@/types/types.user";
import { format } from "date-fns";
import { AdditionalDetailsEdit } from "@/components/users/AdditionalDetailEdit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";
import { UserUpdateModalEdit } from "../../components/users/userUpdateModalEdit";
import { UpdateBannerForm } from "../../components/users/updateBannerForm";
import { useRef } from "react";
import { UpdateNameForm } from "../../components/users/updateName";
import { UpdateUserAbout } from "../../components/users/userAboutUpdate";
import { UserUpdateAddExperince } from "@/components/users/userUpdateAddExperienceForm";
import { UserUpdateExperinceForm } from "@/components/users/updateExperience";
export function PublicProfile() {
  const { user }: { user: User } = useSelector(
    (state: RootState) => state.userData
  );
  const updateModalRef = useRef<HTMLButtonElement>(null);
  function closeUpdateModal() {
    updateModalRef.current?.click();
  }
  return (
    <main className="w-full ">
      <main
        className={`min-h-screen pb-5 relative overflow-y-auto mt-5 flex-col lg:flex-row  flex  w-[95%] md:w-[95%] mx-auto gap-3 justify-between items-start scrollbar-hide  `}
      >
        <div className="h-full w-full  space-y-3 ">
          <div className="w-full min-h-72  flex flex-col border ">
            <div className="h-56 w-full border relative ">
              <UserUpdateModalEdit
                editType="white"
                title="click and update images"
                ref={updateModalRef}
              >
                <UpdateBannerForm closeModalFn={closeUpdateModal} />
              </UserUpdateModalEdit>
              <img
                src={user?.coverImage ? user?.coverImage : HeaderPic}
                className="object-cover w-full h-full"
                alt=""
              />
            </div>
            <div className="min-h-28 w-full flex   ">
              <div className="relative">
                <div className="h-36 w-36  rounded-full absolute -top-16 left-5 bg-white p-1">
                  <img
                    src={user?.icon ? user?.icon : HeaderPic}
                    className="h-full w-full object-cover rounded-full"
                    alt=""
                  />
                </div>
              </div>
              <div className="min-h-16 w-full flex justify-end ">
                <div className="w-40 h-36 "></div>
                <div className="w-[70%] lg:w-[82%] h-full py-3 flex justify-between">
                  <div className="w-[60%] ml-5 h-full  flex flex-col gap-3">
                    <div>
                      <h1 className="maintxt text-3xl font-bold">
                        {user?.firstname && user.lastname ? (
                          <>
                            {user?.firstname} {user?.lastname}
                          </>
                        ) : (
                          "Not provided"
                        )}
                      </h1>
                    </div>
                    <div className="text-textPrimary ">
                      <p>
                        {user?.currengDesignation ? (
                          <>{user?.currengDesignation}</>
                        ) : (
                          "Not provided"
                        )}
                      </p>
                    </div>
                    <div className="text-textPrimary flex gap-2 items-center">
                      {user?.location ? (
                        <>
                          <MapPin className="w-6" /> {user?.location}
                        </>
                      ) : (
                        <>location is Not provided</>
                      )}
                    </div>
                    <div className="text-textPrimary flex gap-2">
                      <div className="ml-2 flex gap-3 uppercase text-green-500 p-2 items-center justify-center border border-green-500 rounded-sm">
                        <Flag />{" "}
                        {user?.stage ? user?.stage : "Open for oppertunities"}
                      </div>
                    </div>
                  </div>
                  <div className="w-[40%] h-full flex justify-end px-4">
                    <UserUpdateModalEdit
                      editType="button"
                      title="update general details"
                      ref={updateModalRef}
                    >
                      <UpdateNameForm closeModal={closeUpdateModal} />
                    </UserUpdateModalEdit>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  border p-3">
            <div className="w-full h-16 flex justify-between">
              <h1 className="maintxt text-2xl font-semibold">About me</h1>
              <UserUpdateModalEdit
                title="update about section"
                editType="blue"
                ref={updateModalRef}
              >
                <UpdateUserAbout closeModal={closeUpdateModal} />
              </UserUpdateModalEdit>
            </div>
            <div className="divClass">{user?.about}</div>
          </div>
          <div className="flex p-2 flex-col border">
            <div className="w-full min-h-32 border-b p-3">
              <div className="w-full h-16 flex justify-between">
                <h1 className="maintxt text-2xl font-semibold">Experinces</h1>
                <UserUpdateModalEdit
                  editType="plus"
                  title="Add experience"
                  ref={updateModalRef}
                >
                  <UserUpdateAddExperince closeModal={closeUpdateModal} />
                </UserUpdateModalEdit>
              </div>
              <>
                {user &&
                  user?.experiences &&
                  user?.experiences?.length <= 0 && (
                    <>
                      <div className="h-full text-[15px] w-full flex items-center justify-center">
                        There is No experience added
                      </div>
                    </>
                  )}
                {user?.experiences?.map((experience, index) => {
                  return (
                    <div
                      key={experience?._id}
                      className={`w-full flex min-h-32 ${
                        index + 1 !== user?.experiences?.length && "border-b"
                      } gap-2  py-5 md:gap-0 `}
                    >
                      <div className="w-28 lg:w-[15%] h-full">
                        <div className="size-28 rounded-full ">
                          <img
                            src={experience.image}
                            className="w-full h-full object-cover rounded-full "
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="w-[86%]  h-full flex flex-col">
                        <div className="w-full  flex justify-between">
                          <h2 className="maintxt text-xl font-semibold">
                            {experience?.title}
                          </h2>
                          <div className="flex gap-2">
                            <div className="h-10 w-10 flex justify-center items-center border text-primary">
                              <Trash2Icon className="w-5" />
                            </div>
                            <UserUpdateModalEdit
                              editType="blue"
                              ref={updateModalRef}
                            >
                              <UserUpdateExperinceForm
                                closeModal={closeUpdateModal}
                                experienceData={experience}
                              />
                            </UserUpdateModalEdit>
                          </div>
                        </div>
                        <div className="w-full  flex justify-between">
                          <h2 className="maintxt font-bold text-[14px]">
                            {experience?.location}
                          </h2>
                        </div>
                        <div className="divClass w-full  flex justify-between">
                          {experience?.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </div>
          <div className="flex p-2 flex-col border">
            <div className="w-full min-h-56 border-b p-3">
              <div className="w-full h-16 flex justify-between">
                <h1 className="maintxt text-2xl font-semibold">Education</h1>
                <div className="h-10 w-10 flex justify-center items-center border text-primary">
                  <Plus className="w-5" />
                </div>
              </div>
              <div className="w-full flex min-h-32 gap-2 lg:gap-0 ">
                <div className="w-28 lg:w-[15%] h-full">
                  <div className="w-28 h-28 rounded-full ">
                    <img
                      src={HeaderPic}
                      className="w-full h-full object-cover rounded-full "
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-[86%]  h-full flex flex-col">
                  <div className="w-full  flex justify-between">
                    <h2 className="maintxt text-xl font-semibold">
                      Harvard University
                    </h2>
                    <div className="h-10 w-10 flex justify-center items-center border text-primary">
                      <Edit className="w-5" />
                    </div>
                  </div>
                  <div className="w-full  flex justify-between flex-col">
                    <h2 className="maintxt ">
                      Postgraduate degree, Applied Psychology
                    </h2>
                    <h2 className="maintxt ">2010-1020</h2>
                  </div>
                  <div className="divClass w-full  flex justify-between mt-3">
                    Created and executed social media plan for 10 brands
                    utilizing multiple features and content types to increase
                    brand outreach, engagement, and leads. multiple features and
                    content types to increase brand outreach, engagement, and
                    leads. multiple features and content types to increase brand
                    outreach, engagement, and leads.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-2 flex-col border ">
            <div className="w-full  border-b p-3">
              <div className="w-full h-16 flex justify-between">
                <h1 className="maintxt text-2xl font-semibold">Skills</h1>
                <div className="h-10 w-10 flex justify-center items-center border text-primary">
                  <Plus className="w-5" />
                </div>
              </div>
              <div className="w-full flex  flex-wrap gap-3">
                {user?.skills?.map((value, index) => (
                  <div
                    key={index}
                    className="h-10 px-3 flex justify-center items-center bg-primary/10 rounded-md text-primary"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" md:flex w-full lg:w-1/2 min-h-60    flex-col gap-3 lg:sticky top-0 left-0">
          <div className="w-full p-3 border">
            <div className="w-full flex justify-between">
              <h1 className="maintxt text-xl font-semibold">
                Additional Details
              </h1>
              <AdditionalDetailsEdit />
            </div>
            <div className="w-full flex flex-col">
              <div className="flex gap-2 text-textPrimary">
                <Mail className="w-5" />
                <h1 className="maintxt ">Email</h1>
              </div>
              <div className="pl-7 font-semibold">{user?.email}</div>
            </div>
            <div className="w-full flex flex-col mt-3 ">
              <div className="flex gap-2 text-textPrimary">
                <Phone className="w-5" />
                <h1 className="maintxt ">Phone</h1>
              </div>
              <div className="pl-7 font-semibold">94559399</div>
            </div>
            <div className="w-full flex flex-col mt-3 ">
              <div className="flex gap-2 text-textPrimary">
                <CalendarDays className="w-5" />
                <h1 className="maintxt ">Date of birgth</h1>
              </div>
              <div className="pl-7 font-semibold">
                {user?.dateofbirth ? (
                  <>{format(new Date(String(user?.dateofbirth)), "PPP")}</>
                ) : (
                  "Not provided"
                )}
              </div>
            </div>
            <div className="w-full flex flex-col mt-3 ">
              <div className="flex gap-2 text-textPrimary">
                <Languages className="w-5" />
                <h1 className="maintxt ">Phone</h1>
              </div>
              <div className="pl-7 font-semibold">
                <span>English</span>
                {" , "} <span>French</span>
              </div>
            </div>
          </div>
          <div className="w-full p-3 border">
            <div className="w-full flex justify-between">
              <h1 className="maintxt text-xl font-semibold">Social Links</h1>
              <div className="h-10 w-10 flex justify-center items-center border text-primary">
                <Edit className="w-5" />
              </div>
            </div>
            {user?.sociallinks?.map((value, index) => {
              return (
                <div className="w-full flex flex-col" key={index}>
                  <div className="flex gap-2 text-textPrimary">
                    <Mail className="w-5" />
                    <h1 className="maintxt ">Email</h1>
                  </div>
                  <div className="pl-7 font-semibold">{value}</div>
                </div>
              );
            })}
          </div>
          <div className="w-full p-3 border">
            <div className="w-full h-10 flex justify-end gap-2">
              <div className="h-10 w-10 flex justify-center items-center border text-primary">
                <Plus className="w-5" />
              </div>
              <div className="h-10 w-10 flex justify-center items-center border text-primary">
                <Edit className="w-5" />
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {user?.resumes && user?.resumes.length > 0 && (
                <>
                  {user.resumes?.map((link, index) => {
                    return (
                      <AccordionItem value="item-1" key={index}>
                        <AccordionTrigger className="flex gap-2 items-center">
                          <div className="flex gap-2">
                            <img src={pdfImage} className="h-4" alt="" />
                            Resume {index + 1}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="h-auto">
                          <embed src={link} className="w-full h-96" type="" />
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </>
              )}
            </Accordion>
          </div>
        </div>
      </main>
    </main>
  );
}
