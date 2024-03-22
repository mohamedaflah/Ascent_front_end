import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const applicatnTableSchema = z.object({
  id: z.string(),
  jobtitle: z.string(),
  Applicantemail: z.string(),
  Appliedat: z.string(),
  Hiringstage: z.string(),
  Category: z.string(),
  Employment: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type Applicant = z.infer<typeof applicatnTableSchema>
