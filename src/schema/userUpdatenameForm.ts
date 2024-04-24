import { z } from "zod";

export const userUpdateNameAndLocationForm = z.object({
  firstname: z.string().min(2).nonempty(),
  lastname: z.string().min(1).nonempty(),
  currengDesignation: z.string().min(2).max(100),
  location: z.string().max(100).min(2),
  stage: z.string(),
});
