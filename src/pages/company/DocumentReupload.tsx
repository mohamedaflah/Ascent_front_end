import { TechBox } from "@/components/custom/TechBox";
import { techIndustries } from "@/constants/industries";
import { AppDispatch, RootState } from "@/redux/store";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import uploadImage from "../../assets/undraw_add_files_re_v09g.svg";
import { Textarea } from "@/shadcn/ui/textarea";
import { Company } from "@/types/oneCompanyType";
import { cn } from "@/util/cn";
import { imageUrlToFileObject } from "@/util/imageToFIle";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { LoaderSubmitButton } from "@/components/custom/LoaderButton";
import { updateCompleteProfileCompany } from "@/redux/actions/secondaryAction";
import toast from "react-hot-toast";
import { Calendar } from "@/components/custom/Calendar";

const fileSchema = z.custom<FileList>();
const MAX_FILE_SIZE = 5 * 1024 * 1024; // Example: 5MB max size
const ACCEPTED_FILE_TYPE = "application/pdf";
const certificateSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "File size should be 5MB or less",
  })
  .refine((file) => file.type === ACCEPTED_FILE_TYPE, {
    message: "Only PDF files are allowed",
  });
const formSchema = z.object({
  website: z.string().min(4).includes("http"),
  LinkedInLink: z.string().min(4).includes("http"),
  description: z.string().min(10),
  coverImage: fileSchema.nullable(), // Use .nullable() to allow null as a default value
  icon: fileSchema.nullable(), // Use .nullable() to allow null as a default value
  industry: z.string().min(2),
  foundedDate: z.string(),
  registrationId: z.string().min(2),
  techStack: z.array(z.string()),
  locations: z.array(z.string()),
  certificate: certificateSchema.nullable(),
});
export function DocumentReupload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, loading }: { user: Company; loading: boolean } = useSelector(
    (state: RootState) => state.userData
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      industry: "",
      registrationId: "",
      website: "",
      LinkedInLink: "",
      coverImage: null,
      techStack: [],
      icon: null,
      locations: [],
    },
  });
  const [stack, techStackValue] = useState<string>("");
  const [locationVal, setLocation] = useState<string>("");
  const handleTechStackArrayChange = () => {
    if (stack) {
      const techStack = form.getValues("techStack");

      const newtechStack = [...techStack, stack];
      form.setValue("techStack", newtechStack);
      techStackValue("");
    }
  };
  const locationArrayChange = () => {
    if (locationVal) {
      const techStack = form.watch("locations");
      const newtechStack = [...techStack, locationVal];
      form.setValue("locations", newtechStack);
      setLocation("");
    }
  };
  function techStackDelete(index: number) {
    const newtechStack = [...form.getValues("techStack")];
    newtechStack.splice(index, 1); // Remove the element at the specified index
    form.setValue("techStack", newtechStack);
  }
  function locationDelete(index: number) {
    const newtechStack = [...form.getValues("locations")];
    newtechStack.splice(index, 1); // Remove the element at the specified index
    form.setValue("locations", newtechStack);
  }

  const dispatch: AppDispatch = useDispatch();
  const handleSubmition = async (values: z.infer<typeof formSchema>) => {
    const res = await dispatch(
      updateCompleteProfileCompany({ data: values, id: String(user._id) })
    );
    if (res.type == "fulfilled") {
      toast.success("Documents updated");
    }
  };
  useEffect(() => {
    async function setValues() {
      const coverImage = await imageUrlToFileObject(String(user?.coverImage));
      const icon = await imageUrlToFileObject(String(user.icon));
      const certificate = await imageUrlToFileObject(String(user.certificate));

      form.setValue("coverImage", coverImage as never);
      form.setValue("icon", icon as never);
      form.setValue("LinkedInLink", user?.LinkedInLink);
      form.setValue("description", String(user?.description));
      form.setValue("foundedDate", String(user?.foundedDate));
      form.setValue("industry", String(user?.industry));
      form.setValue("locations", user?.locations);
      form.setValue("techStack", user?.techStack as string[]);
      form.setValue("certificate", certificate);
      form.setValue("registrationId", String(user.registrationId));
      form.setValue("website", user.website as string);
    }
    setValues();
  }, [user, form]);
  return (
    <main className="w-full h-screen z-20 overflow-y-auto scrollbar-hide ">
      <section className="w-[95%] mx-auto h-full py-2">
        <div className="w-full h-full">
          <Form {...form}>
            <form
              className="w-full h-full"
              onSubmit={form.handleSubmit(handleSubmition)}
            >
              <div className="w-full min-h-64  relative  ">
                <label
                  className="w-full h-36 lg:h-56 relative flex items-center cursor-pointer"
                  htmlFor="cover"
                >
                  {form.watch("coverImage") ? (
                    <img
                      src={URL.createObjectURL(
                        form.watch("coverImage") as never
                      )}
                      className="w-full h-full absolute object-cover rounded-sm "
                      alt=""
                    />
                  ) : (
                    <h1 className="text-center w-full ">Upload cover image</h1>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="cover"
                    onChange={(e) => {
                      // Handle cover image file change
                      const file = e.target.files?.[0];
                      form.setValue("coverImage", file as never);
                    }}
                  />
                  <div className="w-[95%]   z-10 absolute left-1/2 -translate-x-1/2 bottom-2 flex items-end gap-4 ">
                    <label
                      htmlFor="icon"
                      className="lg:w-40 cursor-pointer w-24 flex items-center justify-center h-24 lg:h-36 rounded-3xl overflow-hidden border  bg-white p-1  left-5 -bottom-20"
                    >
                      {form.watch("icon") ? (
                        <img
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          src={URL.createObjectURL(form.watch("icon") as never)}
                          alt="Cover Image Preview"
                          className="h-full w-full object-cover rounded-3xl  "
                        />
                      ) : (
                        <>
                          <h1 className="text-center">upload logo</h1>
                        </>
                      )}
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
                  </div>
                </label>
              </div>
              <div className="w-full min-h-56 flex flex-col lg:w-[95%] mx-auto">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* <Input placeholder="Enter description" {...field} /> */}
                        <Textarea
                          className="w-full h-32"
                          placeholder="Enter description"
                          {...field}
                        ></Textarea>
                      </FormControl>
                      <FormDescription>
                        This is your company description
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="techStack"
                  // eslint-disable-next-line no-empty-pattern
                  render={({}) => (
                    <FormItem>
                      <FormControl className="transition-all duration-300 p-2 rounded-md border">
                        <div className="flex flex-col gap-3">
                          <div className="w-full h-10  flex gap-3">
                            <Input
                              type="text"
                              className=" border focus-visible:ring-0 outline-none"
                              ref={inputRef}
                              placeholder="Eneter tech stack "
                              value={stack}
                              onChange={(e) => techStackValue(e.target.value)}
                            />
                            <Button
                              className="w-28"
                              type="button"
                              onClick={handleTechStackArrayChange}
                            >
                              Add
                            </Button>
                          </div>
                          <div
                            className="w-full  min-h-20 bg-background rounded-md p-1 flex flex-wrap gap-2"
                            onClick={() => inputRef.current?.focus()}
                          >
                            {form?.watch("techStack")?.map((value, inde) => (
                              <TechBox
                                value={value}
                                key={inde}
                                index={inde}
                                from="techstack"
                                techStackDelete={techStackDelete}
                              />
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        This is your company using tech stack.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="locations"
                  render={() => (
                    <FormItem>
                      <FormControl className="transition-all duration-300 p-3 border rounded-md">
                        <div className="flex flex-col gap-3">
                          <div className="w-full h-10  flex gap-3">
                            <Input
                              type="text"
                              className=" border focus-visible:ring-0 outline-none"
                              ref={inputRef}
                              placeholder="Eneter locations "
                              value={locationVal}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                            <Button
                              className="w-28"
                              type="button"
                              onClick={locationArrayChange}
                            >
                              Add
                            </Button>
                          </div>
                          <div
                            className="w-full  min-h-20 bg-background rounded-md p-1 flex flex-wrap gap-2"
                            onClick={() => inputRef.current?.focus()}
                          >
                            {form.watch("locations").map((value, inde) => (
                              <TechBox
                                value={value}
                                key={inde}
                                index={inde}
                                from="location"
                                techStackDelete={locationDelete}
                              />
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        This is your company locations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full lg:w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className=" w-full grid grid-rows-1 items-end  gap-4">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl className="">
                            <Input
                              className="w-full"
                              placeholder="http://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is company website link
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
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder="http://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is company linkedIn.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={String(user.industry)}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {techIndustries.map((value) => {
                                return (
                                  <SelectItem value={value} key={value}>
                                    {value}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            This is your industry
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="foundedDate"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !form.watch("foundedDate") &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {form.watch("foundedDate") ? (
                                    format(form.watch("foundedDate"), "PPP")
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
                                  className="w-full"
                                  mode="single"
                                  captionLayout="dropdown-buttons"
                                  selected={field.value as never}
                                  onSelect={(date: Date | undefined) =>
                                    form.setValue("foundedDate", String(date))
                                  }
                                  fromYear={1960}
                                  toYear={2030}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormDescription>
                            company founded date
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="registrationId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="#92034"
                              {...field}
                            />
                          </FormControl>

                          <FormDescription>
                            This is your registration id
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="certificate"
                    // eslint-disable-next-line no-empty-pattern
                    render={({}) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className={`${
                              form.getValues("certificate") &&
                              "pdf-container3 lg:pdf-container3 "
                            } w-full relative max-h-full`}
                          >
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
                            {form.getValues("certificate") && (
                              <label
                                htmlFor="ceritifcate"
                                className="absolute text-white cursor-pointer right-0 -bottom-3 h-9 w-9 bg-primary flex items-center justify-center rounded-full"
                              >
                                <Upload className="w-5"/>
                              </label>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full lg:w-[98%] h-12 mt-5 flex justify-end">
                <LoaderSubmitButton
                  loading={loading}
                  className="w-full md:w-auto"
                >
                  update
                </LoaderSubmitButton>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
