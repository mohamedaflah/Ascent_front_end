import { passwordUpdation } from "@/redux/actions/secondaryAction";
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
import { useNavigate } from "react-router-dom";

import { z } from "zod";

const loginFormSchema = z
  .object({
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
export function SetPassword() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      password: "",
      confirmpass: "",
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const getQueryParam = (name:string) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
  };
  async function loginSubmit(values: z.infer<typeof loginFormSchema>) {
    const res = await dispatch(passwordUpdation({ newPass: values.password }));
    console.log("🚀 ~ loginSubmit ~ res:", res)
    const result = res
    if (result.type.endsWith("fulfilled")) {
      if (
        getQueryParam("role") === "admin" ||
        getQueryParam("role") === "user"
      ) {
        navigate("/");
      } else {
        navigate("/recruiter/login");
      }
    }
  }

  const { loading } = useSelector((state: RootState) => state.userData);
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[28%] min-h-96  flex flex-col gap-y-10">
        <div className="w-full flex items-center justify-center flex-col gap-2">
          <h1 className="company_text text-4xl uppercase font-semibold">
            Reset Your password
          </h1>
          <h3 className="company_text text-textPrimary">
            Enter your new and secure password don't share password anyone
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="company_text font-semibold">
                      New password
                    </FormLabel>
                    <FormControl className="h-12 rounded-lg border-none bg-backgroundAccent">
                      <Input
                        placeholder="Enter you email "
                        type="password"
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
                name="confirmpass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="company_text font-semibold">
                      Confirm password
                    </FormLabel>
                    <FormControl className="h-12 rounded-lg border-none bg-backgroundAccent">
                      <Input
                        placeholder="Enter you email "
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={`company_text text-lg w-full h-12 rounded-md ${
                  loading && "pointer-events-none bg-blue-300"
                }`}
              >
                {loading ? "Processing..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
