import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";


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
import { shortListApplication } from "@/redux/actions/jobActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
const shortListFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(430),
});
type ShortListModalProps = object;
export const RejectModal = forwardRef<HTMLButtonElement, ShortListModalProps>(
  (_, ref) => {
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
            status: "Rejected",
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
          <button className=" h-full w-full flex justify-start items-center " ref={ref}>Rejected</button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <ModalHeader>Interview Rejected</ModalHeader>
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
                            reson of rejection
                          </FormLabel>
                          <FormControl>
                            {/* <Input placeholder="Enter description" {...field} /> */}
                            <Textarea
                              placeholder="describe the reason of rejection"
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
  }
);
