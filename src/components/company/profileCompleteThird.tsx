import { z } from "zod";
import { Progress } from "@/shadcn/ui/progress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Company } from "@/types/oneCompanyType";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";

import { Button } from "@/shadcn/ui/button";
import uploadImage from "../../assets/undraw_add_files_re_v09g.svg";
import { RiArrowRightFill } from "react-icons/ri";
import { Input } from "@/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ChangeEvent } from "react";
import { Upload } from "lucide-react";
import ButtonLoading from "../custom/ButtonLoading";
import { updateProfileThreePercent } from "@/redux/actions/secondaryAction";
import { getUser } from "@/redux/actions/userActions";

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
const formSchema = z.object({
  certificate: fileSchema.nullable(),
});
export function ThreePercentageCompletion() {
  const { user }: { user: Company } = useSelector(
    (state: RootState) => state.userData
  );
  const {loading}=useSelector((state:RootState)=>state.userData)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificate: null,
    },
  });
  const dispatch:AppDispatch=useDispatch()
  async function submitForm(values: z.infer<typeof formSchema>) {
    if (!values.certificate) toast.error("Please Upload you certificate");
    console.log(values);
    await dispatch(updateProfileThreePercent({ceritificate:values.certificate as File,id:String(user?._id)}))
    await dispatch(getUser())
  }

  return (
    <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[42%] min-h-96 border p-1 bg-backgroundAccent rounded-md flex flex-col">
      <div className="w-full">
        <Progress
          value={33.33 * Number(user?.profileCompletionStatus?.split("")[0])}
          className="rounded-sm h-2"
        />
      </div>
      <div className="p-2 ">
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-3"
            onSubmit={form.handleSubmit(submitForm)}
          >
            <FormField
              control={form.control}
              name="certificate"
              // eslint-disable-next-line no-empty-pattern
              render={({ }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Please Upload you Company Certificate
                  </FormLabel>
                  <FormControl>
                    <div className="w-full relative">
                      <Input
                        type="file"
                        className="hidden"
                        id="ceritifcate"
                        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          form.setValue(
                            "certificate",
                            e?.target?.files?.[0] as File
                          )
                        }
                      />

                      <label
                        htmlFor="ceritifcate"
                        className="w-full min-h-96 border flex flex-col items-center justify-center rounded-md cursor-pointer "
                      >
                        {form.getValues("certificate") ? (
                          <iframe
                            src={URL.createObjectURL(
                              form.getValues("certificate") as Blob
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
                            <span>Click and Upload Certificate</span>
                          </>
                        )}
                      </label>
                      {form.getValues("certificate") && <label htmlFor="ceritifcate" className="absolute cursor-pointer right-0 -bottom-3 h-9 w-9 bg-primary flex items-center justify-center rounded-full">
                        <Upload/>
                      </label>}
                    </div>
                  </FormControl>

                  <FormDescription>
                    This is your company official certificate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-10 w-full flex justify-end">
              <Button
                className={`min-w-28 flex gap-3 font-semibold ${
                  loading && "pointer-events-none "
                }`}
                type="submit"
              >
                {!loading ? (
                  <span className="flex gap-2 items-center justify-between">
                    Next <RiArrowRightFill />
                  </span>
                ) : (
                  <ButtonLoading />
                )}
              </Button>
            </div>
{/* 
             */}
          </form>
        </Form>
      </div>
    </div>
  );
}
