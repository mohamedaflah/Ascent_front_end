
import { verifyForgotEmail } from "@/redux/actions/secondaryAction";
import {  AppDispatch, RootState } from "@/redux/store";
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
import {  useDispatch, useSelector } from "react-redux";

import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please provide valid email" }),
});
export function ForgotPassword() {

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const dispatch:AppDispatch=useDispatch()
  async function forgotPasswordSubmit(values: z.infer<typeof loginFormSchema>) {
   await dispatch(verifyForgotEmail({email:values.email,role:"user"}))
  }
  
  const { loading } = useSelector((state: RootState) => state.userData);
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[28%] min-h-96  flex flex-col gap-y-10">
        <div className="w-full flex items-center justify-center flex-col gap-2">
          <h1 className="company_text text-4xl uppercase font-semibold">
            Forgot password?
          </h1>
          <h3 className="company_text text-textPrimary">
            Enter you email address and will send you the link to reset password
          </h3>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(forgotPasswordSubmit)}
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
                        placeholder="Enter you email "
                        type="email"
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

