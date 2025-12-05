import { z } from "zod";

const zodEnv = z.object({
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  // Make OAuth variables optional - only required if using Google sign-in
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

export const env = zodEnv.parse(process.env);
