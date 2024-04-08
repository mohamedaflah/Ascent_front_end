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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Pen } from "lucide-react";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderSubmitButton } from "../custom/LoaderButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateInterviewFeedback } from "@/redux/actions/jobActions";
import { useParams } from "react-router-dom";

interface ChildProp {
  interviewId: string;
}

// {
//     jobId: string;
//     applicantId: string;
//     interivewId: string;
//     feedbackDescription: string;
//     feedback: string;
//   }
const feedbackFormSchema = z.object({
  feedback: z.string().min(2).max(300),
  feedbackDescription: z.string().min(5),
});
export const UpdateFeedback = forwardRef<HTMLButtonElement, ChildProp>(
  ({ interviewId }, ref) => {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    const { jobId, applicantId } = useParams();
    const { loading } = useSelector((state: RootState) => state.job);
    const dispatch: AppDispatch = useDispatch();
    const form = useForm<z.infer<typeof feedbackFormSchema>>({
      resolver: zodResolver(feedbackFormSchema),
      defaultValues: {
        feedback: "",
        feedbackDescription: "",
      },
    });
    const handleFeedbackFormSubmit = (
      values: z.infer<typeof feedbackFormSchema>
    ) => {
      values;
      dispatch(
        updateInterviewFeedback({
          applicantId: String(applicantId),
          jobId: String(jobId),
          interivewId: interviewId,
          feedback: values.feedback,
          feedbackDescription: values.feedbackDescription,
        })
      );
    };
    return (
      <>
        <button
          onClick={onOpen}
          className=" flex items-center justify-center h-12 min-w-28 gap-2 px-3 bg-primary/5 text-primary"
          ref={ref}
        >
          <Pen className="w-5" /> Add feedback
        </button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <span>Update feedback</span>
                </ModalHeader>
                <ModalBody>
                  <div className="w-full min-h-56">
                    <Form {...form}>
                      <form
                        className="w-full flex flex-col gap-2"
                        onSubmit={form.handleSubmit(handleFeedbackFormSubmit)}
                      >
                        <FormField
                          control={form.control}
                          name="feedback"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">
                                feedback title
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="example:- intermediate,good"
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
                          name="feedbackDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold">
                                feedback description
                              </FormLabel>
                              <FormControl>
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
                        <div className="flex justify-end">
                          <LoaderSubmitButton loading={loading}>
                            Submit
                          </LoaderSubmitButton>
                        </div>
                      </form>
                    </Form>
                  </div>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
);
