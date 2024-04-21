import { z } from "zod";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const signupFormSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "firstname must be atleast 2 letters" })
      .max(30, { message: "firstname mustbe lessthatn 30 " }),
    lastname: z
      .string()
      .min(2, { message: "lastname must be atleast 2 letters" })
      .max(30, { message: "lastname mustbe lessthatn 30 " }),
    email: z.string().email({ message: " Please provide valid email " }),
    password: z.string().min(8, {
      message:
        "Password contain minimum 8 charecters one letters and one digit",
    }),
    confirmpass: z.string(),
    mobile: z.string().min(10).max(10).regex(phoneRegex, "Invalid Number!"),
    // terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmpass, {
    message: "Password and confirm password must be match",
    path: ["confirmpass"],
  });
