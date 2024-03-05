// import AscentIcon from "../../assets/lightico.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import AscentDarkIcon from "../../assets/darkIco.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";


const adminLogin = z.object({
  email: z.string().email({ message: " Please provide valid email " }),
  password: z.string(),
});
function AdminLogin() {
  const form = useForm<z.infer<typeof adminLogin>>({
    resolver: zodResolver(adminLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function submitAdmin(values: z.infer<typeof adminLogin>) {
    console.log(values);
    
  }
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <section className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[30%] min-h-96  flex flex-col gap-5  rounded-md p-5 dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="w-full flex justify-center items-center">
          <img src={AscentDarkIcon} className="w-36" alt="" />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl">Welcome back</h1>
          <h3>Enter your email and password to access your account</h3>
        </div>
        <div className="w-full flex flex-col gap-3 px-5">
          <Form {...{ ...form }}>
            <form
              action=""
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(submitAdmin)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Admin Email</FormLabel>
                    <FormControl className="h-12 bg-backgroundAccent">
                      <Input
                        placeholder="Enter you email"
                        {...field}
                        type="email"
                        className="rounded-sm "
                      />
                    </FormControl>
                    
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
                    <FormControl className="h-12 bg-backgroundAccent">
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        className="rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full h-auto mt-6">
                <Button className="w-full h-10 rounded-sm" type="submit">
                  Sign in{" "}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
export default AdminLogin;
