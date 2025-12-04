import { z } from "zod";

const zodEnv = z.object({
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string()
});

export const env = zodEnv.parse(process.env);
