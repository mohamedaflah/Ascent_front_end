import fireIcon from "@/assets/Ascent_firicon.svg";
import { LabelField } from "@/components/custom/LabelField";
import { signupFormSchema } from "@/schema/SignupForm";
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
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";
import { Checkbox } from "@nextui-org/react";
import { NewLoadingButton } from "@/components/custom/NewLoadingBtn";
import left from "@/assets/Left.png";
import { Link, useNavigate } from "react-router-dom";
import { Eye, MoveRight } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/redux/actions/userActions";
signupFormSchema;
export function SignupPage() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      mobile: "",
    },
  });
  const confirmPassref = useRef<HTMLDivElement>(null);

  const pass1Ref = useRef<HTMLInputElement>(null);
  //   const pass2Ref=useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.userData);
  async function signupSubmit(values: z.infer<typeof signupFormSchema>) {
    if (localStorage.getItem("signupToken")) {
      localStorage.removeItem("signupToken");
    }
    const res = await dispatch(signupUser({ ...values, type: "otp" }));
    if (res.type.endsWith("fulfilled")) {
      navigate("/verify-otp");
    }
  }
  return (
    <main className="w-full pb-5">
      <section className="w-[85%] mx-auto h-full grid grid-cols-1 md:grid-cols-2 mt-3 gap-20" style={{width:"85%"}}>
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
              <div className="w-full mt-3 maintext space-y-3">
                <h1 className=" text-2xl font-semibold capitalize">
                  Get Started now
                </h1>
                <p>
                  Searching job and get placement Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Natus, eos?
                </p>
                <div className="w-full h-10 flex gap-5 justify-between">
                  <div className=" h-10 rounded-3xl border flex items-center px-4 gap-4 min-w-48">
                    <FaGoogle className="text-[15px]" />
                    Sign up with google
                  </div>

                  <Link
                    to={"/recruiter/signup"}
                    className="flex gap-1 h-10 items-center px-4 bg-primary/85 text-white rounded-lg border"
                  >
                    join as recruiter <MoveRight />
                  </Link>
                </div>
                <div className="w-full mt-2  items-center h-10 grid grid-cols-11 ">
                  <div className="h-[1px] bg-border col-span-5"></div>
                  <div className="col-span-1 flex justify-center"> Or</div>
                  <div className="h-[1px] bg-border col-span-5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <Form {...form}>
              <form
                className="w-full "
                onSubmit={form.handleSubmit(signupSubmit)}
              >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 ">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <LabelField>Firstname</LabelField>
                        <FormControl className="rounded-sm ">
                          <Input
                            placeholder="firstname.."
                            className=" bg-transparent"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="flex justify-start "></FormDescription>
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
                        <FormDescription className="flex justify-start "></FormDescription>
                        <FormMessage className="flex justify-start " />
                      </FormItem>
                    )}
                  />
                </div>
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
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 ">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <LabelField>Password</LabelField>
                        <FormControl className="relative">
                          <div className="relative">
                            <Input
                              placeholder="* * *"
                              type="password"
                              className="pr-8"
                              {...field}
                              ref={pass1Ref}
                            />
                            <Eye
                              className="absolute right-3 w-4 top-2 cursor-pointer z-20"
                              onClick={() => {
                                const attr =
                                  pass1Ref.current?.getAttribute("type");
                                pass1Ref.current?.setAttribute(
                                  "type",
                                  `${attr == "text" ? "password" : "text"}`
                                );
                              }}
                            />
                          </div>
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
                      <FormItem className="">
                        <LabelField>Confirm password</LabelField>
                        <FormControl className="">
                          <div className="relative">
                            <Input
                              placeholder="* * *"
                              type="password"
                              className="pr-8"
                              {...field}
                            />
             
                          </div>
                        </FormControl>
                        <FormDescription ref={confirmPassref}></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <LabelField>phone number</LabelField>
                        <FormControl>
                          <Input placeholder="1234567891" {...field} />
                        </FormControl>
                        <FormDescription className="flex justify-start "></FormDescription>
                        <FormMessage className="flex justify-start " />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-2 flex gap-2 items-center">
                  <Checkbox />
                  <label htmlFor="">agree terms and conditions</label>
                </div>
                <div className="w-full h-12 flex items-center mt-10">
                  <NewLoadingButton
                    loading={loading}
                    className="h-12 dark:bg-primary/85 border-primary border-2"
                  >
                    Sign up
                  </NewLoadingButton>
                </div>
                <div className=" justify-end mt-2 flex gap-2">
                  Already have an account{" "}
                  <Link to={"/login"} className="text-primary">
                    Sign in
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
