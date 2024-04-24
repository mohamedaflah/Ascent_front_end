import { z } from "zod";

export const updateSkillSchema = z.object({
    skills: z.array(z.string()),
  });
  