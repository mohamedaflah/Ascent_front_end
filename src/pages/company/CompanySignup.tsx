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
import { Link } from "react-router-dom";
import { z } from "zod";

const signupFormSchema = z.object({
  name: z.string().max(50).min(2),
  email: z.string().email({ message: "Please provide valid email" }),
  password: z.string().min(8),
});
function CompanySignup() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver:zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function signupSubmit(values: z.infer<typeof signupFormSchema>) {
    alert(" * * ");
    values;
  }
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[28%] min-h-96  flex flex-col gap-y-10">
        <div className="w-full flex items-center justify-center flex-col gap-2">
          <h1 className="company_text text-4xl uppercase font-semibold">
            Create An Account
          </h1>
          <h3 className="company_text text-textPrimary">
            Enter company email and password to access your account
          </h3>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(signupSubmit)}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="company_text font-semibold">
                      Name
                    </FormLabel>
                    <FormControl className="h-12 border-none bg-backgroundAccent">
                      <Input
                        placeholder="Enter you company name"
                        type="text"
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
                        placeholder="Enter you company name"
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
                className="company_text text-lg w-full h-12 rounded-md"
              >
                Create An Account
              </Button>
              <div className="company_text w-full flex justify-center text-lg">
                <span>
                  You have already Account{"   "}
                  <Link to={"/companies/login"}  className="text-primary">
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
export default CompanySignup;
