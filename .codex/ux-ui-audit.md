# WebSign Landing - UX/UI Audit

## Resumen
La landing actual es funcional, pero no construye suficiente autoridad para una empresa de software. El mayor problema no es un bug puntual sino la combinación de:

- mensaje genérico,
- jerarquía comercial débil,
- visual demasiado plantillero,
- falta de prueba social contundente,
- estructura técnica poco mantenible.

## Hallazgos principales

| Severidad | Área | Hallazgo | Impacto | Evidencia |
| --- | --- | --- | --- | --- |
| Alta | Posicionamiento | El hero usa un mensaje genérico: "Soluciones Digitales Integrales". No dice para quién, qué resuelve ni por qué WebSign es diferente. | Baja la claridad y la tasa de consulta. | `index.html:71-76` |
| Alta | Oferta | La sección de servicios mezcla software, diseño, marketing, hosting y cursos sin jerarquía. | La marca se percibe menos especializada y menos premium. | `index.html:80-198` |
| Alta | Conversión | Solo hay un CTA principal y no existe una escalera de conversión con prueba social, proceso ni garantías. | El usuario no recibe suficiente confianza antes del contacto. | `index.html:71-76`, `index.html:379-440` |
| Alta | Portfolio | El portfolio muestra proyectos reales, pero casi no comunica problema, solución, alcance o resultado logrado. | Desaprovecha el principal activo de credibilidad. | `index.html:202-377` |
| Alta | Performance | Varias imágenes del portfolio pesan entre 1.3 MB y 2.8 MB. | Riesgo alto de carga lenta y peor percepción de calidad. | `images/portfolio/*.png` |
| Alta | Mantenibilidad | Hay estilos inline y se reutiliza la clase `features` para el portfolio. | Complica escalar el diseño y rompe consistencia. | `index.html:203-208`, `index.html:358-371` |
| Media | Accesibilidad | No hay `main`, skip link, estados de foco visibles ni atributos ARIA en el menú móvil. | Menor accesibilidad y menor robustez de navegación. | `index.html:47-68`, `styles.css:73-104`, `script.js:1-13` |
| Media | JS | El scroll suave intercepta todos los `href^="#"`. El logo usa `href="#"` y eso puede disparar `document.querySelector('#')`, que es un selector inválido. | Bug de consola y posible ruptura de interacción. | `index.html:51`, `script.js:16-27` |
| Media | UX móvil | El menú móvil se oculta con `opacity` y `pointer-events`, pero sigue existiendo en el flujo de foco del teclado. | Riesgo de foco en elementos invisibles. | `styles.css:570-589` |
| Media | UX de contacto | El formulario no ofrece contexto comercial, tiempos de respuesta, validación enriquecida ni estado de éxito. | Convierte menos de lo que podría. | `index.html:407-439`, `script.js:30-31` |
| Media | SEO | Hay JSON-LD con `aggregateRating` y `reviewCount` sin evidencia visible en la página. | Riesgo de datos estructurados poco confiables o inválidos. | `index.html:479-515` |
| Media | SEO | Se usan metadatos de poco valor actual como `keywords`, `revisit-after`, `language` y geo tags legacy. | Ruido técnico sin impacto fuerte en ranking. | `index.html:7-43` |
| Media | Percepción visual | Las cards de servicios y portfolio son correctas pero genéricas; falta una dirección visual más editorial y consultiva. | La marca no se diferencia visualmente. | `styles.css:166-374` |
| Baja | Animación | No hay contemplación de `prefers-reduced-motion`. | Pequeña deuda de accesibilidad. | `styles.css:552-562`, `script.js:49-64` |
| Baja | Lazy loading | Las imágenes lazy parten con `opacity: 0` y dependen de JS para verse. | Si falla JS, el portfolio puede quedar invisible. | `styles.css:302-316`, `script.js:33-47` |

## Evaluación por dimensión

### 1. Estructura y jerarquía
- La landing sigue un orden lógico básico, pero no acompaña un recorrido comercial fuerte.
- Falta una capa de credibilidad inmediatamente después del hero.
- "¿Por qué elegirnos?" llega tarde y con argumentos genéricos.
- No existe una sección de proceso, que suele mejorar mucho la percepción profesional en servicios a medida.

### 2. Diseño visual
- La paleta es coherente, pero está usada casi siempre en fondos intensos o gradientes amplios.
- Falta mayor contraste con blancos, grises y bloques de respiro.
- Las sombras, bordes y radios siguen un lenguaje estándar de plantilla.
- El conjunto transmite "landing correcta" más que "estudio de software serio y confiable".

### 3. Copywriting
- Predominan frases genéricas del rubro: "tecnologías modernas", "código limpio", "soluciones a medida".
- Hay poco lenguaje orientado a negocio, operación, eficiencia, procesos o toma de decisiones.
- Los bullets dicen qué se hace, pero no qué valor obtiene el cliente.
- "Cursos de Tecnología" rompe el foco comercial principal.

### 4. Confianza y conversión
- El portfolio es la mejor evidencia, pero necesita estar estructurado como casos y no solo como catálogo.
- Faltan testimonios, logos de clientes, sectores atendidos, beneficios medibles y respuesta esperada.
- El CTA "Solicitar cotización" se repite sin variar según contexto.
- El formulario no reduce ansiedad ni anticipa el siguiente paso.

### 5. Responsive
- La grilla colapsa correctamente a una columna.
- No hay evidencia de un sistema responsive más fino para márgenes, densidad visual, tipografía o CTA sticky.
- El hero y los cards pueden seguir viéndose densos en mobile.

### 6. Accesibilidad
- Falta control semántico del menú móvil: `aria-expanded`, `aria-controls`, nombre accesible del botón.
- Falta foco visible en enlaces, botones e inputs.
- No hay skip link ni landmark principal.
- No hay manejo de motion preferences.

### 7. SEO
- El SEO base existe, pero todavía está orientado a checklist más que a estrategia.
- El `title` y la `description` pueden enfocarse mejor en servicios core y resultado de negocio.
- El sitemap es mínimo y está bien para una sola página, pero requiere mantenimiento manual.
- Los datos estructurados deben alinearse con contenido real y verificable.

### 8. Performance
- El cuello de botella más claro son las imágenes del portfolio.
- No hay versiones `webp/avif`.
- No hay `width` y `height` en imágenes, con posible impacto en CLS.
- El CSS y JS son livianos; el mayor peso está en assets y markup repetido.

## Fortalezas a preservar
- La identidad cromática ya tiene una base reconocible.
- Hay proyectos reales y diversos, especialmente valiosos para instituciones educativas y software de gestión.
- La landing ya tiene suficiente material para convertirse en una pieza comercial fuerte sin rehacer todo desde cero.

## Recomendación UX/UI central
Pasar de una landing "multipropósito de servicios digitales" a una landing "consultiva de software y soluciones web a medida", con:

- hero más específico,
- servicios agrupados en menos bloques y con mejor foco,
- portfolio convertido en casos de uso,
- prueba social visible,
- proceso claro,
- contacto con menos fricción y más expectativa positiva.
