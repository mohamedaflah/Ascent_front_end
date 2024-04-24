import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import uploadImage from "@/assets/upl.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addExperinceFormSchema } from "@/schema/userUpdateExperinceForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { NewLoadingButton } from "../custom/NewLoadingBtn";
import { useState } from "react";
import { updateProfileUser } from "@/redux/actions/userActions";
import { uploadImageToCloudinary } from "@/util/uploadImage";
interface ChildProp {
  closeModal?: () => void;
}

export function UserUpdateAddExperince({ closeModal }: ChildProp) {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addExperinceFormSchema>>({
    resolver: zodResolver(addExperinceFormSchema),
    defaultValues: {
      description: "",
      image: null,
      location: "",
      title: "",
    },
  });

  const dispatch: AppDispatch = useDispatch();
  const [localLoad, setLocalLoad] = useState<boolean>(false);
  const { loading, user } = useSelector((state: RootState) => state.userData);
  async function addExperienceFOrm(
    values: z.infer<typeof addExperinceFormSchema>
  ) {
    setLocalLoad(true);
    const uploadedImage = await uploadImageToCloudinary(values.image);
    await dispatch(
      updateProfileUser({
        userId: user?._id,
        sendData: {
          experiences: [
            // eslint-disable-next-line no-unsafe-optional-chaining
            ...user?.experiences,
            {
              title: values.title,
              description: values.description,
              location: values.location,
              image: uploadedImage,
            },
          ],
        },
      })
    );
    closeModal && closeModal();
    setLocalLoad(false);
  }
  return (
    <main className="w-full">
      <form
        className="w-full h-full space-y-2"
        onSubmit={handleSubmit(addExperienceFOrm)}
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
                placeholder="enter designation"
                value={watch("title")}
                onChange={(e) => setValue("title", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Input
                type="text"
                placeholder="enter company name "
                value={watch("location")}
                onChange={(e) => setValue("location", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="text-red-500">
          {errors && <>{errors.image?.message}</>}
        </div>
        <div className="text-red-500">
          {errors && <>{errors.title?.message}</>}
        </div>
        <div className="text-red-500">
          {errors && <>{errors.location?.message}</>}
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
