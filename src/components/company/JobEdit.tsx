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
  Edit,
  FormInputIcon,
  MoveHorizontal,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { LabelField } from "../custom/LabelField";

import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../custom/Calendar";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getAllCategories } from "@/redux/actions/categoryAction";
import toast from "react-hot-toast";
import { LoaderSubmitButton } from "../custom/LoaderButton";
import { Job } from "@/types/types.jobReducer";
import { updateJob } from "@/redux/actions/jobActions";
const salaryRangeSchema = z
  .object({
    from: z.number().min(0, { message: "Salary must be positive" }),
    to: z.number(),
  })
  .refine((data) => (data?.to && data?.from ? data.to >= data.from : true), {
    message: "Max salary must be greater than or equal to min salary",
    path: ["to"], // This indicates which field the error message is associated with
  });
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
  salaryrange: salaryRangeSchema,
  qualification: z.array(z.string()),
  skills: z.array(z.string()),
});
interface ChildProp {
  jobData: Job;
}
export function JobEdit({ jobData }: ChildProp) {
  const form = useForm<z.infer<typeof jobformSchema>>({
    resolver: zodResolver(jobformSchema),
    defaultValues: {
      jobTitle: "",
      employment: "",
      description: "",
      category: "",
      joblocation: "",
      responsibilities: "",
      skills: [],
      qualification: [],
    },
  });
  const [job, setJob] = useState<Job>();
  useEffect(() => {
    setJob(jobData);
    form.setValue("jobTitle", job?.jobTitle as string);
    form.setValue("description", job?.description as string);
    form.setValue("experience", Number(job?.experience));
    form.setValue("category", job?.categoryId as string);
    form.setValue("employment", job?.employment as string);
    form.setValue("joblocation", job?.joblocation as string);
    form.setValue("salaryrange.from", job?.salaryrange.from as number);
    form.setValue("salaryrange.to", job?.salaryrange.to as number);
    form.setValue("vacancies", Number(job?.vacancies.available));
    form.setValue("expiry", String(job?.expiry));
    form.setValue("responsibilities", String(job?.responsibilities));
    form.setValue("skills", job?.skills as string[]);
    form.setValue("qualification", job?.qualification as string[]);
  }, [form, job, jobData]);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [arrayValues, setArrayValues] = useState<{
    skills: string;
    qualification: string;
  }>({ skills: "", qualification: "" });
  const hanldeArrayValueDelete = (
    Idx: number,
    type: "skills" | "qualification"
  ) => {
    const values = form.watch(type);
    values.splice(Idx, 1);
    form.setValue(type, values);
  };
  const handleQualiandSkillInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setArrayValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSettingArrayValue = (
    value: string,
    type: "skills" | "qualification"
  ) => {
    if (!value) {
      toast.error("Please fill field");
      return;
    }

    setArrayValues((prev) => ({ ...prev, [type]: "" }));
    const values = form.watch(type);
    const newValues = [...values, value];
    form.setValue(type, newValues);
  };

  const { categories } = useSelector((state: RootState) => state.category);
  const { loading } = useSelector((state: RootState) => state.job);
  const submitFirstForm = async (values: z.infer<typeof jobformSchema>) => {
    console.log(values);
    if (!values.category || values.category == "") {
      toast.error("Please Select category");
      return;
    }
    if (!values.employment || values.employment == "") {
      toast.error("Please Select Employment type");
      return;
    }
    console.log(values);
    const res = await dispatch(
      updateJob({
        id: job?._id as string,
        sendPayload: {
          ...values,
          vacancies: {
            status: true,
            available: values.vacancies,
            filled: Number(job?.vacancies.filled),
          },
        },
      })
    );
    if (res.type.endsWith("fulfilled")) {
      toast.success("Job updated");
      closeRef.current?.click();
    }
  };
  const isDateDisabled = (day: Date): boolean => {
    return isBefore(day, addDays(new Date(), -1));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="cursor-pointer  w-9">
        <Edit />
        
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[50%] lg:min-w-[38%] max-h-[790px] overflow-y-auto">
        <AlertDialogHeader>
          <div className="w-full h-10 flex justify-between">
            <AlertDialogTitle>update job</AlertDialogTitle>
            <AlertDialogCancel className={`p-0  h-5 `} ref={closeRef}>
              <X className="w-5" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription>
            <div className="w-full ">
              {
                <Form {...form}>
                  <form
                    className="w-full   gap-2 h-[500px] overflow-y-auto px-1"
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
                                  <SelectValue placeholder={job?.employment} />
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
                                  <SelectValue placeholder={job?.category} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories
                                  ?.filter((value) => value.status)
                                  .map((value) => (
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
                    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-2 min-h-16 mt-5">
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
                                value={form.getValues("experience")}
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
                                value={form.getValues("vacancies")}
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
                    <div className="w-full min-h-32 flex flex-col gap-2 border p-2 rounded-md mt-10">
                      <div className="w-full flex gap-2">
                        <Input
                          type="text"
                          placeholder="add required skills"
                          name="skills"
                          value={arrayValues.skills}
                          onChange={handleQualiandSkillInputChange}
                        />
                        <Button
                          className="w-28 dark:bg-backgroundAccent border-2  border-spacing-1"
                          type="button"
                          onClick={() =>
                            handleSettingArrayValue(
                              arrayValues?.skills,
                              "skills"
                            )
                          }
                        >
                          Add
                        </Button>
                      </div>
                      <div className="w-full min-h-16 rounded-md p-3 border flex flex-wrap gap-2">
                        {form.watch("skills")?.map((value, Idx) => {
                          return (
                            <div
                              className="h-10 min-w-28 bg-backgroundAccent p-2 flex justify-between items-center border rounded-md"
                              key={Idx}
                            >
                              {value}{" "}
                              <X
                                className="w-5 cursor-pointer"
                                onClick={() =>
                                  hanldeArrayValueDelete(Idx, "skills")
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="w-full min-h-32 flex flex-col gap-2 border p-2 mt-2 rounded-md">
                      <div className="w-full flex gap-2">
                        <Input
                          type="text"
                          placeholder="add qualifications"
                          name="qualification"
                          value={arrayValues.qualification}
                          onChange={handleQualiandSkillInputChange}
                        />
                        <Button
                          className="w-28 dark:bg-backgroundAccent border-2  border-spacing-1"
                          type="button"
                          onClick={() =>
                            handleSettingArrayValue(
                              arrayValues.qualification,
                              "qualification"
                            )
                          }
                        >
                          Add
                        </Button>
                      </div>
                      <div className="w-full min-h-16 rounded-md p-3 border flex flex-wrap gap-2">
                        {form.watch("qualification")?.map((value, Idx) => {
                          return (
                            <div
                              className="h-10 min-w-28 bg-backgroundAccent p-2 flex justify-between items-center border rounded-md"
                              key={Idx}
                            >
                              {value}{" "}
                              <X
                                className="w-5 cursor-pointer"
                                onClick={() =>
                                  hanldeArrayValueDelete(Idx, "qualification")
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                      <LabelField>Salary Range</LabelField>
                      <div className="flex-col md:flex-row w-full flex justify-between items-center border p-2 rounded-md">
                        <FormField
                          control={form.control}
                          name="salaryrange.from"
                          render={() => (
                            <FormItem className="w-full">
                              <LabelField>From</LabelField>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Salary from"
                                  onChange={(e) =>
                                    form.setValue(
                                      "salaryrange.from",
                                      Number(e.target.value)
                                    )
                                  }
                                  value={form.watch("salaryrange.from")}
                                />
                              </FormControl>

                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="w-20 h-10 mt-3  items-center hidden md:flex">
                          <MoveHorizontal className="w-10" />
                        </div>
                        <FormField
                          control={form.control}
                          name="salaryrange.to"
                          render={() => (
                            <FormItem className="w-full">
                              <LabelField>To</LabelField>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Salary to"
                                  onChange={(e) =>
                                    form.setValue(
                                      "salaryrange.to",
                                      Number(e.target.value)
                                    )
                                  }
                                  value={form.watch("salaryrange.to")}
                                />
                              </FormControl>

                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="w-full h-10 flex mt-4 justify-end">
                      <LoaderSubmitButton
                        className="flex gap-3"
                        loading={loading}
                      >
                        Submit <FormInputIcon />
                      </LoaderSubmitButton>
                    </div>
                  </form>
                </Form>
              }
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
