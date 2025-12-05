import { z } from "zod";

console.log('[ENV] Validating environment variables...');
console.log('[ENV] DATABASE_URL present:', !!process.env.DATABASE_URL);
console.log('[ENV] AUTH_SECRET present:', !!process.env.AUTH_SECRET);
console.log('[ENV] GOOGLE_CLIENT_ID present:', !!process.env.GOOGLE_CLIENT_ID);
console.log('[ENV] GOOGLE_CLIENT_SECRET present:', !!process.env.GOOGLE_CLIENT_SECRET);

const zodEnv = z.object({
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  // Make OAuth variables optional - only required if using Google sign-in
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

let env: z.infer<typeof zodEnv>;

try {
  env = zodEnv.parse(process.env);
  console.log('[ENV] Environment validation successful');
} catch (error) {
  console.error('[ENV] Environment validation FAILED:', error);
  throw error;
}

export { env };
