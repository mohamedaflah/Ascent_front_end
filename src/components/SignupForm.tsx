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
import ButtonLoading from "./custom/ButtonLoading";
import { Button } from "@/shadcn/ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef} from "react";
import { signupUser } from "@/redux/actions/userActions";
import { z } from "zod";

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
    await dispatch(signupUser(values))
  }
  const {loading}=useSelector((state:RootState)=>state.userData)
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col  mt-5 gap-5"
        onSubmit={form.handleSubmit(signupSubmit)}
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Firstname</FormLabel>
              <FormControl>
                <Input placeholder="firstname.." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display firstname.
              </FormDescription>
              <FormMessage className="font-semibold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Lastname</FormLabel>
              <FormControl>
                <Input placeholder="lastname.." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display lastname.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Email</FormLabel>
              <FormControl>
                <Input placeholder="email @.." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Password</FormLabel>
              <FormControl>
                <Input placeholder="* * *" type="password" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmpass"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="* * *" type="password" {...field} />
              </FormControl>
              <FormDescription ref={confirmPassref}></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <Button className={`w-full font-semibold ${loading&&"pointer-events-none bg-blue-400"}`} type="submit">
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
  );
};

export default SignupForm;
