import { cn } from "@/lib/utils";
import { userProfileFill } from "@/schema/userProfileFill";
import { Button } from "@/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { Popover, PopoverTrigger } from "@/shadcn/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "../custom/Calendar";
import { PopoverContent } from "@radix-ui/react-popover";
import { Input } from "@/shadcn/ui/input";
import { ReactNode, useState } from "react";
import { Textarea } from "@/shadcn/ui/textarea";
import TechnologyIcon from "../custom/TechIcon";
import toast from "react-hot-toast";
import { NewLoadingButton } from "../custom/NewLoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateProfileUser } from "@/redux/actions/userActions";
import { uploadImageToCloudinary } from "@/util/uploadImage";

export function ProfileFill() {
  const form = useForm<z.infer<typeof userProfileFill>>({
    resolver: zodResolver(userProfileFill),
    defaultValues: {
      about: "",
      skills: [],
      currengDesignation: "",
      dateofbirth: "",
      location: "",
      personalsite: "",
      icon: null,
      coverImage: null,
    },
  });
  const [skill, setSkill] = useState<string>("");
  const { loading, user } = useSelector((state: RootState) => state.userData);
  function addSkill() {
    if (!skill || skill == "") return toast.error(" please add skill ");
    const formValue = form.getValues("skills");
    form.setValue("skills", [...formValue, skill]);
    setSkill("");
  }
  const [imgLoad, setImgLoad] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  async function profileSubmit(values: z.infer<typeof userProfileFill>) {
    values;
    if (!values?.coverImage) {
      return toast.error("Please add cover image");
    }
    if (!values?.icon) {
      return toast.error("Please add icon");
    }
    if (values?.skills.length <= 0) {
      return toast.error("please add atleast one skill");
    }
    setImgLoad(true);
    const coverImage = await uploadImageToCloudinary(values.coverImage);
    const icon = await uploadImageToCloudinary(values.icon);
    await dispatch(
      updateProfileUser({
        userId: String(user?._id),
        sendData: { ...values, coverImage, icon },
      })
    );
    localStorage.setItem("firstform", "true");
    setImgLoad(false);
    console.log("🚀 ~ profileSubmit ~ values:", values);
  }
  return (
    <main className="w-full  overflow-y-auto px-1 py-2">
      <Form {...form}>
        <form
          className="w-full h-full space-y-2"
          onSubmit={form.handleSubmit(profileSubmit)}
        >
          <div className="w-full h-36 rounded-md overflow-hidden">
            <label
              htmlFor="cover"
              className="w-full flex h-full border relative items-center justify-center overflow-hidden"
            >
              <input
                type="file"
                className="hidden"
                id="cover"
                onChange={(e) =>
                  form.setValue(
                    "coverImage",
                    e?.target?.files?.[0] as unknown as FileList | null
                  )
                }
              />
              <img
                src={
                  form.watch("coverImage")
                    ? URL.createObjectURL(
                        form?.watch("coverImage") as unknown as
                          | Blob
                          | MediaSource
                      )
                    : ""
                }
                alt="cover Image"
                className="w-full h-full object-cover flex items-center justify-center cursor-pointer"
              />
              <label
                htmlFor="icon"
                className="absolute left-5 size-24 z-10 cursor-pointer overflow-hidden rounded-md border flex items-center justify-center"
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    form.setValue(
                      "icon",
                      e?.target?.files?.[0] as unknown as FileList | null
                    )
                  }
                  id="icon"
                />
                <img
                  src={
                    form.watch("icon")
                      ? URL.createObjectURL(
                          form?.watch("icon") as unknown as Blob | MediaSource
                        )
                      : ""
                  }
                  alt="Icon"
                  className="w-full h-full flex items-center justify-center object-cover"
                />
              </label>
            </label>
            <div className="w-full">
              {form?.formState?.errors["coverImage"] as ReactNode}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2  items-center gap-2 justify-between">
            <FormField
              control={form.control}
              name="dateofbirth"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-semibold">date of birth</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch("dateofbirth") &&
                              "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("dateofbirth") ? (
                            format(form.watch("dateofbirth"), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className=" w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          className="bg-backgroundAccent rounded-md"
                          selected={field.value as never}
                          onSelect={(date: Date | undefined) =>
                            form.setValue("dateofbirth", String(date))
                          }
                          fromYear={1960}
                          toYear={2030}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold  w-full flex justify-start">
                    location
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="calicut" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    write something about you
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter about" {...field}></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="currengDesignation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold  w-full flex justify-start">
                    what is current designtaion
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="student,employed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold  w-full flex justify-start">
                    personal portfolio (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://myportfolio.cloud" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full min-h-28 rounded-md border p-2 space-y-2">
            <div className="w-full h-12 border rounded-md flex items-center p-2 gap-2">
              <input
                type="text"
                placeholder="enter skill"
                className="px-2 h-full w-full bg-transparent outline-none border-none"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
              <button
                className="h-full w-20 bg-primary text-white rounded-md "
                type={"button"}
                onClick={addSkill}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.watch("skills")?.map((value, index) => (
                <div className="px-3 min-w-20 h-8 items-center justify-between rounded-md bg-backgroundAccent flex gap-2">
                  <div className="flex gap-1 items-center">
                    <TechnologyIcon technology={value} key={value} />
                    {value}
                  </div>
                  <X
                    className="w-3 cursor-pointer"
                    onClick={() => {
                      form.setValue(
                        "skills",
                        form
                          .getValues("skills")
                          .filter((_, idex) => idex !== index)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-10 justify-end">
            <NewLoadingButton
              loading={loading || imgLoad}
              type="submit"
              className="flex "
            >
              next
            </NewLoadingButton>
          </div>
        </form>
      </Form>
    </main>
  );
}
