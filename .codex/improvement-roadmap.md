# WebSign Landing - Improvement Roadmap

## Objetivo del roadmap
Ordenar la evolución de la landing en etapas claras para mejorar percepción profesional, conversión y mantenibilidad sin romper el sitio actual.

## Fase 1 - Quick wins sin romper estructura
### Objetivo
Mejorar percepción y robustez con bajo riesgo.

### Alcance sugerido
- Reescribir hero, subtítulos y CTA principales.
- Reagrupar mentalmente los servicios core y secundarios, aunque todavía no se cambie toda la arquitectura.
- Corregir bugs y fragilidades del JS de navegación y scroll.
- Quitar estilos inline más notorios.
- Mejorar spacing, contraste, pesos tipográficos y botones.
- Agregar estados de foco visibles.
- Ajustar el contacto para que explique qué pasa después del envío.

### Resultado esperado
- La landing se ve más profesional.
- El mensaje se entiende mejor.
- La navegación es más robusta.

## Fase 2 - Mejoras fuertes de UI y copy
### Objetivo
Transformar la landing en una pieza comercial más convincente.

### Alcance sugerido
- Rediseñar hero completo.
- Reestructurar servicios en menos bloques y con mejor foco.
- Convertir portfolio en casos más narrativos.
- Crear banda de confianza y sección de proceso.
- Incorporar testimonios o prueba social.
- Revisar jerarquía completa de títulos, intertítulos y CTA.
- Rehacer cards para que se sientan más propias y menos genéricas.

### Resultado esperado
- Mayor claridad comercial.
- Mayor autoridad percibida.
- Mejor recorrido hasta la consulta.

## Fase 3 - Refactor del código
### Objetivo
Dejar una base mantenible y escalable.

### Alcance sugerido
- Dividir `styles.css` en archivos por responsabilidad.
- Dividir `script.js` en módulos simples.
- Renombrar clases ambiguas como `courses` y `features`.
- Eliminar deuda de estilos inline.
- Reordenar assets bajo `assets/`.
- Evaluar `data/services.js` y `data/projects.js` solo si realmente reducen repetición sin afectar SEO.

### Resultado esperado
- Cambios futuros más rápidos y seguros.
- Menor acoplamiento entre contenido, estilos y comportamiento.

## Fase 4 - SEO, performance y accesibilidad
### Objetivo
Optimizar la calidad técnica final.

### Alcance sugerido
- Optimizar imágenes del portfolio y generar variantes livianas.
- Agregar `width` y `height` a imágenes.
- Revisar y depurar JSON-LD.
- Mejorar `title`, `description` y metadatos de compartir.
- Incorporar `main`, skip link y mejores landmarks.
- Soportar `prefers-reduced-motion`.
- Revisar contraste, foco y navegación por teclado.
- Mantener el sitemap al día.

### Resultado esperado
- Mejor carga y experiencia en mobile.
- Mejor base para indexación y sharing.
- Mayor cumplimiento de accesibilidad.

## Orden recomendado de ejecución
1. Corregir mensaje y percepción.
2. Reforzar confianza y conversión.
3. Recién después refactorizar estructura.
4. Cerrar con optimización técnica fina.

## Dependencias blandas
- Conseguir testimonios reales o validación para mostrarlos.
- Definir si `Data Flow` vive como producto destacado o como oferta separada.
- Definir canal principal de conversión.

## Métricas recomendadas
- porcentaje de clics en CTA principal,
- envíos de formulario,
- scroll hasta portfolio y contacto,
- tiempo de permanencia,
- peso total de la página,
- Largest Contentful Paint,
- errores de consola,
- validación de navegación por teclado.

## Criterio de éxito
La landing debe terminar percibiéndose como:

- profesional,
- confiable,
- clara en su propuesta,
- enfocada en software y soluciones reales,
- simple de mantener sin framework.
