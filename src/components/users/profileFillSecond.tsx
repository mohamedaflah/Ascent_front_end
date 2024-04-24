import { userProfileFillSecond } from "@/schema/profileFill2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import upload from "@/assets/upl.svg";
import pdf from "@/assets/pdf.png";
import { EyeIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { NewLoadingButton } from "../custom/NewLoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { updateProfileUser } from "@/redux/actions/userActions";
interface ModalProp {
  closeModal?: () => void;
}
export function ProfileFillSecond({ closeModal }: ModalProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<z.infer<typeof userProfileFillSecond>>({
    resolver: zodResolver(userProfileFillSecond),
    defaultValues: {
      resumes: [],
      sociallinks: [],
    },
  });
  const { loading, user } = useSelector((state: RootState) => state.userData);
  const [localLoad, setLocalLoad] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const handleSecondFormSUbmition = async (
    values: z.infer<typeof userProfileFillSecond>
  ) => {
    if (values.sociallinks.length <= 0)
      return toast.error("Please add one or three social links");
    setLocalLoad(true);
    // const resumes = values.resumes.map(async (value) => {
    //   const newResume = await uploadImageToCloudinary(value);
    //   return newResume;
    // })
    const resumes = await Promise.all(
      values.resumes.map((file) => uploadImageToCloudinary(file))
    );
    alert(user?._id);
    console.log(resumes, "()");
    dispatch(
      updateProfileUser({
        userId: user?._id,
        sendData: {
          resumes: resumes,
          socialLink: values.sociallinks,
          profileCompleted: true,
          stage: values.stage,
        },
      })
    ).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        setLocalLoad(false);
        localStorage.removeItem("firstform")
        closeModal && closeModal();
      }
    });
  };
  errors;
  register;

  const [socialLink, setSocialLink] = useState<string>("");
  return (
    <div className="w-full max-h-[600px] overflow-y-auto">
      <form
        onSubmit={handleSubmit(handleSecondFormSUbmition)}
        className="space-y-2"
      >
        <div>
          <label
            htmlFor="resumes"
            className="w-full cursor-pointer items-center justify-center h-20 border  rounded-md border-primary border-dashed flex bg-backgroundAccent"
          >
            <img src={upload} className="h-20" alt="" />
            <h1>click and Upload your resumes</h1>
          </label>
          <input
            type="file"
            className="hidden"
            id="resumes"
            accept="application/pdf"
            multiple
            onChange={(e) => {
              const newFiles = Array.from(e?.target?.files as FileList);
              if (newFiles.length >= 5 || getValues("resumes").length >= 5) {
                toast.error(" Maximum 5 resume only allowed");
                return;
              }
              setValue("resumes", [...getValues("resumes"), ...newFiles]);
            }}
          />
        </div>
        <div className="w-full min-h-14 border p-2 rounded-md space-y-2">
          {watch("resumes").length <= 0 && (
            <>
              <div className="h-full w-full flex items-center justify-center">
                Resumes
              </div>
            </>
          )}
          {watch("resumes")?.map((value, index) => (
            <div
              key={JSON.stringify(value)}
              className=" w-full h-10 bg-backgroundAccent items-center px-2 justify-between flex gap-2"
            >
              <div className="flex gap-2 items-center">
                <img src={pdf} className="h-6" alt="" />
                {value?.name}
              </div>
              <div className="gap-2 items-center flex">
                <EyeIcon className="w-4 cursor-pointer" />
                <X
                  className="w-4 cursor-pointer"
                  onClick={() => {
                    setValue(
                      "resumes",
                      getValues("resumes")?.filter((_, idx) => idx !== index)
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full min-h-20 border rounded-md p-2 space-y-2">
          <div className="w-full h-10 flex gap-2 p-1 border rounded-md">
            <input
              type="text"
              placeholder="add social links"
              value={socialLink}
              onChange={(e) => setSocialLink(e.target.value)}
              className="w-full px-2 bg-transparent outline-none"
            />
            <button
              className="h-full w-24 bg-primary flex items-center justify-center text-white rounded-md "
              type="button"
              onClick={() => {
                if (!socialLink || socialLink == "")
                  return toast.error("add social link");
                setValue("sociallinks", [
                  ...getValues("sociallinks"),
                  socialLink,
                ]);
                setSocialLink("");
              }}
            >
              Add
            </button>
          </div>
          <div className="w-full min-h-10 flex flex-wrap gap-1">
            {watch("sociallinks")?.map((value, idx) => {
              return (
                <div
                  className="h-8 px-2 flex items-center justify-center bg-backgroundAccent rounded-md text-blue-500 gap-2"
                  key={value}
                >
                  {value}
                  <X
                    className="w-4 text-textPrimary"
                    onClick={() => {
                      setValue(
                        "sociallinks",
                        getValues("sociallinks")?.filter(
                          (_, index) => index !== idx
                        )
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full text-red-400">
            {errors.sociallinks && <p>{errors.sociallinks.message}</p>}
          </div>
        </div>
        <div>
          <Select onValueChange={(value) => setValue("stage", value)}>
            <SelectTrigger className="mx-auto">
              <SelectValue placeholder="Select a stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>stage</SelectLabel>
                <SelectItem value="Open for Oppertunities">
                  Open for Oppertunities
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="w-full text-red-400">
            {errors.stage && <p>{errors.stage.message}</p>}
          </div>
        </div>
        <div className="h-10 ">
          <NewLoadingButton loading={loading || localLoad} type="submit">
            Submit
          </NewLoadingButton>
        </div>
      </form>
    </div>
  );
}
