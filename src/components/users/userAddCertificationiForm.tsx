import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import upload from "@/assets/upl.svg";
import pdf from "@/assets/pdf.png";
import { EyeIcon, X } from "lucide-react";

import { NewLoadingButton } from "../custom/NewLoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { updateProfileUser } from "@/redux/actions/userActions";

import { userProfileAddCertificate } from "@/schema/addCertficate";
import { useState } from "react";
import { Input } from "@/shadcn/ui/input";

interface ModalProp {
  closeModal?: () => void;
}
export function UserAddCertificate({ closeModal }: ModalProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<z.infer<typeof userProfileAddCertificate>>({
    resolver: zodResolver(userProfileAddCertificate),
    defaultValues: {
      certificate: null,
      title: "",
    },
  });
  const { loading, user } = useSelector((state: RootState) => state.userData);
  const [localLoad, setLocalLoad] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const handleSecondFormSUbmition = async (
    values: z.infer<typeof userProfileAddCertificate>
  ) => {
    values;
    setLocalLoad(true);

    const file = await uploadImageToCloudinary(values.certificate);

    dispatch(
      updateProfileUser({
        userId: user?._id,
        sendData: {
          certification: [
            ...user.certification,
            { title: values.title, file: file },
          ],
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
  return (
    <div className="w-full max-h-[600px] overflow-y-auto">
      <form
        onSubmit={handleSubmit(handleSecondFormSUbmition)}
        className="space-y-3 px-1"
      >
        <div className="w-full flex flex-col">
          <label htmlFor="">Enter certificate title</label>
          <Input
            className="w-full "
            placeholder="enter title"
            onChange={(e) => setValue("title", e.target.value)}
          />
          <p className="h-[12px] text-red-400">
            {errors && errors.title?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="resumes"
            className="w-full cursor-pointer items-center justify-center h-20 border  rounded-md border-primary border-dashed flex bg-backgroundAccent"
          >
            <img src={upload} className="h-20" alt="" />
            <h1>click and Upload your certificate</h1>
          </label>
          <input
            type="file"
            className="hidden"
            id="resumes"
            accept="application/pdf"
            onChange={(e) => {
              setValue("certificate", e?.target?.files?.[0] as unknown as File);
            }}
          />
        </div>
        <p className="h-[12px] text-red-400">
          {errors && errors.certificate?.message}
        </p>
        <div className="w-full mt-1 min-h-14 border p-2 rounded-md space-y-2">
          {watch("certificate") && (
            <>
              <div className=" w-full h-10 bg-backgroundAccent items-center px-2 justify-between flex gap-2">
                <div className="flex gap-2 items-center">
                  <img src={pdf} className="h-6" alt="" />
                  {watch("certificate")?.name}
                </div>
                <div className="gap-2 items-center flex">
                  <EyeIcon className="w-4 cursor-pointer" />
                  <X
                    className="w-4 cursor-pointer"
                    onClick={() => {
                      setValue("certificate", null);
                    }}
                  />
                </div>
              </div>
            </>
          )}
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
