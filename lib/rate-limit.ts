import { Redis } from "@upstash/redis";

const redisUrl =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

const WINDOW_SECONDS = 10 * 60; // ventana de 10 minutos
const MAX_REQUESTS_PER_WINDOW = 3; // máximo de envíos permitidos en esa ventana

export async function checkRateLimit(
  identifier: string,
): Promise<{ allowed: boolean }> {
  if (!redis) {
    console.warn(
      "Rate limiting no configurado (faltan variables de Redis) — dejando pasar el envío.",
    );
    return { allowed: true };
  }

  const key = `rate-limit:auditoria:${identifier}`;

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