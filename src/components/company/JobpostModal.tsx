import { AppDispatch, RootState } from "@/redux/store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Textarea } from "@/shadcn/ui/textarea";
import { addDays, format, isBefore } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import {
  /*CalendarIcon,*/ CalendarIcon,
  MoveRight,
  Plus,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { LabelField } from "../custom/LabelField";
import { JobpostModalTwo } from "./jobpostModaltwo";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../custom/Calendar";
import { useEffect, useRef, useState } from "react";
import { getAllCategories } from "@/redux/actions/categoryAction";
import toast from "react-hot-toast";
import { generateToken } from "@/util/generateToken";

const jobformSchema = z.object({
  jobTitle: z.string().min(2).max(20),
  employment: z.string().nonempty("Select employment"),
  description: z.string().min(8),
  category: z.string().nonempty("Select category"),
  joblocation: z.string().nonempty("Required"),
  experience: z.number().max(100),
  vacancies: z.number(),
  responsibilities: z.string().min(5),
  expiry: z.string(),
});

export function JobPost() {
  const form = useForm<z.infer<typeof jobformSchema>>({
    resolver: zodResolver(jobformSchema),
    defaultValues: {
      jobTitle: "",
      employment: "",
      description: "",
      category: "",
      joblocation: "",
      responsibilities: "",
    },
  });

  const { user } = useSelector((state: RootState) => state.userData);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (localStorage.getItem("jobpost")) {
      setIsSecond(true);
      buttonRef.current?.click();
    }
  }, []);
  const closModal = () => {
    closeRef.current?.click();
    setIsSecond(false);
  };
  const [isSecond, setIsSecond] = useState<boolean>(false);
  const { categories } = useSelector((state: RootState) => state.category);
  const submitFirstForm = (values: z.infer<typeof jobformSchema>) => {
    console.log(values);
    if (!values.category || values.category == "") {
      toast.error("Please Select category");
      return;
    }
    if (!values.employment || values.employment == "") {
      toast.error("Please Select Employment type");
      return;
    }
    const token = generateToken(values);
    localStorage.setItem("jobpost", token);
    setIsSecond(true);
  };
  const isDateDisabled = (day: Date): boolean => {
    return isBefore(day, addDays(new Date(), -1));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          ref={buttonRef}
          className="rounded-sm "
          disabled={
            status === "Pending" ||
            status == "Rejected" ||
            user?.approvelStatus?.status == "Rejected" ||
            user?.approvelStatus?.status == "Pending"
          }
        >
          <Plus /> Post job
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[50%] lg:min-w-[37%] max-h-[640px] overflow-y-auto ">
        <AlertDialogHeader>
          <div className="w-full h-10 flex justify-between">
            <AlertDialogTitle>post a job</AlertDialogTitle>
            <AlertDialogCancel
              className={`p-0  h-5 ${isSecond && "hidden"}`}
              ref={closeRef}
            >
              <X className="w-5" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription>
            <div className="w-full min-h-56">
              {!isSecond ? (
                <Form {...form}>
                  <form
                    className="w-full flex flex-col h-full gap-2"
                    onSubmit={form.handleSubmit(submitFirstForm)}
                  >
                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-16 ">
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>jobt title</LabelField>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="title of job"
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
                        name="employment"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>employment type</LabelField>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a employment type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={"Full-Time"}>
                                  Full-Time
                                </SelectItem>
                                <SelectItem value={"Part-Time"}>
                                  Part-Time
                                </SelectItem>
                                <SelectItem value={"Remote"}>Remote</SelectItem>
                                <SelectItem value={"Internship"}>
                                  Internship
                                </SelectItem>
                                <SelectItem value={"Contract"}>
                                  Contract
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>Choose an category</LabelField>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories?.filter(value=>value.status).map((value) => (
                                  <SelectItem
                                    value={String(value?._id)}
                                    key={value._id}
                                  >
                                    {value?.categoryname}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full min-h-32">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>job description</LabelField>
                            <FormControl>
                              <Textarea
                                className="h-32 w-full resize-none "
                                placeholder="Enter description"
                                {...field}
                              ></Textarea>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage className="py-3 " />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-2 min-h-16 ">
                      <FormField
                        control={form.control}
                        name="joblocation"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>job location</LabelField>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="📍Location "
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
                        name="experience"
                        render={() => (
                          <FormItem>
                            <LabelField>years of experience</LabelField>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="experince"
                                // {...field}
                                onChange={(e) =>
                                  form.setValue(
                                    "experience",
                                    Number(e.target.value)
                                  )
                                }
                              />
                            </FormControl>

                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vacancies"
                        render={() => (
                          <FormItem>
                            <LabelField>number of vacancies</LabelField>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="vacancies"
                                // {...field}
                                onChange={(e) =>
                                  form.setValue(
                                    "vacancies",
                                    Number(e.target.value)
                                  )
                                }
                              />
                            </FormControl>

                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="expiry"
                        render={({ field }) => (
                          <FormItem className="">
                            <LabelField>expiry date</LabelField>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !form.watch("expiry") &&
                                        "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {form.watch("expiry") ? (
                                      format(form.watch("expiry"), "PPP")
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
                                      form.setValue("expiry", String(date))
                                    }
                                    disabled={isDateDisabled}
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
                    <div className="w-full min-h-32">
                      <FormField
                        control={form.control}
                        name="responsibilities"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>job responsibilities</LabelField>
                            <FormControl>
                              {/* <Input placeholder="Enter description" {...field} /> */}
                              <Textarea
                                className="h-32 w-full resize-none "
                                placeholder="Enter responsibilities"
                                {...field}
                              ></Textarea>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full h-10 flex mt-4 justify-end">
                      <Button className="flex gap-3" type="submit">
                        Next <MoveRight />
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <JobpostModalTwo closeModal={closModal} />
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
