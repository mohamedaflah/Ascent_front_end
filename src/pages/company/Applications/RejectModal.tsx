import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";

import { forwardRef } from "react";
import { ModalHeader } from "./ModalHeader";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/shadcn/ui/textarea";
import { LoaderSubmitButton } from "@/components/custom/LoaderButton";
const shortListFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(430),
});
type ShortListModalProps = object;
export const RejectModal = forwardRef<
  HTMLButtonElement,
  ShortListModalProps
>((_, ref) => {
  const form = useForm<z.infer<typeof shortListFormSchema>>({
    resolver: zodResolver(shortListFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const handleSubmition = (values: z.infer<typeof shortListFormSchema>) => {
    values;
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button ref={ref}>Rejected</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <ModalHeader>Interview Rejected</ModalHeader>
          <AlertDialogDescription>
            <div className="w-full">
              <Form {...form}>
                <form
                  className="w-full flex flex-col gap-5"
                  onSubmit={form.handleSubmit(handleSubmition)}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold capitalize">
                          title
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter title" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the title of stage.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          reson of rejection
                        </FormLabel>
                        <FormControl>
                          {/* <Input placeholder="Enter description" {...field} /> */}
                          <Textarea
                            placeholder="describe the reason of rejection"
                            {...field}
                          ></Textarea>
                        </FormControl>
                        <FormDescription>
                          This is your public linked in profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <LoaderSubmitButton loading={false}>
                      Submit
                    </LoaderSubmitButton>
                  </div>
                </form>
              </Form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
