# WebSign Landing - Coding Guidelines

## Objetivo
Dejar criterios consistentes para futuras sesiones de trabajo sobre la landing.

## Principios
- Priorizar claridad comercial antes que complejidad técnica.
- Mantener HTML, CSS y JS puro mientras siga siendo suficiente.
- Evitar cambios que empeoren SEO o accesibilidad por perseguir modularidad innecesaria.
- Preferir progreso incremental sobre refactors grandes sin beneficio visible.

## HTML
- Mantener una sola `h1`.
- Usar landmarks semánticos: `header`, `main`, `section`, `footer`.
- Evitar `style=""` inline salvo casos excepcionales y temporales.
- Escribir contenido crítico directo en HTML si impacta SEO o accesibilidad.
- Usar botones y enlaces según su intención real.
- Agregar atributos accesibles en navegación y formularios.

## CSS
- Centralizar tokens visuales en variables.
- Separar base, layout, componentes y secciones cuando se haga el refactor.
- Evitar nombres de clase que no representen el dominio real del proyecto.
- Preferir clases semánticas como `services`, `service-card`, `portfolio-case`, `trust-band`.
- Definir un sistema consistente de spacing, radios, sombras y contenedores.
- No abusar de gradientes fuertes en todas las secciones.
- Dar más protagonismo a blancos, grises y contraste respirable.

## JavaScript
- Cada módulo debe tener una responsabilidad clara.
- Agregar guards antes de usar elementos del DOM.
- No asumir que todos los anchors hash apuntan a selectores válidos.
- Mantener progressive enhancement: si JS falla, el contenido principal debe seguir disponible.
- Respetar `prefers-reduced-motion` para animaciones.
- No ocultar contenido importante solo con clases que dependen de JS para volverse visible.

## Formularios
- Mostrar feedback de carga, éxito o error.
- Explicar qué sucede después de enviar una consulta.
- Minimizar campos al mínimo útil para ventas.
- Mantener labels reales y placeholders solo como ayuda, no como reemplazo.

## Imágenes y assets
- Optimizar antes de publicar.
- Preferir formatos livianos cuando sea posible.
- Definir `width` y `height` para evitar CLS.
- Conservar organización por tipo de asset.
- Mantener logo en SVG disponible para usos donde convenga nitidez.

## SEO
- Escribir `title` y `description` enfocados en intención comercial real.
- No sostener structured data que no pueda respaldarse en el contenido visible.
- Revisar que Open Graph y Twitter reflejen el posicionamiento actual.
- Mantener sitemap consistente con la versión publicada.

## Accesibilidad
- Asegurar foco visible.
- Navegación completa por teclado.
- Contraste suficiente.
- Soporte para reducción de movimiento.
- Botón de menú con nombre accesible y estado expandido/colapsado.

## Diseño y UX
- Diseñar para transmitir criterio y confianza, no solo color.
- Menos bloques, mejor jerarquía.
- Más aire vertical entre secciones.
- CTA con intención clara y contexto.
- Cards con propósito específico y no intercambiables.
- Portfolio orientado a casos y no solo a miniaturas.

## Convenciones sugeridas para futuras clases
- Secciones: `hero`, `trust`, `services`, `portfolio`, `why-us`, `process`, `testimonials`, `contact`, `footer`
- Layout: `container`, `section-shell`, `grid-2`, `grid-3`
- Componentes: `btn`, `btn-primary`, `btn-secondary`, `card`, `tag`, `badge`, `input-field`
- Estados: `is-active`, `is-open`, `is-loaded`, `is-revealed`

## Checklist antes de cerrar una iteración
- El mensaje principal quedó más claro que antes.
- No se introdujeron estilos inline nuevos.
- No se rompió mobile.
- No se rompió navegación por teclado.
- No se agregaron dependencias.
- El código quedó más entendible que antes.
