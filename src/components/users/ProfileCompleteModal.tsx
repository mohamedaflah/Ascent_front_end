import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux/store";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Sparkles, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { TechBox } from "../custom/TechBox";
import { useRef, useState } from "react";
import { LoaderSubmitButton } from "../custom/LoaderButton";
import toast from "react-hot-toast";
import { updateProfileUser } from "@/redux/actions/userActions";
import { ApplicantType } from "@/types/types.jobReducer";

const profileSchema = z.object({
  phonenumber: z.string().min(10).max(10),
  dateofbirth: z.string().nonempty(),
  skills: z.array(z.string()),
  location: z.string(),
  currengDesignation: z.string().nonempty(),
});
export function CompleteProfile() {
  const { job } = useSelector((state: RootState) => state.job);
  const { user, loading } = useSelector((state: RootState) => state.userData);

  const inputRef = useRef<HTMLInputElement>(null);
  const [stack, techStackValue] = useState<string>("");
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phonenumber: "",
      skills: [],
      currengDesignation: "",
      dateofbirth: "",
    },
  });
  const handleTechStackArrayChange = () => {
    if (stack) {
      const techStack = form.watch("skills");
      const newtechStack = [...techStack, stack];
      form.setValue("skills", newtechStack);
      techStackValue("");
    }
  };

  function techStackDelete(index: number) {
    const newtechStack = [...form.getValues("skills")];
    newtechStack.splice(index, 1); // Remove the element at the specified index
    form.setValue("skills", newtechStack);
  }
  const dispatch: AppDispatch = useDispatch();
  async function profileCompletionHandleSubmit(
    values: z.infer<typeof profileSchema>
  ) {
    if (values.skills.length <= 0) toast.error("Please add atleast one skill");
    values;
    const res = await dispatch(
      updateProfileUser({
        userId: user._id as string,
        sendData: { ...values, dateofbirth: new Date(values.dateofbirth) },
      })
    );
    if (res.type.endsWith("fulfilled")) {
      closeRef.current?.click();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobApplicant: ApplicantType[] | any = job?.applicants;
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`rounded-[4px]  min-w-16 text-sm h-9 flex gap-2 ${
            jobApplicant?.find(
              (value: { applicantId: string }) =>
                value?.applicantId === user?._id
            ) && "pointer-events-none bg-blue-400"
          }`}
        >
          <Sparkles className="w-4" />
          {jobApplicant?.find((value:{ applicantId: string }) => value?.applicantId === user?._id)
            ? "Applied"
            : "Apply"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[34%]">
        <AlertDialogHeader>
          <div className="grid grid-cols-2">
            <AlertDialogTitle>Complete Basic Information</AlertDialogTitle>
            <AlertDialogCancel className="border-none bg-transparent flex justify-end p-0 hover:bg-transparent">
              <X className="w-5" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className=" w-full">
            <div className="w-full h-full">
              <Form {...form}>
                <form
                  className="w-full min-h-full flex flex-col gap-3"
                  onSubmit={form.handleSubmit(profileCompletionHandleSubmit)}
                >
                  <div className="w-full min-h-10 grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="phonenumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Enter you mobile number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="1234567890"
                              {...field}
                            />
                          </FormControl>

                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateofbirth"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="font-semibold">
                            Pick you Date of birth
                          </FormLabel>
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
                              <PopoverContent
                                align="start"
                                className=" w-auto p-0"
                              >
                                <Calendar
                                  mode="single"
                                  captionLayout="dropdown-buttons"
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
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full ">
                    <FormField
                      control={form.control}
                      name="skills"
                      // eslint-disable-next-line no-empty-pattern
                      render={({}) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Add Your Skills
                          </FormLabel>
                          <FormControl className="transition-all duration-300">
                            <div className="flex flex-col gap-3 border rounded-md ">
                              <div className="w-full h-10  flex gap-3 p-2">
                                <Input
                                  type="text"
                                  className=""
                                  ref={inputRef}
                                  placeholder="Eneter skill "
                                  value={stack}
                                  onChange={(e) =>
                                    techStackValue(e.target.value)
                                  }
                                />
                                <Button
                                  className="w-28 font-semibold"
                                  type="button"
                                  onClick={handleTechStackArrayChange}
                                >
                                  Add
                                </Button>
                              </div>
                              <div
                                className="w-full  min-h-20 bg-background rounded-md p-2 flex flex-wrap gap-2 "
                                onClick={() => inputRef.current?.focus()}
                              >
                                {form.watch("skills").map((value, inde) => (
                                  <TechBox
                                    value={value}
                                    key={inde}
                                    index={inde}
                                    from="techstack"
                                    techStackDelete={techStackDelete}
                                  />
                                ))}
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            This is your skills inluding technichal
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full min-h-10 grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Enter you current location
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="#92034"
                              {...field}
                            />
                          </FormControl>

                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currengDesignation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            what is current designation
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="eg: student,employed"
                              {...field}
                            />
                          </FormControl>

                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full justify-end flex">
                    <LoaderSubmitButton loading={loading}>
                      Submit
                    </LoaderSubmitButton>
                  </div>
                </form>
              </Form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
