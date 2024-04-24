import { z } from "zod";
const imageSchema = z.custom<FileList>();
export const addExperinceFormSchema = z.object({
  title: z.string().min(2,{message:"please add title"}),
  description: z.string().min(20,{message:"please add description"}),
  location: z.string().min(2,{message:"please add location"}),
  image: imageSchema
    .nullable()
    .refine((value) => value, { message: "please upload image" }),
});
