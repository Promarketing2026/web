# Límites operativos de los planes gratuitos

Verificado: 2026-08-05  
Alcance: Sanity Free, HubSpot Free Tools y Vercel Hobby usados por este proyecto.

## Resultado ejecutivo

| Control | Estado | Conclusión |
| --- | --- | --- |
| Sanity Free | PASS documental | Límites y consecuencias verificados; el consumo privado actual no fue leído. |
| HubSpot Free Tools | PASS documental | El límite relevante es 1.000 contactos; el consumo privado actual no fue leído. |
| Vercel Hobby: capacidad | NOT VERIFIED | No es posible aprobar capacidad sin consultar Usage ni contar con una previsión de tráfico. |
| Vercel Hobby: elegibilidad | **FAIL — HIGH** | Hobby permite únicamente uso personal y no comercial; Promarketing promociona servicios comerciales. |
| Evidencia de consumo actual | NOT VERIFIED | Esta tarea verificó límites oficiales, no leyó los paneles privados de consumo. |

El riesgo de Vercel no se resuelve optimizando tráfico. Antes de aprobar la
producción comercial se debe elegir entre Vercel Pro o un hosting cuya licencia
gratuita permita uso comercial.

## Sanity Free

### Cuotas vigentes

| Recurso | Límite Free |
| --- | ---: |
| Datasets | 2 |
| Documentos, incluidos borradores | 10.000 |
| Atributos únicos por dataset | 2.000 |
| Webhooks basados en GROQ | 2 |
| Solicitudes API CDN por mes | 1.000.000 |
| Solicitudes API por mes | 250.000 |
| Assets almacenados | 100 GB |
| Ancho de banda por mes | 100 GB |
| Conexiones Live por dataset | 1.000 |
| Asientos incluidos | 20 |

En Free no existen sobrecostos automáticos: las cuotas son topes duros. Sanity
envía avisos al 80 % y bloquea el acceso público de API/CDN al 100 %; Studio
permanece disponible. API, API CDN y ancho de banda se reinician el primer día
del siguiente mes calendario. Documentos y assets no se reinician.

### Impacto en este proyecto

- `sanity/lib/client.ts` usa `useCdn: true`, por lo que las lecturas públicas
  aprovechan la cuota API CDN.
- Blog, artículo, glosario, casos y sitemap consultan Sanity durante la
  generación estática. El consumo depende principalmente de builds y de la
  entrega de imágenes, no de una consulta de contenido a Sanity por cada
  visitante.
- El riesgo actual es bajo, pero alcanzar el 100 % de API CDN o bandwidth haría
  que el contenido de Sanity deje de cargar públicamente.

### Monitoreo

- Revisar mensualmente `manage.sanity.io` → proyecto → Usage.
- Umbral interno de advertencia: 70 %.
- Umbral interno crítico: 85 %.
- Alerta oficial de Sanity: 80 %; bloqueo: 100 %.
- Revisar documentos y assets al publicar lotes grandes de contenido.

Fuentes oficiales:

- [Sanity Pricing](https://www.sanity.io/pricing?lang=en)
- [Sanity Plans and payments](https://www.sanity.io/docs/platform-management/plans-and-payments)

## HubSpot Free Tools

### Límites relevantes

| Recurso | Límite Free |
| --- | ---: |
| Usuarios gratuitos | 2 |
| Contactos almacenados | 1.000 |
| Registros de cada otro objeto estándar | 1.000.000 |
| API de app privada, por aplicación | 100 solicitudes cada 10 segundos |
| API de app privada, por cuenta | 250.000 solicitudes por día |

Los límites de API se aplican a integraciones privadas. Al excederlos, HubSpot
responde `429`; el límite diario se comparte entre las aplicaciones privadas de
la cuenta.

### Impacto en este proyecto

- Un contacto nuevo consume una solicitud `POST`.
- Un correo ya existente consume un `POST` que devuelve `409` y un `PATCH` para
  actualizarlo: dos solicitudes.
- El formulario admite como máximo tres intentos por IP cada diez minutos antes
  de contactar HubSpot. Esta protección no sustituye el control de la cuota
  total, pero mantiene el consumo normal muy lejos de 100 solicitudes/10 s.
- El límite operativo que probablemente se alcanzaría primero es el de 1.000
  contactos, no el límite diario de API.

### Monitoreo

- Contactos: advertencia interna en 700 y estado crítico en 850.
- API: HubSpot → Development → Monitoring → API call usage; para apps legacy,
  revisar la pestaña Logs de la aplicación privada.
- Registrar y alertar respuestas `429` sin almacenar datos personales.
- Revisar el conteo después de importaciones o campañas, no solo por los envíos
  del formulario web.

Fuentes oficiales:

- [HubSpot Product & Services Catalog](https://legal.hubspot.com/hubspot-product-and-services-catalog)
- [HubSpot API usage guidelines and limits](https://developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines)

## Vercel Hobby

### Elegibilidad del plan

**Estado: FAIL — HIGH.** Vercel establece que Hobby es exclusivamente para uso
personal no comercial. Su guía define como comercial, entre otros casos,
publicitar la venta de productos o servicios. Este sitio presenta y capta leads
para los servicios de Promarketing, por lo que debe migrar a Pro o a un hosting
compatible antes de la aprobación final de producción comercial.

Vercel Pro parte actualmente de USD 20 al mes y admite uso comercial. Migrar
evitaría ese proveedor, pero exige volver a validar funciones, variables,
previews, dominio, logs y despliegue. La elección es económica y operativa; no
se ejecutará ninguna opción sin autorización explícita.

### Cuotas técnicas principales

| Recurso | Límite o uso incluido Hobby |
| --- | ---: |
| Fast Data Transfer | 100 GB por mes |
| Fast Origin Transfer | 10 GB por mes |
| Edge Requests | 1.000.000 por mes |
| Invocaciones de Functions | 1.000.000 por mes |
| Active CPU | 4 CPU-horas por mes |
| Memoria provisionada | 360 GB-horas por mes |
| Duración de Functions | 100 GB-horas por mes |
| Imágenes fuente optimizadas | 1.000 por mes |
| Ejecución de builds | 6.000 minutos/100 horas por mes |
| Builds por hora | 32 |
| Deployments por día | 100 |
| Builds concurrentes | 1 |
| Tiempo máximo por build | 45 minutos |
| Runtime logs | 1 hora, hasta 4.000 filas |

La duración máxima de una Function depende de si Fluid Compute está habilitado:
con Fluid Compute, Hobby admite 300 segundos; sin él, el valor tradicional es
10 segundos por defecto y hasta 60 segundos configurables. Debe comprobarse el
ajuste real del proyecto antes de usar procesos largos.

### Impacto en este proyecto

- Las Server Actions del formulario consumen Functions y llaman a Upstash y
  HubSpot; deben conservar tiempos de respuesta cortos.
- Los despliegues por cada push consumen builds. El ritmo actual está muy por
  debajo de 32 por hora y 100 por día.
- Next Image y las imágenes de Sanity consumen optimización/transferencia.
- Hobby no permite comprar consumo adicional; al alcanzar ciertos topes se debe
  esperar al reinicio del periodo o cambiar de plan.
- La retención de logs de una hora es insuficiente para investigar incidentes
  descubiertos tarde; hace falta observabilidad externa o un plan superior.

### Monitoreo

- Revisar Vercel → proyecto/equipo → Usage al menos una vez al mes y después de
  campañas de tráfico.
- Advertencia interna al 70 % y estado crítico al 85 % de cada cuota mensual.
- Alertar errores `429`, `5xx`, timeouts y fallos de build.
- No esperar a superar una cuota para resolver la elegibilidad comercial.

Fuentes oficiales:

- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby)
- [Vercel Pricing](https://vercel.com/pricing)
- [Vercel Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)
- [Vercel Limits](https://vercel.com/docs/limits)
- [Vercel Functions Limits](https://vercel.com/docs/functions/limitations)

## Definition of Done de LIMITS-1

| Control | Estado |
| --- | --- |
| Fuentes oficiales y fecha registradas | PASS |
| Cuotas de Sanity documentadas | PASS |
| Cuotas de HubSpot documentadas | PASS |
| Cuotas técnicas de Vercel documentadas | PASS |
| Consecuencias al alcanzar límites documentadas | PASS |
| Umbrales internos de monitoreo definidos | PASS |
| Consumo privado actual verificado | NOT VERIFIED |
| Elegibilidad comercial de Vercel resuelta | FAIL — requiere decisión |
