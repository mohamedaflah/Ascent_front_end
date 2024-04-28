import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import upload from "@/assets/upl.svg";
import pdf from "@/assets/pdf.png";
import { EyeIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { NewLoadingButton } from "../custom/NewLoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { updateProfileUser } from "@/redux/actions/userActions";
import { userProfileAddresumse } from "@/schema/addResume";
import { imageUrlToFileObject } from "@/util/imageToFIle";
interface ModalProp {
  closeModal?: () => void;
  currentResumes: string[];
}
export function UserAddResume({ closeModal, currentResumes }: ModalProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<z.infer<typeof userProfileAddresumse>>({
    resolver: zodResolver(userProfileAddresumse),
    defaultValues: {
      resumes: [],
    },
  });
  const { loading, user } = useSelector((state: RootState) => state.userData);
  const [localLoad, setLocalLoad] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const handleSecondFormSUbmition = async (
    values: z.infer<typeof userProfileAddresumse>
  ) => {
    setLocalLoad(true);
    // const resumes = values.resumes.map(async (value) => {
    //   const newResume = await uploadImageToCloudinary(value);
    //   return newResume;
    // })
    const resumes = await Promise.all(
      values.resumes.map((file) => uploadImageToCloudinary(file))
    );

    dispatch(
      updateProfileUser({
        userId: user?._id,
        sendData: {
          resumes: resumes,
        },
      })
    ).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        setLocalLoad(false);

        closeModal && closeModal();
      }
    });
  };
  errors;
  register;
  useEffect(() => {
    async function convertResumtoFile() {
      const files = await Promise.all(currentResumes.map(imageUrlToFileObject));
      return files;
    }
  
    convertResumtoFile().then((resumeFiles) => {
      setValue("resumes", resumeFiles);
    });
  }, [currentResumes, setValue]);

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

        <div className="h-10 ">
          <NewLoadingButton loading={loading || localLoad} type="submit">
            Submit
          </NewLoadingButton>
        </div>
      </form>
    </div>
  );
}
