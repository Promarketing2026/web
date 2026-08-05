# Auditoría de accesibilidad — 2026-08-05

## Estado general

**FAIL.** Los puntajes Lighthouse de las rutas evaluables cumplen la referencia
interna de 95 o más, pero existen incumplimientos automatizados de contraste y
jerarquía de encabezados. La navegación por teclado y la visibilidad real del
foco quedaron **BLOCKED** por una falla de comunicación de la extensión de
Chrome, por lo que no se declara conformidad WCAG 2.2 AA.

## Alcance y método

- Sitio: `https://web-orcin-sigma-57.vercel.app/`
- Herramienta: Lighthouse 13.4.1, categoría Accessibility.
- Navegador automatizado: Chrome 150 en modo headless.
- Formato principal: escritorio sin emulación de pantalla.
- Control adicional: Home en formato móvil.
- Inspección de código: landmarks, encabezados, foco visible y soporte de
  `prefers-reduced-motion`.
- Los JSON completos se conservaron solo como artefactos temporales locales;
  este documento registra los resultados y selectores reproducibles sin añadir
  informes de más de 200 KB al repositorio.

Comando reproducible de referencia:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
$env:CHROME_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'
pnpm.cmd dlx lighthouse <URL> --only-categories=accessibility --output=json
```

`--use-system-ca` fue necesario por la cadena de certificados del entorno
Windows. No se desactivó la verificación TLS.

## Resultados Lighthouse

| Ruta | Puntaje | Estado | Evidencia principal |
| --- | ---: | --- | --- |
| `/` escritorio | 97 | FAIL | Dos textos animados con contraste insuficiente |
| `/` móvil | 97 | FAIL | Repite los dos fallos de contraste |
| `/blog` | 100 | PASS | Sin fallos automatizados |
| `/blog/articulo-de-blog` | 100 | PASS | Sin fallos automatizados |
| `/glosario` | 98 | FAIL | Orden no secuencial de encabezados |
| `/casos-de-exito` | 100 | PASS | Sin fallos automatizados |
| `/politica-de-privacidad` | 96 | FAIL | Contraste insuficiente en el aviso preliminar |
| 404 personalizada | N/A | BLOCKED | Lighthouse no puntúa una navegación que responde intencionalmente HTTP 404 |

Lighthouse es evidencia automatizada de referencia, no una certificación de
conformidad ni sustituto de las pruebas manuales.

## Hallazgos

### A11Y-01 — Contraste de textos inactivos en Educación

- Severidad: **HIGH**
- Estado: **PASS** después de ACCESS-2a.
- Criterio relacionado: WCAG 2.2 AA, 1.4.3 Contraste mínimo.
- Archivo: `components/education.tsx`.
- Causa: GSAP reduce los textos no activos a `opacity: 0.28`, pero continúan
  siendo contenido visible y accesible.
- Evidencia:
  - Texto de 18 px: relación `1.42:1`; requiere `4.5:1`.
  - Texto de 30 px: relación `1.94:1`; requiere `3:1`.
- Acción: rediseñar el estado inactivo para conservar contraste o retirar de la
  exposición visual/accesible el contenido que no corresponde a la etapa.
- Corrección: la opacidad `0.28` se sustituyó por una transición entre
  `--foreground` y `--muted-foreground`, ambos a opacidad completa. Con la
  preferencia de movimiento reducido, no se crea ScrollTrigger: se muestran
  todos los textos y la etapa final del diagrama de forma estática.
- Verificación: lint, TypeScript y build PASS. Lighthouse Accessibility del
  Home obtuvo `100` y `color-contrast: 1` tanto localmente como en producción.

### A11Y-02 — Movimiento reducido no implementado de forma integral

- Severidad: **MEDIUM**
- Estado: **FAIL** respecto al criterio interno del proyecto.
- Evidencia: no existen usos de `useReducedMotion`,
  `prefers-reduced-motion` ni variantes `motion-reduce` en el código auditado.
  GSAP fija y anima Educación, Motion anima varias secciones y Lenis mantiene
  desplazamiento suavizado para todos los usuarios.
- Acción: establecer una política global de movimiento reducido y adaptar
  Motion, GSAP, diagramas animados y Lenis.

### A11Y-03 — Contraste del aviso preliminar de privacidad

- Severidad: **HIGH**
- Estado: **FAIL**
- Criterio relacionado: WCAG 2.2 AA, 1.4.3 Contraste mínimo.
- Archivo: `app/politica-de-privacidad/page.tsx`.
- Evidencia: texto de 14 px con relación `4.34:1`; requiere `4.5:1`.
- Acción: usar un token de texto con mayor contraste sobre `bg-muted`.

### A11Y-04 — Jerarquía de encabezados en Glosario

- Severidad: **MEDIUM**
- Estado: **FAIL**
- Archivo: `app/glosario/page.tsx` y componente compartido de Accordion.
- Evidencia: el encabezado generado por Radix para cada trigger se renderiza
  como `h3` inmediatamente después del `h1`, y el contenido incluye además un
  `h2` dentro del botón.
- Acción: definir un nivel semántico coherente para los términos sin introducir
  encabezados anidados o saltos `h1 → h3`.

### A11Y-05 — Landmark `main` duplicado en Privacidad

- Severidad: **MEDIUM**
- Estado: **FAIL** en la inspección semántica.
- Archivos: `app/layout.tsx` y `app/politica-de-privacidad/page.tsx`.
- Evidencia: el layout ya envuelve todas las páginas en `<main>` y la página de
  privacidad añade un segundo `<main>` anidado.
- Acción: sustituir el landmark interior por un contenedor o `section`.

### A11Y-06 — Teclado y foco visible

- Severidad: **HIGH** hasta verificar.
- Estado: **BLOCKED**
- Evidencia disponible: los componentes Button, Accordion, Dropdown e inputs
  contienen estilos `focus-visible` en código. Esto no demuestra el orden de
  tabulación, el foco visible de todos los enlaces ni el comportamiento del
  menú y del banner de consentimiento.
- Bloqueo: Chrome y la extensión estaban instalados y habilitados, pero el
  diagnóstico detectó ausente la clave del native host de la extensión. La
  reparación requiere reinstalar el plugin desde su interfaz; no se modificó el
  registro de Windows automáticamente.
- Acción: después de reinstalar el plugin, verificar con teclado Navbar,
  Recursos, CTA, formulario, Accordion, footer, preferencias de cookies y 404.

## Controles binarios

| Control | Estado |
| --- | --- |
| Lighthouse Accessibility ≥95 en rutas evaluables | PASS |
| Contraste WCAG 2.2 AA | FAIL — Educación corregida; Privacidad pendiente |
| Jerarquía de encabezados | FAIL |
| Landmarks únicos y coherentes | FAIL |
| Reduced motion | FAIL |
| Navegación completa por teclado | BLOCKED |
| Foco visible | BLOCKED |
| Evidencia documentada | PASS |

## Criterio de cierre

ACCESS-1 queda ejecutada como auditoría, pero la accesibilidad del sitio no se
considera aprobada. Los hallazgos deben corregirse y volver a probarse antes del
cierre de producción.
