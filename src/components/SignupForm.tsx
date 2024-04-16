import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import ButtonLoading from "./custom/ButtonLoading";
import { Button } from "@/shadcn/ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { signupUser } from "@/redux/actions/userActions";
import { z } from "zod";
import { Toast } from "primereact/toast";
import { LabelField } from "./custom/LabelField";

const signupFormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "firstname must be atleast 2 letters" })
      .max(30, { message: "firstname mustbe lessthatn 30 " }),
    lastname: z
      .string()
      .min(2, { message: "lastname must be atleast 2 letters" })
      .max(30, { message: "lastname mustbe lessthatn 30 " }),
    email: z.string().email({ message: " Please provide valid email " }),
    password: z.string().min(8, {
      message:
        "Password contain minimum 8 charecters one letters and one digit",
    }),
    confirmpass: z.string(),
  })
  .refine((data) => data.password === data.confirmpass, {
    message: "Password and confirm password must be match",
    path: ["confirmpass"],
  });
interface ChildProps {
  setSignup: (state: boolean) => void;
}
const SignupForm: React.FC<ChildProps> = ({ setSignup }) => {
  const toast = useRef<Toast>(null);
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Registration Completed",
      life: 3000,
    });
  };
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpass: "",
    },
  });
  const confirmPassref = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();

  async function signupSubmit(values: z.infer<typeof signupFormSchema>) {
    const res = await dispatch(signupUser(values));
    if (res.type.endsWith("fulfilled")) {
      showSuccess();
    }
  }
  const { loading } = useSelector((state: RootState) => state.userData);
  return (
    <>
      <Toast ref={toast} />
      <Form {...form}>
        <form
          className=" w-full   mt-5 space-y-5 h-[420px] relative overflow-y-auto scrollbar-hide px-1 "
          onSubmit={form.handleSubmit(signupSubmit)}
        >
          
          <FormField
            control={form.control}
            name="firstname"
            
            render={({ field }) => (
              <FormItem>
                <LabelField>Firstname</LabelField>
                <FormControl>
                  <Input placeholder="firstname.." {...field} />
                </FormControl>
                <FormDescription className="flex justify-start ">
                  This is your public display firstname.
                </FormDescription>
                <FormMessage className="font-semibold flex justify-start " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <LabelField>Lastname</LabelField>
                <FormControl>
                  <Input placeholder="lastname.." {...field} />
                </FormControl>
                <FormDescription className="flex justify-start ">
                  This is your public display lastname.
                </FormDescription>
                <FormMessage className="flex justify-start " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <LabelField>Email</LabelField>
                <FormControl>
                  <Input placeholder="email @.." {...field} />
                </FormControl>
                <FormDescription className="flex justify-start ">
                  This is your public display email.
                </FormDescription>
                <FormMessage className="flex justify-start " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <LabelField>Password</LabelField>
                <FormControl>
                  <Input placeholder="* * *" type="password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage className="flex justify-start text-start" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpass"
            render={({ field }) => (
              <FormItem>
                <LabelField>
                  Confirm password
                </LabelField>
                <FormControl>
                  <Input placeholder="* * *" type="password" {...field} />
                </FormControl>
                <FormDescription ref={confirmPassref}></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full sticky bottom-0 left-0 shadow-2xl">
            <Button
              className={`w-full font-semibold ${
                loading && "pointer-events-none bg-blue-400"
              }`}
              type="submit"
            >
              {!loading ? "Create   An Acccount" : <ButtonLoading />}
            </Button>
          </div>
          <div className="w-full flex justify-center">
            <div className="flex gap-2 text-[15px]">
              Already have an Account?{" "}
              <button
                className="text-primary"
                type="button"
                onClick={() => {
                  setSignup(false);
                }}
              >
                Login
              </button>{" "}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
