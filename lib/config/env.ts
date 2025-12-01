// src/lib/env.ts
import { z } from "zod";

const zodEnv = z.object({
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
});

export const env = zodEnv.parse(process.env);
