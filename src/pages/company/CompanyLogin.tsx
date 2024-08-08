import { loginUser } from "@/redux/actions/userActions";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@/shadcn/ui/button";
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please provide valid email" }),
  password: z.string().min(8),
});
function CompanyLogin() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function loginSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: { error: { message: string } } | any = await dispatch(
        loginUser({ ...values, role: "company" })
      );
      if (!res?.error) {
        navigate("/company/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error if needed
    }
  }

  const { loading } = useSelector((state: RootState) => state.userData);
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[28%] min-h-96  flex flex-col gap-y-10">
        <div className="w-full flex items-center justify-center flex-col gap-2">
          <h1 className="company_text text-4xl uppercase font-semibold">
            Welcome back
          </h1>
          <h3 className="company_text text-textPrimary">
            Enter company email and password to access your account
          </h3>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(loginSubmit)}
              className="w-full flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="company_text font-semibold">
                      Email
                    </FormLabel>
                    <FormControl className="h-12 rounded-lg border-none bg-backgroundAccent">
                      <Input
                        placeholder="Company official email"
                        type="email"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="company_text font-semibold">
                      password
                    </FormLabel>
                    <FormControl className="h-12 border-none bg-backgroundAccent">
                      <Input
                        placeholder="Enter you password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end text-textPrimary">
                <span>forgot password?</span>
              </div>
              <Button
                type="submit"
                className={`company_text text-lg w-full h-12 rounded-md ${
                  loading && "pointer-events-none bg-blue-300"
                }`}
              >
                {loading ? "Processing..." : "Sign In"}
              </Button>
              <div className="company_text w-full flex justify-center text-lg">
                <span>
                  Create An new Account {"   "}
                  <Link to={"/recruiter/signup"} className="text-primary">
                    Signup
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        <div>
          <p>example email: ceraxaxa@closetab.email</p>
          <p>Password : koolath123</p>
        </div>
        </div>
      </div>
    </main>
  );
}
export default CompanyLogin;
