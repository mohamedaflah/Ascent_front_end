import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email({ message: " Please provide valid email " }),
    password: z.string().nonempty(),
  });
  