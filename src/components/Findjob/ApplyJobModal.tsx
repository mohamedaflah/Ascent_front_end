import { AppDispatch, RootState } from "@/redux/store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";
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
import { Sparkles, Upload, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import uploadImage from "../../assets/undraw_add_files_re_v09g.svg";
import { LoaderSubmitButton } from "../custom/LoaderButton";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { applyJob } from "@/redux/actions/jobActions";
import toast from "react-hot-toast";
import { ApplicantType } from "@/types/types.jobReducer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // Example: 5MB max size
const ACCEPTED_FILE_TYPE = "application/pdf";
const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "File size should be 5MB or less",
  })
  .refine((file) => file.type === ACCEPTED_FILE_TYPE, {
    message: "Only PDF files are allowed",
  });
const applyJobSchema = z.object({
  resume: fileSchema.nullable(),
});

export function ApplyJob() {
  const form = useForm<z.infer<typeof applyJobSchema>>({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      resume: null,
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleApplyJobSubmit = async (
    values: z.infer<typeof applyJobSchema>
  ) => {
    if (!values.resume) {
      toast.error("Please upload resume");
      return;
    }
    const res = await dispatch(
      applyJob({
        userId: user._id,
        jobId: String(job?._id),
        resume: values.resume as File,
      })
    );
    if (res.type.endsWith("fulfilled")) {
      setJobApplied(true);
      closeRef.current?.click();
    }
  };
  const { job, loading } = useSelector((state: RootState) => state.job);
  const { user } = useSelector((state: RootState) => state.userData);
  const [jobApplied, setJobApplied] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobApplicant: ApplicantType[] | any = job?.applicants;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          ref={openRef}
          className={`rounded-[4px]  min-w-16 text-sm h-9 flex gap-2 relative ${
            (jobApplicant?.find(
              (value: { applicantId: string }) =>
                value?.applicantId === user?._id
            ) ||
              jobApplied) &&
            "pointer-events-none bg-blue-400"
          }`}
        >
          <Sparkles className="w-4" />

          {jobApplicant?.find(
            (value: { applicantId: string }) => value?.applicantId === user?._id
          ) || jobApplied
            ? "Applied"
            : "Apply"}
          {/* <div className="min-w-28 px-4 h-10 rounded-2xl bg-green-500/25 flex justify-center items-center gap-3">
                                Application submitted
                                <span className="block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                              </div> */}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[35%]">
        <div className="w-full flex justify-end">
          <AlertDialogCancel ref={closeRef}>
            <X className="w-5" />
          </AlertDialogCancel>
        </div>
        <div className="w-full ">
          <Form {...form}>
            <form
              className="w-full flex-col"
              onSubmit={form.handleSubmit(handleApplyJobSubmit)}
            >
              <FormField
                control={form.control}
                name="resume"
                // eslint-disable-next-line no-empty-pattern
                render={({}) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Please upload you Resume
                    </FormLabel>
                    {user?.resumes?.length > 0 ? (
                      <>
                        <div className="w-full ">
                          <FormControl>
                            <div
                              className={`${
                                form.getValues("resume") && "pdf-container2"
                              } w-full relative`}
                            >
                              <Input
                                type="file"
                                className="hidden"
                                id="ceritifcate"
                                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                  form.setValue(
                                    "resume",
                                    e?.target?.files?.[0] as File
                                  )
                                }
                              />

                              <label
                                htmlFor="ceritifcate"
                                className="w-full min-h-96 border flex flex-col items-center justify-center rounded-md cursor-pointer "
                              >
                                {form.getValues("resume") ? (
                                  <iframe
                                    src={URL.createObjectURL(
                                      form.getValues("resume") as Blob
                                    )}
                                    className="w-full h-[310px] rounded-lg"
                                    title="certificate"
                                  ></iframe>
                                ) : (
                                  <>
                                    <img
                                      src={uploadImage}
                                      className="h-[90px]"
                                      alt=""
                                    />
                                    <span>Click and Upload Resume</span>
                                  </>
                                )}
                              </label>
                              {form.getValues("resume") && (
                                <label
                                  htmlFor="ceritifcate"
                                  className="absolute cursor-pointer right-0 -bottom-3 h-9 w-9 bg-primary flex items-center justify-center rounded-full"
                                >
                                  <Upload />
                                </label>
                              )}
                            </div>
                          </FormControl>
                        </div>
                      </>
                    ) : (
                      <>
                        <FormControl>
                          <div
                            className={`${
                              form.getValues("resume") && "pdf-container2"
                            } w-full relative`}
                          >
                            <Input
                              type="file"
                              className="hidden"
                              id="ceritifcate"
                              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                form.setValue(
                                  "resume",
                                  e?.target?.files?.[0] as File
                                )
                              }
                            />

                            <label
                              htmlFor="ceritifcate"
                              className="w-full min-h-96 border flex flex-col items-center justify-center rounded-md cursor-pointer "
                            >
                              {form.getValues("resume") ? (
                                <iframe
                                  src={URL.createObjectURL(
                                    form.getValues("resume") as Blob
                                  )}
                                  className="w-full h-[310px] rounded-lg"
                                  title="certificate"
                                ></iframe>
                              ) : (
                                <>
                                  <img
                                    src={uploadImage}
                                    className="h-[90px]"
                                    alt=""
                                  />
                                  <span>Click and Upload Resume</span>
                                </>
                              )}
                            </label>
                            {form.getValues("resume") && (
                              <label
                                htmlFor="ceritifcate"
                                className="absolute cursor-pointer right-0 -bottom-3 h-9 w-9 bg-primary flex items-center justify-center rounded-full"
                              >
                                <Upload />
                              </label>
                            )}
                          </div>
                        </FormControl>
                      </>
                    )}

                    <FormDescription>
                      This is your official resume
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-10 w-full flex justify-end">
                <LoaderSubmitButton loading={loading}>
                  Submit
                </LoaderSubmitButton>
              </div>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
