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
import ButtonLoading from "./ButtonLoading";
import { Button } from "@/shadcn/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/actions/userActions";
import { AppDispatch } from "@/redux/store";

import { useNavigate } from "react-router-dom";

const signupFormSchema = z.object({
  email: z.string().email({ message: " Please provide valid email " }),
  password: z.string(),
});

interface ChildProps {
  setSignup: (state: boolean) => void;
}
const LoginForm: React.FC<ChildProps> = ({ setSignup }) => {
  const loading = true;
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch:AppDispatch = useDispatch();
  const navigate=useNavigate()
  async function signupSubmit(values: z.infer<typeof signupFormSchema>) {
    dispatch(loginUser({email:values.email,password:values.password,role:"user"})).then(()=>{
      
      navigate('/')
    })
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
        <div className="w-full">
          <Button className="w-full font-semibold" type="submit">
            {loading ? "Create   An Acccount" : <ButtonLoading />}
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
