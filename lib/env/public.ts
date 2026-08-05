import { z } from "zod";

const emptyStringToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalHttpUrl = z.preprocess(
  emptyStringToUndefined,
  z
    .string()
    .trim()
    .url()
    .refine((value) => value.startsWith("http://") || value.startsWith("https://"), {
      message: "debe usar http:// o https://",
    })
    .optional(),
);

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z
    .string()
    .trim()
    .min(1, "es obligatoria")
    .regex(/^[a-z0-9-]+$/, "tiene un formato inválido"),
  NEXT_PUBLIC_SANITY_DATASET: z
    .string()
    .trim()
    .min(1, "es obligatoria")
    .regex(/^[a-z0-9_-]+$/, "tiene un formato inválido"),
  NEXT_PUBLIC_SANITY_API_VERSION: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "debe usar el formato YYYY-MM-DD")
    .default("2026-07-26"),
  NEXT_PUBLIC_SITE_URL: optionalHttpUrl,
});

const parsedPublicEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsedPublicEnv.success) {
  const issues = parsedPublicEnv.error.issues
    .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Variables públicas inválidas:\n${issues}`);
}

export const publicEnv = Object.freeze(parsedPublicEnv.data);
