# WebSign Landing - Technical Debt

## Resumen
La base actual es simple y funcional, pero concentra demasiadas responsabilidades en tres archivos. Eso hoy permite avanzar rápido, pero no escala bien para una landing más seria, mantenible y optimizada.

## Deuda técnica actual

### HTML
- `index.html` contiene estructura, contenido, estilos inline y datos estructurados.
- No hay `main` ni landmarks más completos.
- Hay mucho markup repetido para servicios y portfolio.
- Existen varios `style=""` embebidos.
- La semántica de clases no refleja el negocio: `courses`, `course-card` y `features` no representan servicios ni casos.

### CSS
- `styles.css` agrupa tokens, layout, componentes, secciones, animaciones y responsive.
- Hay acoplamiento entre secciones por reutilización poco precisa de clases.
- No existe sistema claro de espaciados, contenedores, estados ni utilidades.
- La responsividad depende casi solo de un breakpoint.

### JavaScript
- `script.js` mezcla navegación, scroll, lazy states y animación.
- No hay guards defensivos para futuras páginas o cambios parciales de DOM.
- El manejo de anchors con `href="#"` es frágil.
- El comportamiento del formulario no contempla UX de éxito/error.

### Assets
- Las imágenes del portfolio son el principal pasivo de performance.
- No hay tamaños responsivos ni formatos optimizados.
- La organización actual de `images/` es simple pero limitada si el sitio crece.

## Problemas concretos por archivo

### `index.html`
- Hero débil comercialmente.
- Portfolio y Data Flow dependen de estilos inline.
- Datos estructurados potencialmente arriesgados si no reflejan evidencia visible.
- No hay sección de proceso, testimonios o trust bar.

### `styles.css`
- Monolítico.
- Nombres de clase heredados de otra intención de proyecto.
- Falta separación entre base, layout, componentes y secciones.
- Los estilos del portfolio están partidos entre CSS y atributos inline.

### `script.js`
- `document.querySelector('#')` puede fallar cuando se hace click en el logo actual.
- El menú móvil no actualiza atributos ARIA.
- Las imágenes lazy dependen de JS para pasar a visible.
- No se contempla `prefers-reduced-motion`.

## Arquitectura propuesta
Propuesta recomendada para una próxima fase, manteniendo HTML, CSS y JS puro:

```text
/
  index.html
  sitemap.xml
  assets/
    images/
      branding/
      portfolio/
      social/
    icons/
  css/
    tokens.css
    base.css
    layout.css
    components.css
    sections.css
    utilities.css
    responsive.css
  js/
    main.js
    navigation.js
    scroll.js
    reveal.js
    form.js
  data/
    services.js
    projects.js
```

## Qué conviene mover y por qué

### `styles.css` -> `css/`
#### `tokens.css`
- colores,
- sombras,
- radios,
- spacing,
- contenedores,
- breakpoints.

Motivo: centralizar decisiones visuales y facilitar ajustes de marca.

#### `base.css`
- reset,
- tipografía,
- body,
- headings,
- links,
- forms base.

Motivo: separar estilos globales de componentes y secciones.

#### `layout.css`
- header,
- wrappers,
- containers,
- grids compartidas,
- spacing estructural.

Motivo: evitar repetir reglas de distribución en secciones.

#### `components.css`
- botones,
- cards,
- tags,
- badges,
- nav items,
- form controls.

Motivo: crear piezas reutilizables y coherentes.

#### `sections.css`
- hero,
- services,
- portfolio,
- why-us,
- process,
- testimonials,
- contact,
- footer.

Motivo: encapsular diferencias visuales por bloque de la landing.

#### `responsive.css`
- ajustes por breakpoint.

Motivo: encontrar rápido comportamiento responsive sin recorrer todo el archivo.

### `script.js` -> `js/`
#### `main.js`
- bootstrap de módulos,
- listeners globales,
- guards.

#### `navigation.js`
- menú móvil,
- estados ARIA,
- cierre automático,
- sticky nav behaviors si se agregan.

#### `scroll.js`
- smooth scroll seguro,
- compensación por header sticky,
- active section highlight opcional.

#### `reveal.js`
- animaciones por intersección,
- soporte para `prefers-reduced-motion`.

#### `form.js`
- validación ligera,
- estados de carga,
- mensajes de éxito o error,
- integración limpia con Formspree.

Motivo general: cada archivo resuelve una sola responsabilidad y queda más fácil de testear y mantener.

### `images/` -> `assets/images/`
Separar:

- `branding/` para logos y favicons,
- `portfolio/` para casos,
- `social/` para íconos sociales.

Motivo: preparar el proyecto para crecer sin mezclar recursos de distinto tipo.

### `data/`
Uso recomendado con criterio, no por moda.

#### `services.js`
Puede centralizar títulos, descripciones, bullets y CTA de servicios si la sección se vuelve muy cambiante o reutilizable.

#### `projects.js`
Puede centralizar portfolio, tags, categorías, estados y links.

Motivo: bajar repetición y permitir futuros filtros o renderizado parcial.

Advertencia:

- no conviene pasar todo el contenido principal a renderizado por JS en la siguiente iteración,
- el contenido crítico del hero, propuesta de valor y contacto debería seguir estando directo en HTML.

## Refactor recomendado sin sobreingeniería
1. Mejorar copy y UI sin mover todavía a datos.
2. Separar CSS y JS por módulos.
3. Recién después evaluar si servicios o portfolio justifican `data/*.js`.

## Riesgos si no se atiende esta deuda
- cada cambio visual va a costar más,
- el sitio va a acumular estilos inline y excepciones,
- el mensaje comercial seguirá perdiendo foco,
- futuras mejoras de SEO y accesibilidad van a ser más caras,
- la percepción de calidad del código no acompañará la propuesta de valor.
