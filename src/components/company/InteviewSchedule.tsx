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
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderSubmitButton } from "../custom/LoaderButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { scheduleInterview } from "@/redux/actions/jobActions";
import { useRef } from "react";
const interviewFormSchema = z.object({
  title: z.string().max(50).min(2),
  time: z.string(),
});
export function InterviewShedule() {
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<z.infer<typeof interviewFormSchema>>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: {
      title: "",
    },
  });
  const { job } = useSelector((state: RootState) => state.job);
  const closeRef = useRef<HTMLButtonElement>(null);
  const submitInterviewScheduleForm = async (
    values: z.infer<typeof interviewFormSchema>
  ) => {
    const res = await dispatch(
      scheduleInterview({
        jobId: String(job?._id),
        applicantId: String(job?.applicantDetails._id),
        payload: {
          time: values.time,
          title: values.title,
        },
      })
    );
    if (res.type.endsWith("fulfilled")) {
      closeRef.current?.click();
    }
  };
  const { loading } = useSelector((state: RootState) => state.userData);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="min-w-36 h-12 flex items-center justify-center gap-2 text-primary bg-primary/5 px-3">
          <Plus /> Add Schedule intreview
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex w-full justify-between items-center">
            <AlertDialogTitle>Schedule interviews</AlertDialogTitle>
            <AlertDialogCancel
              className="p-0 border-none bg-transparent hover:bg-transparent"
              ref={closeRef}
            >
              <X className="w-5" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription>
            <div className="w-full">
              <Form {...form}>
                <form
                  className="w-full flex flex-col gap-3"
                  onSubmit={form.handleSubmit(submitInterviewScheduleForm)}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Type of interview
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example:- HR round,Mechine test"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is type of inerview
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Time of interview
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            placeholder="example:- HR round,Mechine test"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is the time of interview
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex justify-end">
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
