import { Redis } from "@upstash/redis";

import { serverEnv } from "@/lib/env/server";

const redis = new Redis({
  url: serverEnv.redisUrl,
  token: serverEnv.redisToken,
});

const WINDOW_SECONDS = 10 * 60; // ventana de 10 minutos
const MAX_REQUESTS_PER_WINDOW = 3; // máximo de envíos permitidos en esa ventana

export async function checkRateLimit(
  identifier: string,
  prefix: string = "auditoria",
): Promise<{ allowed: boolean }> {
  const key = `rate-limit:${serverEnv.deploymentEnvironment}:${prefix}:${identifier}`;

  try {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    return { allowed: count <= MAX_REQUESTS_PER_WINDOW };
  } catch (error) {
    console.error("Error al verificar el rate limit:", error);
    return { allowed: true };
  }
}
