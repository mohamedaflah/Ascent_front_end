/* eslint-disable no-empty-pattern */
import { z } from "zod";
import { Progress } from "@/shadcn/ui/progress";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Company } from "@/types/oneCompanyType";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";

import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/shadcn/ui/calendar";
import { useRef, useState } from "react";
import { Input } from "@/shadcn/ui/input";
import { techIndustries } from "@/constants/industries";
import { TechBox } from "../custom/TechBox";
import { RiArrowRightFill } from "react-icons/ri";
import { updateProfileTwoPercent } from "@/redux/actions/secondaryAction";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  industry: z.string().min(2),
  foundedDate: z.string(),
  registrationId: z.string().min(2),
  techStack: z.array(z.string()),
  locations: z.array(z.string()),
  
});
export function TwoPercentageCompletion() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user }: { user: Company } = useSelector(
    (state: RootState) => state.userData
  );
  const [stack, techStackValue] = useState<string>("");
  const [locationVal, setLocation] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      foundedDate: "",
      registrationId: "",
      techStack: [],
      locations: [],
      // certificate: null,
    },
  });
  const handleTechStackArrayChange = () => {
    if (stack) {
      const techStack = form.watch("techStack");
      const newtechStack = [...techStack, stack];
      form.setValue("techStack", newtechStack);
      techStackValue("");
    }
  };
  const locationArrayChange = () => {
    if (locationVal) {
      const techStack = form.watch("locations");
      const newtechStack = [...techStack, locationVal];
      form.setValue("locations", newtechStack);
      setLocation("");
    }
  };
  function techStackDelete(index: number) {
    const newtechStack = [...form.getValues("techStack")];
    newtechStack.splice(index, 1); // Remove the element at the specified index
    form.setValue("techStack", newtechStack);
  }
  function locationDelete(index: number) {
    const newtechStack = [...form.getValues("locations")];
    newtechStack.splice(index, 1); // Remove the element at the specified index
    form.setValue("locations", newtechStack);
  }
  const dispatch: AppDispatch = useDispatch();
  async function submitForm(values: z.infer<typeof formSchema>) {
    console.log(values);

    await dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateProfileTwoPercent({
        sendData: { ...values } as Company | any,
        id: user._id as string,
      })
    );
  }

  return (
    <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[42%] min-h-96 border p-1 bg-backgroundAccent rounded-md flex flex-col">
      <div className="w-full">
        <Progress
          value={
            33.33 * Number(user?.profileCompletionStatus?.split("")[0]) - 1
          }
          className="rounded-sm h-2"
        />
      </div>
      <div className="p-2 ">
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-3"
            onSubmit={form.handleSubmit(submitForm)}
          >
            <div className="flex flex-col lg:grid md:grid-cols-3 md:gap-3">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Choose an Industry
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[220px]">
                          <SelectValue placeholder="Select a Industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {techIndustries.map((value) => {
                          return (
                            <SelectItem value={value} key={value}>
                              {value}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>This is your industry</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="foundedDate"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="font-semibold">
                      Select company founded date
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[220px] justify-start text-left font-normal",
                              !form.watch("foundedDate") &&
                                "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.watch("foundedDate") ? (
                              format(form.watch("foundedDate"), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className=" w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={(date: Date) =>
                              form.setValue("foundedDate", String(date))
                            }
                            fromYear={1960}
                            toYear={2030}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription>company founded date</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Enter you registration id
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="#92034" {...field} />
                    </FormControl>

                    <FormDescription>
                      This is your registration id
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="techStack"
              render={({}) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Add tech stack your are using
                  </FormLabel>
                  <FormControl className="transition-all duration-300">
                    <div className="flex flex-col gap-3">
                      <div className="w-full h-10  flex gap-3">
                        <Input
                          type="text"
                          className=" border-none focus-visible:ring-0 outline-none"
                          ref={inputRef}
                          placeholder="Eneter tech stack "
                          value={stack}
                          onChange={(e) => techStackValue(e.target.value)}
                        />
                        <Button
                          className="w-28"
                          type="button"
                          variant={"outline"}
                          onClick={handleTechStackArrayChange}
                        >
                          Add
                        </Button>
                      </div>
                      <div
                        className="w-full  min-h-20 bg-background rounded-md p-1 flex flex-wrap gap-2"
                        onClick={() => inputRef.current?.focus()}
                      >
                        {form.watch("techStack").map((value, inde) => (
                          <TechBox
                            value={value}
                            key={inde}
                            index={inde}
                            from="techstack"
                            techStackDelete={techStackDelete}
                          />
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your company using tech stack.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locations"
              render={({}) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Add location of you companies
                  </FormLabel>
                  <FormControl className="transition-all duration-300">
                    <div className="flex flex-col gap-3">
                      <div className="w-full h-10  flex gap-3">
                        <Input
                          type="text"
                          className=" border-none focus-visible:ring-0 outline-none"
                          ref={inputRef}
                          placeholder="Eneter tech stack "
                          value={locationVal}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <Button
                          className="w-28"
                          type="button"
                          variant={"outline"}
                          onClick={locationArrayChange}
                        >
                          Add
                        </Button>
                      </div>
                      <div
                        className="w-full  min-h-20 bg-background rounded-md p-1 flex flex-wrap gap-2"
                        onClick={() => inputRef.current?.focus()}
                      >
                        {form.watch("locations").map((value, inde) => (
                          <TechBox
                            value={value}
                            key={inde}
                            index={inde}
                            from="location"
                            techStackDelete={locationDelete}
                          />
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your company locations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-10 w-full flex justify-end">
              <Button className="w-28 flex gap-3" type="submit">
                Next
                <RiArrowRightFill />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
