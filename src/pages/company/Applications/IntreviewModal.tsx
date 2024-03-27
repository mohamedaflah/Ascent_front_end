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
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/custom/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { shortListApplication } from "@/redux/actions/jobActions";
const shortListFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(430),
  interviewDate: z.string(),
});
type ShortListModalProps = object;
export const InterviewModal = forwardRef<
  HTMLButtonElement,
  ShortListModalProps
>((_, ref) => {
  const form = useForm<z.infer<typeof shortListFormSchema>>({
    resolver: zodResolver(shortListFormSchema),
    defaultValues: {
      title: "",
      description: "",
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
          description: values.description,
          status: "Interview",
          ...(values.interviewDate && {
            interviewDate: new Date((values.interviewDate)),
          }),
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
        <Button ref={ref}>interview</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <ModalHeader>applicant interview</ModalHeader>
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Description of stage
                        </FormLabel>
                        <FormControl>
                          {/* <Input placeholder="Enter description" {...field} /> */}
                          <Textarea
                            placeholder="Enter description"
                            {...field}
                          ></Textarea>
                        </FormControl>
                        <FormDescription>
                          This is stage description
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-2">
                    <FormField
                      control={form.control}
                      name="interviewDate"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="font-semibold">
                            Select interview Scheduled date
                          </FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !form.watch("interviewDate") &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {form.watch("interviewDate") ? (
                                    format(
                                      form.watch("interviewDate") as
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
                                    form.setValue("interviewDate", String(date))
                                  }
                                  fromYear={1960}
                                  toYear={2030}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormDescription>interview date</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                  </div>
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
