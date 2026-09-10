# WebSign Landing - Project Overview

## Propósito del proyecto
Landing institucional y comercial de WebSign orientada a:

- aumentar la percepción profesional de la marca,
- explicar con claridad la propuesta de valor,
- generar consultas comerciales calificadas,
- servir como base escalable para futuras iteraciones.

## Contexto de negocio
WebSign ofrece soluciones digitales para empresas, instituciones educativas y emprendimientos. El foco más sólido hoy está en:

- desarrollo de sistemas de gestión,
- desarrollo web corporativo,
- aplicaciones web,
- soluciones digitales a medida,
- soporte tecnológico.

La landing actual comunica una oferta demasiado amplia y mezcla servicios principales con servicios secundarios, lo que diluye la especialización percibida.

## Stack actual
- `index.html`
- `styles.css`
- `script.js`
- `sitemap.xml`
- `images/`

Restricciones vigentes:

- mantener HTML, CSS y JavaScript puro,
- no usar frameworks,
- no agregar dependencias,
- no eliminar contenido o imágenes existentes sin decisión explícita.

## Estructura actual de la landing
- Header con navegación simple.
- Hero breve con un único CTA.
- Sección de servicios con 9 cards.
- Portfolio con 11 proyectos.
- Sección "¿Por qué elegirnos?" con 4 bloques.
- Formulario de contacto.
- Footer institucional.

## Diagnóstico ejecutivo
### Lo que hoy funciona
- Hay base visual consistente con la identidad violeta/magenta.
- Existe portfolio real, lo cual es un activo fuerte de confianza.
- La página ya tiene estructura de landing completa y formulario funcional.
- Hay intención de SEO técnico básica: `title`, `description`, `canonical`, Open Graph, JSON-LD y sitemap.

### Lo que hoy debilita la percepción profesional
- El mensaje principal es genérico y no explica por qué elegir WebSign en vez de otra agencia.
- La oferta parece demasiado amplia: software, diseño, marketing, hosting y cursos conviven sin una jerarquía clara.
- La página se siente más cercana a una plantilla multipropósito que a una empresa de software con criterio consultivo.
- Faltan señales de confianza de alto impacto: resultados, testimonios, industrias atendidas, proceso, garantía de respuesta, CTA más orientados a negocio.
- La implementación técnica está muy centralizada y mezcla contenido, presentación y comportamiento.

## Posicionamiento recomendado
Dirección sugerida para próximas iteraciones:

> WebSign debe percibirse primero como socio tecnológico y estudio de desarrollo de software a medida.

Esto implica:

- priorizar software, sistemas y aplicaciones web como oferta central,
- mover diseño gráfico, marketing y hosting a un plano secundario o complementario,
- reforzar casos reales, industrias, proceso de trabajo y claridad comercial,
- escribir copy más orientado a resultados y menos a listados genéricos.

## Audiencias prioritarias
- PyMEs que necesitan digitalizar procesos.
- Instituciones educativas con necesidades de gestión, comunicación o sistemas internos.
- Emprendimientos que necesitan validar o escalar un producto digital.

## Objetivo principal de conversión
Consulta comercial calificada.

Objetivos secundarios:

- clic en CTA de contacto,
- navegación hacia portfolio,
- permanencia y scroll profundo,
- construcción de credibilidad.

## Arquitectura recomendada a mediano plazo
Propuesta conservadora y escalable, sin framework:

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

### Criterio de esta propuesta
- Mantener el contenido crítico del hero, servicios y contacto en HTML para no depender de JS en SEO y accesibilidad.
- Dividir CSS por responsabilidades para bajar acoplamiento.
- Dividir JS por módulos simples y defensivos.
- Usar `data/` solo cuando la repetición de cards justifique abstraer contenido.

## Decisiones recomendadas para futuras sesiones
- No migrar todavía a renderizado completo por JavaScript.
- No introducir complejidad arquitectónica antes de corregir copy, jerarquía visual y conversión.
- Usar el portfolio como principal prueba social, pero reescrito en formato caso de uso + solución + resultado.
- Separar "servicios core" de "servicios complementarios".

## Información faltante que ayudaría mucho
- testimonios reales autorizados,
- resultados medibles por proyecto,
- industrias prioritarias a nivel comercial,
- canal de contacto preferido: formulario, WhatsApp, email o reunión,
- tiempos de respuesta y modalidad de trabajo,
- definición de si `Data Flow` es oferta principal o producto aparte.
