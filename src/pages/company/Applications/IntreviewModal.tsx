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
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/custom/Calendar";
const shortListFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(430),
  interviewDate: z.string(),
  interviewTime: z.string(),
});
type ShortListModalProps = object;
export const InterviewModal = forwardRef<
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
        <Button ref={ref}>interview</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <ModalHeader>applicant interview</ModalHeader>
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
                          Description of stage
                        </FormLabel>
                        <FormControl>
                          {/* <Input placeholder="Enter description" {...field} /> */}
                          <Textarea
                            placeholder="Enter description"
                            {...field}
                          ></Textarea>
                        </FormControl>
                        <FormDescription>
                          This is stage description
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="interviewDate"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel className="font-semibold">
                            Select candidate joining date
                          </FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !form.watch("interviewDate") &&
                                      "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {form.watch("interviewDate") ? (
                                    format(
                                      form.watch("interviewDate") as
                                        | string
                                        | number
                                        | Date,
                                      "PPP"
                                    )
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                align="start"
                                className=" w-auto p-0"
                              >
                                <Calendar
                                  mode="single"
                                  captionLayout="dropdown-buttons"
                                  selected={field.value as never}
                                  onSelect={(date: Date) =>
                                    form.setValue("interviewDate", String(date))
                                  }
                                  fromYear={1960}
                                  toYear={2030}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormDescription>interview date</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center   justify-end ">
                      <FormField
                        control={form.control}
                        name="interviewTime"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-semibold capitalize">
                              title
                            </FormLabel>
                            <FormControl className="w-full">
                              <Input
                                placeholder="selecte time"
                                type="time"
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This is the time of interview
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
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
