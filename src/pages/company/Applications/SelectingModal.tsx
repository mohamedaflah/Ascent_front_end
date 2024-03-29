import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";

import { forwardRef, useRef } from "react";
import { ModalHeader } from "./ModalHeader";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/shadcn/ui/textarea";
import { LoaderSubmitButton } from "@/components/custom/LoaderButton";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/custom/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { shortListApplication } from "@/redux/actions/jobActions";
const shortListFormSchema = z.object({
  title: z.string().min(5).max(100),
  feedback: z.string().min(10).max(430),
  joiningDate: z.string().optional(),
});
type ShortListModalProps = object;
export const SelectingModal = forwardRef<
  HTMLButtonElement,
  ShortListModalProps
>((_, ref) => {
  const form = useForm<z.infer<typeof shortListFormSchema>>({
    resolver: zodResolver(shortListFormSchema),
    defaultValues: {
      title: "",
      feedback: "",
    },
  });
  const { job, loading } = useSelector((state: RootState) => state.job);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const handleSubmition = async (
    values: z.infer<typeof shortListFormSchema>
  ) => {
    const res = await dispatch(
      shortListApplication({
        jobId: String(job?._id),
        applicantId: String(job?.applicantDetails._id),
        payload: {
          title: values.title,
          description: values.feedback,
          status: "Selected",
          ...(values.joiningDate && { joiningDate: values.joiningDate }),
        },
      })
    );
    if (res.type.endsWith("fulfilled")) {
      closeRef.current?.click();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className=" h-full w-full flex justify-start items-center " ref={ref}>Selected</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <ModalHeader>applicant hiring</ModalHeader>
          <AlertDialogDescription>
            <div className="w-full">
              <Form {...form}>
                <form
                  className="w-full flex flex-col gap-5"
                  onSubmit={form.handleSubmit(handleSubmition)}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold capitalize">
                          title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter title" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the title of stage.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Description of stage
                        </FormLabel>
                        <FormControl>
                          {/* <Input placeholder="Enter description" {...field} /> */}
                          <Textarea
                            placeholder="Enter feedback about candidate"
                            {...field}
                          ></Textarea>
                        </FormControl>
                        <FormDescription>
                          This is your public linked in profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="joiningDate"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="font-semibold">
                          Select candidate joining date
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !form.watch("joiningDate") &&
                                    "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {form.watch("joiningDate") ? (
                                  format(
                                    form.watch("joiningDate") as
                                      | string
                                      | number
                                      | Date,
                                    "PPP"
                                  )
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
                                  form.setValue("joiningDate", String(date))
                                }
                                fromYear={1960}
                                toYear={2030}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormDescription>
                          candidate joining date
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <LoaderSubmitButton loading={loading}>
                      Submit
                    </LoaderSubmitButton>
                    <AlertDialogCancel
                      ref={closeRef}
                      className="hidden"
                    ></AlertDialogCancel>
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
});
