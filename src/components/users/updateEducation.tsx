// userUpdateAndAddEducationSchmea
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import uploadImage from "@/assets/upl.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { NewLoadingButton } from "../custom/NewLoadingBtn";
import { useEffect, useState } from "react";
import { updateProfileUser } from "@/redux/actions/userActions";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { userUpdateAndAddEducationSchmea } from "@/schema/userEducation";

import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../custom/Calendar";
import { imageUrlToFileObject } from "@/util/imageToFIle";
import { User } from "@/types/types.user";
interface ChildProp {
  closeModal?: () => void;
  education: {
    image: string;
    university: string;
    course: string;
    year: { from: Date; to: Date };
    description: string;
    _id: string;
  };
}

export function UserEducaitonUpdationForm({
  closeModal,
  education,
}: ChildProp) {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userUpdateAndAddEducationSchmea>>({
    resolver: zodResolver(userUpdateAndAddEducationSchmea),
    defaultValues: {
      course: "",
      description: "",
      image: null,
      university: "",
    },
  });
  const { user, loading }: { user: User; loading: boolean } = useSelector(
    (state: RootState) => state.userData
  );
  user;
  useEffect(() => {
    setValue("description", education?.description);
    setValue("course", education?.course);
    setValue("university", education?.university);
    if (education.year.from) {
      setValue("year.from", String(education?.year.from));
    }
    if (education.year.to) {
      setValue("year.to", String(education?.year.from));
    }
    imageUrlToFileObject(education.image).then((res) => {
      setValue("image", res as unknown as FileList);
    });
  }, [education, setValue]);

  const dispatch: AppDispatch = useDispatch();
  const [localLoad, setLocalLoad] = useState<boolean>(false);

  async function addAndUpdateEducationForm(
    values: z.infer<typeof userUpdateAndAddEducationSchmea>
  ) {
    setLocalLoad(true);
    const uploadedImage = await uploadImageToCloudinary(values.image);
    const newEducations = user?.education?.map((value) => {
      if (value?._id === education._id) {
        return {
          image: uploadedImage,
          university: value.university,
          course: value.course,
          year: { from: value.year.from, to: value.year.to },
          description: value.description,
        };
      } else {
        return value;
      }
    });
    const res = await dispatch(
      updateProfileUser({
        userId: String(user?._id),
        sendData: {
          education: newEducations,
        },
      })
    );
    if (res.type.endsWith("fulfilled")) {
      closeModal && closeModal();
      setLocalLoad(false);
    }
  }
  return (
    <main className="w-full">
      <form
        className="w-full h-full space-y-2"
        onSubmit={handleSubmit(addAndUpdateEducationForm)}
      >
        <div className="w-full gap-2 flex items-center h-24">
          <label
            htmlFor="Img"
            className="cursor-pointer items-center justify-center min-h-24 min-w-24 border rounded-md flex flex-col relative overflow-hidden "
          >
            <input
              type="file"
              className="hidden"
              id="Img"
              onChange={(e) =>
                setValue(
                  "image",
                  e?.target?.files?.[0] as unknown as FileList | null
                )
              }
            />
            {!watch("image") ? (
              <>
                <img src={uploadImage} className="w-20" alt="" />
                <span>upload image </span>
              </>
            ) : (
              <>
                <img
                  src={URL.createObjectURL(
                    watch("image") as unknown as Blob | MediaSource
                  )}
                  alt=""
                  className="size-[90%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md object-cover"
                />
              </>
            )}
          </label>
          <div className="w-full flex flex-col gap-2 justify-between h-full ">
            <div className="space-y-1">
              <Input
                type="text"
                placeholder="enter university name"
                value={watch("university")}
                onChange={(e) => setValue("university", e.target.value)}
                className={`${
                  errors && errors.university?.message && "border-red-500"
                }`}
              />
            </div>
            <div className="space-y-1">
              <Input
                type="text"
                placeholder="enter course or designarion "
                value={watch("course")}
                onChange={(e) => setValue("course", e.target.value)}
                className={`${
                  errors && errors.course?.message && "border-red-500"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="text-red-500">
          {errors && <>{errors.image?.message}</>}
        </div>

        <div className="w-full space-y-2">
          <label>Select pass out year</label>
          <div className="w-full grid grid-cols-2 gap-2 p-3 rounded-md border">
            <div className="space-y-2">
              <label>from</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !watch("year.from") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("year.from") ? (
                      format(String(watch("year.from")), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className=" w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    // selected={"helo"}
                    onSelect={(date: Date | undefined) =>
                      setValue("year.from", String(date))
                    }
                    fromYear={1960}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-300">
                {errors && errors.year?.from?.message}
              </p>
            </div>
            <div className="space-y-2">
              <label>to</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !watch("year.to") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watch("year.to") ? (
                      format(watch("year.to"), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className=" w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    // selected={"helo"}
                    onSelect={(date: Date | undefined) =>
                      setValue("year.to", String(date))
                    }
                    fromYear={1960}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-300">
                {errors && errors.year?.to?.message}
              </p>
            </div>
            <p className="text-red-400">{errors && errors.year?.message}</p>
          </div>
        </div>
        <div className="w-full">
          <Textarea
            className="w-full"
            placeholder="Enter description"
            value={watch("description")}
            onChange={(e) => setValue("description", e.target.value)}
          ></Textarea>
        </div>
        <div className="text-red-500">
          {errors && errors.description?.message}
        </div>
        <div className="">
          <NewLoadingButton loading={loading || localLoad} type="submit">
            Submit
          </NewLoadingButton>
        </div>
      </form>
    </main>
  );
}
