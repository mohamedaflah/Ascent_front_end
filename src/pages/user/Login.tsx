import fireIcon from "@/assets/Ascent_firicon.svg";
import { LabelField } from "@/components/custom/LabelField";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcn/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shadcn/ui/input";

import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";
import { Checkbox } from "@nextui-org/react";
import { NewLoadingButton } from "@/components/custom/NewLoadingBtn";
import left from "@/assets/Left.png";
import { Link, useNavigate } from "react-router-dom";
import { loginFormSchema } from "@/schema/LoginForm";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/userActions";

export function LoginPage() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { loading, role } = useSelector((state: RootState) => state.userData);
  const dispatch: AppDispatch = useDispatch();

  function signupSubmit(values: z.infer<typeof loginFormSchema>) {
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
    <main className="w-full pb-5">
      <section
        className="w-[85%] mx-auto h-full grid grid-cols-1 md:grid-cols-2 mt-3 gap-16"
        style={{ width: "85%" }}
      >
        <div className="flex flex-col">
          <div className="w-full ">
            <div className="w-full">
              <div className="flex gap-2 items-center">
                <img src={fireIcon} className="h-5" alt="" />
                <h1 className="font-semibold text-[15px]">
                  AS
                  <span className="text-primary">CE</span>
                  NT
                </h1>
              </div>
              <div className="w-full mt-10 maintext space-y-3">
                <h1 className=" text-2xl font-semibold capitalize">
                  Welcome back 😍
                </h1>
                <p className="text-textPrimary">
                  Searching job and get placement Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Natus, eos?
                </p>
              </div>
            </div>
          </div>
          <div className="w-full  mt-10">
            <Form {...form}>
              <form
                className="w-full "
                onSubmit={form.handleSubmit(signupSubmit)}
              >
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <LabelField>Email</LabelField>
                        <FormControl>
                          <Input placeholder="email @.." {...field} />
                        </FormControl>
                        <FormDescription className="flex justify-start "></FormDescription>
                        <FormMessage className="flex justify-start " />
                      </FormItem>
                    )}
                  />
                </div>

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

                <div className="mt-2 flex gap-2 items-center">
                  <Checkbox />
                  <label htmlFor="">agree terms and conditions</label>
                </div>
                <div className="w-full h-12 flex items-center mt-10">
                  <NewLoadingButton
                    loading={loading}
                    className="h-12 dark:bg-primary/85 border-primary border-2"
                  >
                    Sign in
                  </NewLoadingButton>
                </div>
                <div className="w-full mt-5  items-center h-10 grid grid-cols-11 ">
                  <div className="h-[1px] bg-border col-span-4"></div>
                  <div className="col-span-2 flex justify-center">
                    {" "}
                    Or log with
                  </div>
                  <div className="h-[1px] bg-border col-span-5"></div>
                </div>
                <div className="w-full h-10 flex gap-5 mt-5">
                  <div className=" h-10 rounded-xl border items-center px-4 gap-4 min-w-48 hidden">
                    {" "}
                    {/*flex changed to hidden */}
                    <FaGoogle className="text-[15px]" />
                    Sign up with google
                  </div>
                </div>
                <div className="w-full p-3 border rounded-md space-y-3">
                <h1 className="font-bold text-2xl">Demo</h1>
                  <h1>example email : silyjole@pelagius.net</h1>
                  <h1>example password : Koolath123</h1>
                </div>
                <div className=" justify-center mt-2 flex gap-2">
                  didn't created an account{" "}
                  <Link to={"/signup"} className="text-primary">
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-[600px] rounded-md overflow-hidden ">
            <img src={left} className="w-full h-full object-none" alt="" />
          </div>
        </div>
      </section>
    </main>
  );
}
