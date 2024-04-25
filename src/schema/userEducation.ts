import { z } from "zod";
const imageSchema = z.custom<FileList>();
const dateRangeSchema = z
  .object({
    from: z.string().nonempty().min(1),
    to: z.string().nonempty().min(1),
  })
  .refine(
    (data) =>
      data?.to && data?.from ? new Date(data.to) >= new Date(data.from) : true,
    {
      message: "End date must be greater than or equal to start date",
      path: ["to"], // This indicates which field the error message is associated with
    }
  );

export const userUpdateAndAddEducationSchmea = z.object({
  university: z.string().min(2, { message: "please add university name" }),
  course: z.string().min(2, { message: "please add course" }),
  description: z.string().min(20, { message: "please add description" }),
  image: imageSchema
    .nullable()
    .refine((value) => value, { message: "please upload image" }),
  year: dateRangeSchema,
});
