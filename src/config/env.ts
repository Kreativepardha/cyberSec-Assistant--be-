import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string().url(),
  GEMINI_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
