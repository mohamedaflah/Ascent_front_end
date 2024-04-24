import { NewLoadingButton } from "@/components/custom/NewLoadingBtn";
import { updateProfileUser } from "@/redux/actions/userActions";
import { AppDispatch, RootState } from "@/redux/store";
import { userUpdateAboutUpdateForm } from "@/schema/userUpdateaboutUpdate";

import { Textarea } from "@/shadcn/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

interface ChildProp {
  closeModal?: () => void;
}

export function UpdateUserAbout({ closeModal }: ChildProp) {
  const { loading, user } = useSelector((state: RootState) => state.userData);
  const dispatch: AppDispatch = useDispatch();
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userUpdateAboutUpdateForm>>({
    resolver: zodResolver(userUpdateAboutUpdateForm),
    defaultValues: {
      about: "",
    },
  });

  function submitUserAboutFOrm(
    values: z.infer<typeof userUpdateAboutUpdateForm>
  ) {
    dispatch(
      updateProfileUser({
        userId: user?._id,
        sendData: {
          about: values?.about,
        },
      })
    ).then(() => {
      closeModal && closeModal();
    });
  }
  useEffect(() => {
    setValue("about", user?.about);
  }, [setValue, user]);
  return (
    <main className="w-full h-full">
      <form
        className="w-full space-y-2"
        onSubmit={handleSubmit(submitUserAboutFOrm)}
      >
        <div className="w-full  flex flex-col">
          <label htmlFor="" className="font-semibold">
            About
          </label>
          <Textarea
            className="w-full"
            placeholder="write about you"
            value={watch("about")}
            onChange={(e) => setValue("about", e.target.value)}
          ></Textarea>
          <div className="text-red-400">
            {errors && (errors?.about?.message as ReactNode)}
          </div>
        </div>

        <div className="h-14 flex items-end">
          <NewLoadingButton loading={loading} type="submit">
            Update
          </NewLoadingButton>
        </div>
      </form>
    </main>
  );
}
