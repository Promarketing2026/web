import { z } from "zod";

import { deploymentEnvironment } from "./deployment";

const emptyStringToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalSecret = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().min(1).optional(),
);

const optionalHttpsUrl = z.preprocess(
  emptyStringToUndefined,
  z
    .string()
    .trim()
    .url()
    .refine((value) => value.startsWith("https://"), {
      message: "debe usar https://",
    })
    .optional(),
);

const serverEnvSchema = z
  .object({
    HUBSPOT_SERVICE_KEY: z.string().trim().min(1, "es obligatoria"),
    KV_REST_API_URL: optionalHttpsUrl,
    KV_REST_API_TOKEN: optionalSecret,
    UPSTASH_REDIS_REST_URL: optionalHttpsUrl,
    UPSTASH_REDIS_REST_TOKEN: optionalSecret,
    RESEND_API_KEY: optionalSecret,
  })
  .superRefine((env, context) => {
    const kvComplete = Boolean(env.KV_REST_API_URL && env.KV_REST_API_TOKEN);
    const upstashComplete = Boolean(
      env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN,
    );

    if (Boolean(env.KV_REST_API_URL) !== Boolean(env.KV_REST_API_TOKEN)) {
      context.addIssue({
        code: "custom",
        message: "KV_REST_API_URL y KV_REST_API_TOKEN deben configurarse juntas",
        path: ["KV_REST_API_URL"],
      });
    }

    if (
      Boolean(env.UPSTASH_REDIS_REST_URL) !==
      Boolean(env.UPSTASH_REDIS_REST_TOKEN)
    ) {
      context.addIssue({
        code: "custom",
        message:
          "UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN deben configurarse juntas",
        path: ["UPSTASH_REDIS_REST_URL"],
      });
    }

    if (!kvComplete && !upstashComplete) {
      context.addIssue({
        code: "custom",
        message: "se requiere un par completo de credenciales Redis",
        path: ["KV_REST_API_URL"],
      });
    }
  });

const parsedServerEnv = serverEnvSchema.safeParse({
  HUBSPOT_SERVICE_KEY: process.env.HUBSPOT_SERVICE_KEY,
  KV_REST_API_URL: process.env.KV_REST_API_URL,
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
});

if (!parsedServerEnv.success) {
  const issues = parsedServerEnv.error.issues
    .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Variables privadas inválidas:\n${issues}`);
}

const parsed = parsedServerEnv.data;

export const serverEnv = Object.freeze({
  hubspotServiceKey: parsed.HUBSPOT_SERVICE_KEY,
  redisUrl: parsed.KV_REST_API_URL ?? parsed.UPSTASH_REDIS_REST_URL!,
  redisToken: parsed.KV_REST_API_TOKEN ?? parsed.UPSTASH_REDIS_REST_TOKEN!,
  resendApiKey: parsed.RESEND_API_KEY,
  deploymentEnvironment,
});
