import { RootState } from "@/redux/store";
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
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import {
  /*CalendarIcon,*/ CalendarIcon,
  MoveRight,
  Plus,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { LabelField } from "../custom/LabelField";
import { JobpostModalTwo } from "./jobpostModaltwo";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../custom/Calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { Calendar } from "../custom/Calendar";
const salaryRangeSchema = z
  .object({
    from: z.number().min(0, { message: "Salary must be positive" }).optional(),
    to: z.number().optional(),
  })
  .refine((data) => (data?.to && data?.from ? data.to >= data.from : true), {
    message: "Max salary must be greater than or equal to min salary",
    path: ["to"], // This indicates which field the error message is associated with
  });

const jobformSchema = z.object({
  jobTitle: z.string().min(2).max(20),
  employment: z.string(),
  description: z.string().min(8),
  category: z.string(),
  joblocation: z.string(),
  salaryrange: salaryRangeSchema,
  experience: z.number().max(100).optional(),
  vacancies: z.number().optional(),
  responsibilities: z.string().min(2),
  qualification: z.array(z.string()),
  skills: z.array(z.string()),
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
      qualification: [],
      skills: [],
      expiry: "",
    },
  });

  const { user } = useSelector((state: RootState) => state.userData);
  const isSecond = !true;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
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
      <AlertDialogContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[50%] lg:min-w-[40%]">
        <AlertDialogHeader>
          <div className="w-full h-10 flex justify-between">
            <AlertDialogTitle>Post job</AlertDialogTitle>
            <AlertDialogCancel className="p-0  h-5">
              <X className="w-5" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription>
            <div className="w-full min-h-56">
              {!isSecond ? (
                <Form {...form}>
                  <form className="w-full flex flex-col h-full">
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 min-h-16 ">
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>jobt title</LabelField>
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
                        name="employment"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>Choose an employment type</LabelField>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a employment type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={"d"}>{"value"}</SelectItem>
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
                                <SelectItem value={"d"}>{"value"}</SelectItem>
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
                              {/* <Input placeholder="Enter description" {...field} /> */}
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
                    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3 min-h-16 ">
                      <FormField
                        control={form.control}
                        name="joblocation"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>job location</LabelField>
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
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>years of experience</LabelField>
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
                        name="vacancies"
                        render={({ field }) => (
                          <FormItem>
                            <LabelField>number of vacancies</LabelField>
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
                    <div className="w-full h-10 flex mt-4 justify-end">
                      <Button className="flex gap-3">
                        Next <MoveRight />
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <JobpostModalTwo />
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
