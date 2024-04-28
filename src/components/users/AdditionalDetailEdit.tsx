import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux/store";
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
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";

import { CalendarIcon, Edit, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { useEffect, useRef } from "react";
import { LoaderSubmitButton } from "../custom/LoaderButton";
import { User } from "@/types/types.user";
import { format } from "date-fns";
import {
  chanagePassword,
  updateProfileUser,
} from "@/redux/actions/userActions";
const profileSchema = z.object({
  phonenumber: z.string().min(10).max(10),
  dateofbirth: z.string().nonempty(),
});
const passSchema = z
  .object({
    currentPass: z.string().nonempty(),
    newPassowrd: z.string().nonempty().min(8),
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.newPassowrd === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });
export function AdditionalDetailsEdit() {
  const { loading, user }: { loading: boolean; user: User } = useSelector(
    (state: RootState) => state.userData
  );

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phonenumber: "",
      dateofbirth: "",
    },
  });
  const passform = useForm<z.infer<typeof passSchema>>({
    resolver: zodResolver(passSchema),
    defaultValues: {
      confirmPassword: "",
      newPassowrd: "",
      currentPass: "",
    },
  });

  useEffect(() => {
    form.setValue("phonenumber", user?.phonenumber ? user?.phonenumber : "");
    form.setValue(
      "dateofbirth",
      String(user?.dateofbirth && user?.dateofbirth)
    );
  }, [form, user]);

  async function profileCompletionHandleSubmit(
    values: z.infer<typeof profileSchema>
  ) {
    values;
    dispatch(
      updateProfileUser({
        userId: String(user?._id),
        sendData: {
          phonenumber: values.phonenumber,
          dateofbirth: values.dateofbirth,
        },
      })
    ).then((res) => {
      if (res.type.endsWith("fulfilled")) {
        closeRef.current?.click();
      }
    });
  }
  const dispatch: AppDispatch = useDispatch();
  async function PassChangeSubmit(values: z.infer<typeof passSchema>) {
    values;
    const res = await dispatch(
      chanagePassword({
        email: user?.email,
        newpass: values.newPassowrd,
        currentpass: values.currentPass,
      })
    );
    if (res.type.endsWith("fulfilled")) {
      closeRef.current?.click();
      passform.reset();
    }
  }
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className="bg-transparent hover:bg-transparent p-0"
      >
        <div className="h-10 w-10 flex justify-center items-center border text-primary cursor-pointer">
          <Edit className="w-5" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] sm:min-w-[70%] md:min-w-[32%]">
        <AlertDialogHeader>
          <div className="grid grid-cols-2">
            <AlertDialogTitle>Edit AddionalDetails</AlertDialogTitle>
            <AlertDialogCancel
              className="border-none bg-transparent flex justify-end p-0 hover:bg-transparent"
              ref={closeRef}
            >
              <X className="w-5" />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription className=" w-full flex flex-col gap-4">
            <div className="w-full  p-3 border rounded-md">
              <Form {...form}>
                <form
                  className="w-full min-h-full flex flex-col gap-3"
                  onSubmit={form.handleSubmit(profileCompletionHandleSubmit)}
                >
                  <div className="w-full grid grid-cols-1 gap-2">
                    <FormField
                      control={form.control}
                      name="phonenumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            mobile number
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="1234567890"
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
                      name="dateofbirth"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="font-semibold">
                            Date of birth
                          </FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !form.watch("dateofbirth") &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {form.watch("dateofbirth") ? (
                                    format(form.watch("dateofbirth"), "PPP")
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
                                    form.setValue("dateofbirth", String(date))
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
                  <div className="w-full h-10 flex justify-end">
                    <LoaderSubmitButton loading={false}>
                      Update
                    </LoaderSubmitButton>
                  </div>
                </form>
              </Form>
            </div>
            <div className="w-full border rounded-md p-3">
              <Form {...passform}>
                <form
                  className="w-full min-h-full flex flex-col gap-3"
                  onSubmit={passform.handleSubmit(PassChangeSubmit)}
                >
                  <div className="w-full grid grid-cols-1 gap-2">
                    <FormField
                      control={passform.control}
                      name="currentPass"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Current password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="1234567890"
                              {...field}
                            />
                          </FormControl>

                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-full flex flex-col gap-2 p-3 border rounded-md">
                      <FormField
                        control={passform.control}
                        name="newPassowrd"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              new password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="1234567890"
                                {...field}
                              />
                            </FormControl>

                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passform.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">
                              confirm password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="1234567890"
                                {...field}
                              />
                            </FormControl>

                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full flex justify-end">
                      <LoaderSubmitButton loading={loading}>
                        update
                      </LoaderSubmitButton>
                    </div>
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
