import { z } from "zod";

export const userUpdateAboutUpdateForm = z.object({
  about: z.string().min(10),
});
