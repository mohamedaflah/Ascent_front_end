import { NewLoadingButton } from "@/components/custom/NewLoadingBtn";
import { updateProfileUser } from "@/redux/actions/userActions";
import { AppDispatch, RootState } from "@/redux/store";
import { userUpdateNameAndLocationForm } from "@/schema/userUpdatenameForm";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

interface ChildProp {
  closeModal?: () => void;
}

export function UpdateNameForm({ closeModal }: ChildProp) {
  const { loading, user } = useSelector((state: RootState) => state.userData);
  const dispatch: AppDispatch = useDispatch();
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userUpdateNameAndLocationForm>>({
    resolver: zodResolver(userUpdateNameAndLocationForm),
    defaultValues: {
      currengDesignation: "",
      firstname: "",
      lastname: "",
      stage: "",
      location: "",
    },
  });

  function submitNameLocationForm(
    values: z.infer<typeof userUpdateNameAndLocationForm>
  ) {
    values;
    dispatch(
      updateProfileUser({
        userId: user?._id,
        sendData: {
          firstname: values.firstname,
          lastname: values.lastname,
          currengDesignation: values.currengDesignation,
          location: values.location,
          stage: values.stage,
        },
      })
    ).then(() => {
      closeModal && closeModal();
    });
  }
  useEffect(() => {
    setValue("firstname", user?.firstname);
    setValue("lastname", user?.lastname);
    setValue("currengDesignation", user?.currengDesignation);
    setValue("location", user?.location);
    setValue("stage", user?.stage);
  }, [setValue, user]);
  return (
    <main className="w-full h-full">
      <form
        className="w-full space-y-2"
        onSubmit={handleSubmit(submitNameLocationForm)}
      >
        <div className="w-full  flex flex-col">
          <label htmlFor="" className="font-semibold">
            firstname
          </label>
          <Input
            className="w-full"
            value={watch("firstname")}
            onChange={(e) => setValue("firstname", e.target.value)}
            type="text"
            placeholder="first name"
          />
          <div className="text-red-400">
            {errors && (errors?.firstname?.message as ReactNode)}
          </div>
        </div>
        <div className="w-full  flex flex-col">
          <label htmlFor="" className="font-semibold">
            lastname
          </label>
          <Input
            className="w-full"
            value={watch("lastname")}
            onChange={(e) => setValue("lastname", e.target.value)}
            type="text"
            placeholder="last name"
          />
          <div className="text-red-400">
            {errors && (errors?.lastname?.message as ReactNode)}
          </div>
        </div>
        <div className="w-full  flex flex-col">
          <label htmlFor="" className="font-semibold">
            currentDesignation
          </label>
          <Input
            className="w-full"
            value={watch("currengDesignation")}
            onChange={(e) => setValue("currengDesignation", e.target.value)}
            type="text"
            placeholder="student,employe"
          />
          <div className="text-red-400">
            {errors && (errors?.currengDesignation?.message as ReactNode)}
          </div>
        </div>
        <div className="w-full  flex flex-col">
          <label htmlFor="" className="font-semibold">
            location
          </label>
          <Input
            className="w-full"
            value={watch("location")}
            onChange={(e) => setValue("location", e.target.value)}
            type="text"
            placeholder="kolkata"
          />
          <div className="text-red-400">
            {errors && (errors?.location?.message as ReactNode)}
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="" className="font-semibold">
            stage
          </label>
          <Select onValueChange={(value) => setValue("stage", value)}>
            <SelectTrigger className="mx-auto">
              <SelectValue
                placeholder={watch("stage") ? watch("stage") : "Select a stage"}
              />
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
          <div className="text-red-400">
            {errors && (errors?.stage?.message as ReactNode)}
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
