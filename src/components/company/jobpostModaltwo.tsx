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
import { MoveHorizontal, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { decodeJWT } from "@/util/decodeToken";
import { JobfirstSchema } from "@/types/types.jobReducer";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "@/redux/actions/jobActions";
import { LoaderSubmitButton } from "../custom/LoaderButton";

const salaryRangeSchema = z
  .object({
    from: z.number().min(0, { message: "Salary must be positive" }),
    to: z.number(),
  })
  .refine((data) => (data?.to && data?.from ? data.to >= data.from : true), {
    message: "Max salary must be greater than or equal to min salary",
    path: ["to"], // This indicates which field the error message is associated with
  });

const jobformSchema = z.object({
  salaryrange: salaryRangeSchema,
  qualification: z.array(z.string()),
  skills: z.array(z.string()),
});

interface ChildProp {
  closeModal: () => void;
}
export function JobpostModalTwo({ closeModal }: ChildProp) {
  const form = useForm<z.infer<typeof jobformSchema>>({
    resolver: zodResolver(jobformSchema),
    defaultValues: {
      qualification: [],
      skills: [],
    },
  });
  const [arrayValues, setArrayValues] = useState<{
    skills: string;
    qualification: string;
  }>({ skills: "", qualification: "" });
  const handleQualiandSkillInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setArrayValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const [skillErr, setSkillErr] = useState<boolean>(false);
  const [qualificationErr, setQualificationErr] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userData);
  const handleSubmition = (values: z.infer<typeof jobformSchema>) => {
    if (values.skills.length <= 0) {
      setSkillErr(true);
      return;
    }
    if (values.qualification.length <= 0) {
      setQualificationErr(true);
      return;
    }

    console.log(values);
    if (!localStorage.getItem("jobpost")) {
      return toast.error("Something went wrong");
    }
    const payload = decodeJWT(localStorage.getItem("jobpost") as string)
      .payload as unknown as JobfirstSchema;
    dispatch(addJob({ ...payload, ...values, companyId: user._id })).then(
      (res) => {
        if (res.type.endsWith("fulfilled")) {
          localStorage.removeItem("jobpost");
          toast.success("job posted succesfully");
          closeModal();
        }
      }
    );
  };
  useEffect(() => {
    if (form.watch("skills").length >= 1) {
      setSkillErr(false);
    }
    if (form.watch("qualification").length >= 1) {
      setQualificationErr(false);
    }
  }, [form.watch("skills"), form.watch("qualification")]);

  const handleSettingArrayValue = (
    value: string,
    type: "skills" | "qualification"
  ) => {
    if (!value) {
      toast.error("Please fill field");
      return;
    }
    setArrayValues((prev) => ({ ...prev, [type]: "" }));
    const values = form.watch(type);
    const newValues = [...values, value];
    form.setValue(type, newValues);
  };
  const hanldeArrayValueDelete = (
    Idx: number,
    type: "skills" | "qualification"
  ) => {
    const values = form.watch(type);
    values.splice(Idx, 1);
    form.setValue(type, values);
  };
  const { loading } = useSelector((state: RootState) => state.job);
  return (
    <div className="w-full min-h-56">
      <Form {...form}>
        <form
          className="w-full flex flex-col h-full gap-2"
          onSubmit={form.handleSubmit(handleSubmition)}
        >
          <div className="w-full min-h-32 flex flex-col gap-2 border p-2 rounded-md">
            <div className="w-full flex gap-2">
              <Input
                type="text"
                placeholder="add required skills"
                name="skills"
                value={arrayValues.skills}
                onChange={handleQualiandSkillInputChange}
              />
              <Button
                className="w-28 dark:bg-backgroundAccent border-2  border-spacing-1"
                type="button"
                onClick={() =>
                  handleSettingArrayValue(arrayValues?.skills, "skills")
                }
              >
                Add
              </Button>
            </div>
            <div className="w-full min-h-16 rounded-md p-3 border flex flex-wrap gap-2">
              {form.watch("skills").map((value, Idx) => {
                return (
                  <div
                    className="h-10 min-w-28 bg-backgroundAccent p-2 flex justify-between items-center border rounded-md"
                    key={Idx}
                  >
                    {value}{" "}
                    <X
                      className="w-5 cursor-pointer"
                      onClick={() => hanldeArrayValueDelete(Idx, "skills")}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {skillErr && (
            <FormDescription className="text-red-500">
              Please atleast one skills
            </FormDescription>
          )}
          <div className="w-full min-h-32 flex flex-col gap-2 border p-2 mt-2 rounded-md">
            <div className="w-full flex gap-2">
              <Input
                type="text"
                placeholder="add qualifications"
                name="qualification"
                value={arrayValues.qualification}
                onChange={handleQualiandSkillInputChange}
              />
              <Button
                className="w-28 dark:bg-backgroundAccent border-2  border-spacing-1"
                type="button"
                onClick={() =>
                  handleSettingArrayValue(
                    arrayValues.qualification,
                    "qualification"
                  )
                }
              >
                Add
              </Button>
            </div>
            <div className="w-full min-h-16 rounded-md p-3 border flex flex-wrap gap-2">
              {form.watch("qualification").map((value, Idx) => {
                return (
                  <div
                    className="h-10 min-w-28 bg-backgroundAccent p-2 flex justify-between items-center border rounded-md"
                    key={Idx}
                  >
                    {value}{" "}
                    <X
                      className="w-5 cursor-pointer"
                      onClick={() =>
                        hanldeArrayValueDelete(Idx, "qualification")
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {qualificationErr && (
            <FormDescription className="text-red-500">
              Please atleast Qualification skills
            </FormDescription>
          )}
          <div className="w-full flex flex-col gap-5">
            <LabelField>Salary Range</LabelField>
            <div className="flex-col md:flex-row w-full flex justify-between items-center border p-2 rounded-md">
              <FormField
                control={form.control}
                name="salaryrange.from"
                render={() => (
                  <FormItem className="w-full">
                    <LabelField>From</LabelField>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Salary from"
                        onChange={(e) =>
                          form.setValue(
                            "salaryrange.from",
                            Number(e.target.value)
                          )
                        }
                      />
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
                render={() => (
                  <FormItem className="w-full">
                    <LabelField>To</LabelField>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Salary to"
                        onChange={(e) =>
                          form.setValue(
                            "salaryrange.to",
                            Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>

                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full h-10 flex justify-end mt-3">
            <LoaderSubmitButton loading={loading} className="min-w-36">
              Submit
            </LoaderSubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
