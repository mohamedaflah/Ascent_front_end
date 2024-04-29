import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // Example: 5MB max size
const ACCEPTED_FILE_TYPE = "application/pdf";
const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "File size should be 5MB or less",
  })
  .refine((file) => file.type === ACCEPTED_FILE_TYPE, {
    message: "Only PDF files are allowed",
  });

export const userProfileAddCertificate = z.object({
  certificate: fileSchema.nullable().refine(file=>file,{message:"Upload certificate pdf"}),
  title:z.string().min(2)
});
