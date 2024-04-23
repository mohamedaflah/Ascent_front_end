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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/userActions";
import { AppDispatch, RootState } from "@/redux/store";

import { Link, useNavigate } from "react-router-dom";

const signupFormSchema = z.object({
  email: z.string().email({ message: " Please provide valid email " }),
  password: z.string().nonempty(),
});

interface ChildProps {
  setSignup: (state: boolean) => void;
  cancelRef?: React.RefObject<HTMLButtonElement>;
}
const LoginForm: React.FC<ChildProps> = ({ setSignup, cancelRef }) => {
  const { loading, role } = useSelector((state: RootState) => state.userData);
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  async function signupSubmit(values: z.infer<typeof signupFormSchema>) {
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
        role: "user",
      })
    ).then(() => {
      if (role === "user") {
        navigate("/");
      } else if (role === "admin") {
        navigate("/admin/");
      }
    });
  }
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col  mt-5 gap-5"
        onSubmit={form.handleSubmit(signupSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold  w-full flex justify-start">
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="email @.." {...field} />
              </FormControl>
              <FormDescription className="w-full flex justify-start">
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
              <FormLabel className="font-semibold w-full flex justify-start">
                Password
              </FormLabel>
              <FormControl>
                <Input placeholder="* * *" type="password" {...field} />
              </FormControl>
              <FormDescription className="flex justify-end ">
                <Link
                  to="/user/forgotpassword?role=user"
                  onClick={() => cancelRef?.current?.click()}
                >
                  forgot password
                </Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full">
          <Button
            className={`w-full font-semibold ${
              loading && "pointer-events-none"
            }`}
            type="submit"
          >
            {!loading ? "Create   An Acccount" : <ButtonLoading />}
          </Button>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex gap-2 text-[15px]">
            Create an new Account{" "}
            <button
              className="text-primary"
              type="button"
              onClick={() => setSignup(true)}
            >
              Signup
            </button>{" "}
          </div>
        </div>
      </form>
    </Form>
  );
};
export default LoginForm;
