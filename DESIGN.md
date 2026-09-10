# WebSign Design System

## Fuentes de verdad

Este documento se deriva exclusivamente de las siguientes pantallas del proyecto Stitch `8477418725406012811`:

- `WebSign - Home Minimalista & Enfocada (Desktop)` — pantalla `09dec3595b9e42df8cf6fe3f31c450ca`, lienzo 2560 × 11122.
- `WebSign - Home Minimalista & Enfocada (Mobile)` — pantalla `f1995bcf94e644d580385a7b474470ec`, lienzo 780 × 9110.

Las otras pantallas del proyecto no se usan como referencia visual.

## Principios

- Estética dark glassmorphism sobria, técnica y de alta legibilidad.
- Jerarquía corta: una promesa principal, dos CTA como máximo y evidencia visual inmediata.
- Componentes reusables y una única implementación responsive; no existen árboles Desktop/Mobile duplicados.
- Bordes finos y cambios de superficie definen la profundidad. Los glows se reservan para hero y CTA.
- El contenido móvil es más compacto, pero conserva la misma estructura semántica y funcional.

## Color

| Token | Valor | Uso |
|---|---:|---|
| `--surface-base` | `#070A11` | Fondo general |
| `--surface-lowest` | `#060E20` | Footer y bandas profundas |
| `--surface-low` | `#131B2E` | Secciones alternas |
| `--surface` | `#0B1326` | Fondo secundario |
| `--surface-card` | `#0F172A` | Cards y navegación |
| `--surface-card-elevated` | `#1E293B` | Hover, paneles destacados |
| `--surface-high` | `#222A3D` | Campos y elementos internos |
| `--surface-highest` | `#2D3449` | Estados activos |
| `--text-primary` | `#F8FAFC` | Títulos y contenido prioritario |
| `--text-secondary` | `#94A3B8` | Texto descriptivo |
| `--text-muted` | `#8997AA` | Metadatos; ajustado para contraste AA en superficies oscuras |
| `--primary` | `#DBB8FF` | Acento violeta claro |
| `--primary-container` | `#7928CA` | Inicio de gradiente |
| `--secondary` | `#FBABFF` | Acento secundario |
| `--accent-end` | `#D946EF` | Final de gradiente |
| `--tertiary` | `#7BD0FF` | Estado técnico puntual |
| `--success` | `#10B981` | Disponibilidad y confirmación |
| `--warning` | `#F59E0B` | Advertencias |
| `--error` | `#FFB4AB` | Errores |
| `--border` | `rgba(255,255,255,.08)` | Hairline general |
| `--border-glow` | `rgba(217,70,239,.35)` | Hover/acento |

Gradiente de marca: `linear-gradient(135deg, #7928CA 0%, #D946EF 100%)`.

## Tipografía

- Titulares: `Plus Jakarta Sans`, fallback `Inter, sans-serif`.
- Cuerpo y controles: `Inter`, fallback `system-ui, sans-serif`.
- Métricas/código: `JetBrains Mono`, fallback `monospace`.

| Estilo | Tamaño / línea | Peso | Tracking |
|---|---:|---:|---:|
| Display hero | 64 / 72 px | 800 | -0.03em |
| Display hero mobile | 36 / 44 px | 800 | -0.02em |
| Headline XL | 44 / 52 px | 700 | -0.02em |
| Headline XL mobile | 28 / 36 px | 700 | -0.01em |
| Headline LG | 32 / 40 px | 700 | -0.02em |
| Headline MD | 24 / 32 px | 600 | -0.01em |
| Headline SM | 18 / 26 px | 600 | 0 |
| Body LG | 18 / 28 px | 400 | -0.005em |
| Body MD | 15 / 24 px | 400 | 0 |
| Body SM | 13 / 20 px | 400 | 0.005em |
| Label | 14 / 20 px | 500 | 0.01em |
| Label caps | 11 / 16 px | 600 | 0.08em |
| Mono | 13 / 18 px | 400 | 0 |

## Espaciado y layout

- Base: 8 px.
- Escala: 2, 4, 8, 12, 16, 24, 32, 48, 64, 96 y 128 px.
- Contenedor desktop: `max-width: 1280px`; gutter 32 px.
- Gutter mobile: 16 px.
- Header desktop: 80 px, fijo; mobile: 64 px, sticky.
- Secciones desktop: 96 px vertical. Secciones mobile: 32–48 px según densidad.
- Hero desktop: grid de 12 columnas, copy 7 y preview 5, gap 64 px.
- Contacto desktop: copy 5 columnas y formulario 7.
- Grids: 3 columnas para selector/productos, 4 para beneficios, 3 para portfolio.
- Mobile: una columna; el selector rápido admite dos columnas y su último ítem ocupa ambas.

## Breakpoints

- Base/móvil: `< 768px`.
- Tablet: `768–1023px`.
- Desktop: `>= 1024px`.
- Contenedor alcanza su ancho máximo en `>= 1344px` incluyendo gutters.

## Forma y profundidad

- Radio controles: 8–12 px.
- Radio cards: 12–16 px.
- Radio paneles grandes: 16–24 px.
- Botones y badges: `9999px`.
- Hairline: `1px solid rgba(255,255,255,.08)`.
- Card: `0 12px 32px -8px rgba(0,0,0,.35)`.
- Panel elevado: `0 24px 48px -12px rgba(0,0,0,.7)`.
- CTA hover: `0 0 24px rgba(217,70,239,.5)`.
- Header: fondo `rgba(15,23,42,.85)`, blur 20–24 px.

## Componentes

### Navegación

- Un único logo por viewport.
- Desktop: logo, cuatro enlaces y CTA principal.
- Mobile: logo y botón de menú de 40 × 40 px; drawer dentro del mismo header.
- Área táctil mínima: 44 × 44 px. El menú se cierra al navegar, con Escape y al cambiar a desktop.

### Botones

- Primario: gradiente de marca, texto blanco, peso 600–700, alto 48–50 px.
- Secundario: superficie elevada, borde hairline, texto primario.
- No más de dos CTA juntos; en mobile se apilan a ancho completo.
- Estados visibles `hover`, `focus-visible`, `active` y `disabled`.

### Cards

- Superficie `--surface-card`, borde hairline, radio 16 px.
- Padding desktop 24–32 px; mobile 16 px.
- Icono en contenedor de 40–48 px con tinte violeta/fucsia.
- Las cards mobile muestran título, descriptor, hasta tres beneficios y una acción.

### Portfolio

- Máximo tres destacados en Home.
- Imagen 16:10 con `object-fit: cover`; contenido debajo.
- Categoría como badge, tecnologías en chips y CTA único al detalle.
- Sin datos escritos en componentes: el contenido procede de la API.

### Formularios

- Fondo de campo `--surface-high`, borde hairline, radio 10–12 px.
- Labels siempre visibles y errores asociados con `aria-describedby`.
- Focus violeta/fucsia perceptible; mensajes de estado no dependen solo del color.

### Footer

- Superficie profunda, borde superior hairline.
- Desktop: marca, navegación y contacto en columnas.
- Mobile: una columna compacta, un único logo y cierre legal separado.

## Responsive y accesibilidad

- La información del hero se reduce en mobile a promesa, descripción breve, dos CTA, promoción y preview compacto.
- Ningún ancho fijo supera el viewport; grids usan `minmax(0, 1fr)` y medios `max-width: 100%`.
- La navegación, galería y formularios son utilizables con teclado.
- Contraste AA como mínimo; foco visible; `prefers-reduced-motion` desactiva animaciones no esenciales.
- Imágenes con dimensiones o `aspect-ratio` para evitar layout shift y texto alternativo contextual.
