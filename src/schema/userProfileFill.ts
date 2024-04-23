import { z } from "zod";
// const MAX_FILE_SIZE = 5 * 1024 * 1024; // Example: 5MB max size
// const ACCEPTED_FILE_TYPE = "application/pdf";
// const fileSchema = z
//   .instanceof(File)
//   .refine((file) => file.size <= MAX_FILE_SIZE, {
//     message: "File size should be 5MB or less",
//   })
//   .refine((file) => file.type === ACCEPTED_FILE_TYPE, {
//     message: "Only PDF files are allowed",
//   });

const imageSchema = z.custom<FileList>();

export const userProfileFill = z.object({
  dateofbirth: z.string().nonempty(),
  personalsite: z.string().optional().refine(value => !value || value.includes("http"), {
    message: "Personal site should include 'http' or 'https'",
  }),
  about: z.string().min(10),
  icon: imageSchema.nullable(),
  coverImage: imageSchema.nullable(),
  location: z.string().nonempty(),
  currengDesignation: z.string().nonempty(),
  skills: z.array(z.string()),
});
