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
import ButtonLoading from "../custom/ButtonLoading";
import { Button } from "@/shadcn/ui/button";
import { z } from "zod";

const dataSchema = z.object({
  websiteLink: z.string().min(4),
  LinkedInLink: z.string().min(4),
});
export function CompanyProfileCompletion() {
  const form = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      websiteLink: "",
      LinkedInLink: "",
    },
  });
  function submitProfile(value:z.infer<typeof dataSchema>){
    alert('d')
    value
  }
  const loading = false;
  return (
    <main className="w-full h-full  flex items-center justify-center absolute top-0 left-0">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[38%] min-h-96 border p-5 bg-backgroundAccent rounded-md">
        <Form {...form}>
          <form
            className="flex w-full flex-col  mt-5 gap-5"
            onSubmit={form.handleSubmit(submitProfile)}
          >
            <FormField
              control={form.control}
              name="websiteLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Your websiteLink</FormLabel>
                  <FormControl>
                    <Input placeholder="http://example.com" {...field} />
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
              name="LinkedInLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Your LinkedIn profile</FormLabel>
                  <FormControl>
                    <Input placeholder="http://example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display email.
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
                {!loading ? "Submit" : <ButtonLoading />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
