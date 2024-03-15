import { Button } from "@/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { LabelField } from "../custom/LabelField";
import { MoveHorizontal } from "lucide-react";

const salaryRangeSchema = z
  .object({
    from: z.number().min(0, { message: "Salary must be positive" }).optional(),
    to: z.number().optional(),
  })
  .refine((data) => (data?.to && data?.from ? data.to >= data.from : true), {
    message: "Max salary must be greater than or equal to min salary",
    path: ["to"], // This indicates which field the error message is associated with
  });

const jobformSchema = z.object({
  salaryrange: salaryRangeSchema,
  qualification: z.array(z.string()),
  skills: z.array(z.string()),
  expiry: z.string(),
});

export function JobpostModalTwo() {
  const form = useForm<z.infer<typeof jobformSchema>>({
    resolver: zodResolver(jobformSchema),
    defaultValues: {
      qualification: [],
      skills: [],
      expiry: "",
    },
  });

  return (
    <div className="w-full min-h-56">
      <Form {...form}>
        <form className="w-full flex flex-col h-full gap-2">
          <div className="w-full min-h-32 flex flex-col gap-2 border p-2 rounded-md">
            <div className="w-full flex gap-2">
              <Input type="text" placeholder="add required skills" />
              <Button className="w-28 bg-backgroundAccent border-2  border-spacing-1" type="button">
                Add
              </Button>
            </div>
            <div className="w-full h-16 rounded-md p-3 border"></div>
          </div>
          <div className="w-full min-h-32 flex flex-col gap-2 border p-2 mt-2 rounded-md">
            <div className="w-full flex gap-2">
              <Input type="text" placeholder="add qualifications" />
              <Button className="w-28 bg-backgroundAccent border-2  border-spacing-1" type="button">
                Add
              </Button>
            </div>
            <div className="w-full h-16 rounded-md p-3 border"></div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <LabelField>Salary Range</LabelField>
            <div className="flex-col md:flex-row w-full flex justify-between items-center border p-2 rounded-md">
              <FormField
                control={form.control}
                name="salaryrange.from"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <LabelField>From</LabelField>
                    <FormControl>
                      <Input type="text" placeholder="Salary from" {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-20 h-10 mt-3  items-center hidden md:flex">
              <MoveHorizontal className="w-10" />
              </div>
              <FormField
                control={form.control}
                name="salaryrange.to"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <LabelField>To</LabelField>
                    <FormControl>
                      <Input type="text" placeholder="Salary to" {...field} />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full h-10 flex justify-end mt-3">
            <Button className="w-36">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
