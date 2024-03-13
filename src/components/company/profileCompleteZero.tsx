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
import { useForm } from "react-hook-form";
import ButtonLoading from "../custom/ButtonLoading";
import { Button } from "@/shadcn/ui/button";
import { z } from "zod";
import { Textarea } from "@/shadcn/ui/textarea";
import { MoveRight } from "lucide-react";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/redux/actions/secondaryAction";
import { Company } from "@/types/oneCompanyType";
import toast from "react-hot-toast";
import { Progress } from "@radix-ui/react-progress";
// const isFile = (value: unknown): value is File => {
//   return value instanceof File;
// };
// const maxFileSize = 1024 * 1024 * 1024; // 1 GB
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/png",
//   "image/webp",
//   "video/mp4",
//   "image/svg",
// ];

const fileSchema = z.custom<FileList>();

const dataSchema = z.object({
  website: z.string().min(4).includes("http"),
  LinkedInLink: z.string().min(4).includes("http"),
  description: z.string().min(10),
  coverImage: fileSchema.nullable(), // Use .nullable() to allow null as a default value
  icon: fileSchema.nullable(), // Use .nullable() to allow null as a default value
});
export function ZeroPercentProfileCompletionForm() {
  const form = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      website: "",
      LinkedInLink: "",
      description: "",
      coverImage: null,
      icon: null,
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const { loading, user } = useSelector((state: RootState) => state.userData);
  async function submitProfile(value: z.infer<typeof dataSchema>) {
    if (!value.coverImage && !value.icon) {
      toast.error("Please add image");
      return;
    }
    await dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateProfile({ sendData: { ...value } as Company | any, id: user._id })
    );
  }
  return (
    <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[42%] min-h-96 border p-1 bg-backgroundAccent rounded-md flex flex-col">
      <div>
        <Progress
          value={33.33 * Number(user?.profileCompletionStatus?.split("")[0]-1)}
          className="rounded-sm"
        />
      </div>
      <div className="p-5">
        <Form {...form}>
          <form
            className="flex w-full flex-col  mt-5 gap-5"
            onSubmit={form.handleSubmit(submitProfile)}
          >
            <label
              className="w-full h-40 border relative flex justify-start items-center rounded-md cursor-pointer"
              htmlFor="cover"
            >
              {form.watch("coverImage") ? (
                <img
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  src={URL.createObjectURL(form.watch("coverImage") as any)}
                  alt="Cover Image Preview"
                  className="h-full w-full object-cover  "
                />
              ):<>
              <h1 className="text-center w-full">Upload cover image</h1>
              </>}
              <input
                type="file"
                accept="image/*"
                id="cover"
                {...form.register("coverImage", {
                  required: "Cover Image is required",
                })}
                onChange={(e) => {
                  // Handle cover image file change
                  const file = e.target.files?.[0];
                  form.setValue("coverImage", file as never);
                }}
                className="hidden"
              />
              <label
                className="h-36 w-36 border rounded-full ml-3 cursor-pointer absolute left-0 flex items-center justify-center"
                htmlFor="icon"
              >
                {form.watch("icon") ? (
                  <img
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    src={URL.createObjectURL(form.watch("icon") as any)}
                    alt="Cover Image Preview"
                    className="h-full w-full object-cover rounded-full "
                  />
                ):(<>
                <h1 className="text-center">upload logo</h1>
                </>)}
                <input
                  type="file"
                  accept="image/*"
                  id="icon"
                  {...form.register("icon", {
                    required: "Cover Image is required",
                  })}
                  onChange={(e) => {
                    // Handle cover image file change
                    const file = e.target.files?.[0];
                    form.setValue("icon", file as never);
                  }}
                  className="hidden"
                />
              </label>
            </label>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Your websiteLink
                    </FormLabel>
                    <FormControl className="">
                      <Input placeholder="http://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public website link
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="LinkedInLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Your LinkedIn profile
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="http://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public linked in profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Description about you company
                    </FormLabel>
                    <FormControl>
                      {/* <Input placeholder="Enter description" {...field} /> */}
                      <Textarea
                        placeholder="Enter description"
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
            </div>
            <div className="w-full flex justify-end">
              <Button
                className={`w-40 font-semibold ${
                  loading && "pointer-events-none "
                }`}
                type="submit"
              >
                {!loading ? (
                  <span className="flex gap-2 items-center justify-between">
                    Next <MoveRight />
                  </span>
                ) : (
                  <ButtonLoading />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
