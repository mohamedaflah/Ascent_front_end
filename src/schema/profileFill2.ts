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

// const imageSchema = z.custom<FileList>();

// public readonly education?: {
//     image: string;
//     university: string; // corrected spelling
//     course: string;
//     year: { from: Date; to: Date };
//     description: string;
//   }[],
export const userProfileFillSecond = z.object({
  resumes: z.array(fileSchema.nullable()),
  sociallinks: z.array(z.string()).refine(data=>data.length>=0,{message:"Please add atleast one social link"}),
  stage: z.string(),
  // education: z.array(
  //   z.object({
  //     image: z.string(),
  //     university: z.string(),
  //     course: z.string(),
  //     year: z.object({
  //       from: z.date(),
  //       to: z.date(),
  //     }),
  //     description: z.string(),
  //   })
  // ),
  // experiences: z.array(
  //   z.object({
  //     title: z.string(),
  //     description: z.string(),
  //     image: z.string(),
  //   })
  // ),
});
