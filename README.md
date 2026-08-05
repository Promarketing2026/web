# Promarketing Perú — sitio web

Sitio corporativo construido con Next.js 16, React 19, TypeScript, Tailwind
CSS v4, Sanity, HubSpot y Upstash Redis. Usa `pnpm` como gestor de paquetes.

## Desarrollo local

1. Copia `.env.local.example` como `.env.local`.
2. Completa las variables requeridas sin compartir ni versionar sus valores.
3. Ejecuta `pnpm dev`.

La aplicación valida las variables públicas y privadas al iniciar `dev` o
`build`. La matriz completa para Local, Preview y Production está en
[`docs/infrastructure/environment-variables.md`](docs/infrastructure/environment-variables.md).

## Verificación

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

`STATE.md` registra el estado real del proyecto y `TASKS.md` identifica la
única tarea que puede ejecutarse a continuación.
