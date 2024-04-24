import { z } from "zod";

const imageSchema = z.custom<FileList>();
export const userUpdateBannerFormSchema = z.object({
  icon: imageSchema.nullable().refine(value=>value,{message:"icon is not null"}),
  coverImage: imageSchema.nullable(),
});
