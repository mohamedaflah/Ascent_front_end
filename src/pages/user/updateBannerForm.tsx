import { NewLoadingButton } from "@/components/custom/NewLoadingBtn";
import { updateProfileUser } from "@/redux/actions/userActions";
import { AppDispatch, RootState } from "@/redux/store";
import { userUpdateBannerFormSchema } from "@/schema/userUpdateBannerForm";
import { imageUrlToFileObject } from "@/util/imageToFIle";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

interface ChildProp {
  closeModalFn?: () => void;
}
export function UpdateBannerForm({ closeModalFn }: ChildProp) {
  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof userUpdateBannerFormSchema>>({
    resolver: zodResolver(userUpdateBannerFormSchema),
    defaultValues: {
      coverImage: null,
      icon: null,
    },
  });

  const dispatch: AppDispatch = useDispatch();
  const [localLoad, setLocalLoad] = useState<boolean>(false);
  const { user, loading } = useSelector((state: RootState) => state.userData);
  const submitBanners = async (
    values: z.infer<typeof userUpdateBannerFormSchema>
  ) => {
    values;
    setLocalLoad(true);
    const coverImage = await uploadImageToCloudinary(values.coverImage);
    const icon = await uploadImageToCloudinary(values.icon);
    const res = await dispatch(
      updateProfileUser({
        userId: user?._id,
        sendData: { icon: icon, coverImage: coverImage },
      })
    );
    setLocalLoad(false);
    if (res.type.endsWith("fulfilled")) {
      closeModalFn && closeModalFn();
    }
  };
  useEffect(() => {
    if (user) {
      imageUrlToFileObject(user?.coverImage).then((res) => {
        setValue("coverImage", res as unknown as FileList | null);
        imageUrlToFileObject(user?.icon).then((response) => {
          setValue("icon", response as unknown as FileList | null);
        });
      });
    }
  }, [setValue, user]);

  return (
    <main className="w-full">
      <form onSubmit={handleSubmit(submitBanners)} className="w-full space-y-2">
        <label
          htmlFor="cover"
          className="flex w-full h-32  relative rounded-md border items-center cursor-grabbing overflow-hidden"
        >
          <input
            type="file"
            className="hidden"
            id="cover"
            onChange={(e) =>
              setValue(
                "coverImage",
                e?.target?.files?.[0] as unknown as FileList | null
              )
            }
          />
          <img
            src={
              watch("coverImage")
                ? URL.createObjectURL(
                    watch("coverImage") as unknown as Blob | MediaSource
                  )
                : ""
            }
            alt="Icon"
            className="h-full w-full object-cover absolute left-0"
          />
          <label
            htmlFor="icon"
            className="size-24 rounded-full absolute left-4 cursor-pointer z-10 overflow-hidden  p-1 bg-white"
          >
            <input
              type="file"
              className="hidden"
              id="icon"
              onChange={(e) =>
                setValue(
                  "icon",
                  e?.target?.files?.[0] as unknown as FileList | null
                )
              }
            />
            <img
              src={
                watch("icon")
                  ? URL.createObjectURL(
                      watch("icon") as unknown as Blob | MediaSource
                    )
                  : ""
              }
              alt="Icon"
              className="size-full rounded-full object-cover"
            />
          </label>
        </label>
        <div>{errors && errors.icon?.message}</div>
        <div>
          <NewLoadingButton loading={localLoad || loading} type="submit">
            Update
          </NewLoadingButton>
        </div>
      </form>
    </main>
  );
}
