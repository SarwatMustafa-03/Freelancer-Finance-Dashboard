const z = require("zod");

//register validation
const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can contain only alphabets"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});
//login validation

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

module.exports={ registerSchema,loginSchema}