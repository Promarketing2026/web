"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStoredUtmParams } from "@/lib/utm";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
type UtmParams = Partial<Record<UtmKey, string>>;

const MEETINGS_URL = "https://meetings.hubspot.com/promarketing-2026";

export function ThankYouRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  const service = searchParams.get("servicio");

  const utmParams = useMemo(() => {
    const fromUrl = UTM_KEYS.reduce<UtmParams>((acc, key) => {
      const value = searchParams.get(key);

      if (value) {
        acc[key] = value;
      }

      return acc;
    }, {});

    if (Object.keys(fromUrl).length > 0) {
      return fromUrl;
    }

    return getStoredUtmParams();
  }, [searchParams]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCountdown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/");
    }
  }, [countdown, router]);

  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-8 text-card-foreground sm:p-10">
        <p className="text-sm font-semibold tracking-normal text-muted-foreground uppercase">
          Solicitud recibida
        </p>
        <h1 className="mt-4 text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
          Gracias por contactarnos.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Hemos recibido tu solicitud
          {service ? ` sobre ${service}` : ""}. Te redirigiremos al inicio en{" "}
          <span className="font-semibold text-foreground">{countdown}</span>{" "}
          segundos.
        </p>

        <a
          href={MEETINGS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
        >
          Agendar una reunión ahora
        </a>

        {Object.keys(utmParams).length > 0 ? (
          <dl className="mt-8 grid gap-3 rounded-lg border border-border bg-muted p-4 text-sm sm:grid-cols-2">
            {Object.entries(utmParams).map(([key, value]) => (
              <div key={key}>
                <dt className="font-medium text-foreground">{key}</dt>
                <dd className="mt-1 text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}