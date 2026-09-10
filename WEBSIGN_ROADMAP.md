# WebSign — Roadmap permanente

Estados: `[ ] Pendiente` · `[~] En curso` · `[x] Finalizado` · `[!] Bloqueado`

## Recuperación tras interrupción

- **Fecha de recuperación:** 2026-09-09.
- **Estado encontrado:** la recuperación anterior había avanzado la aplicación hasta las fases 17–18, pero quedó interrumpida antes de validar accesibilidad automatizada y el flujo administrativo contra MongoDB. El código real contiene React/Vite, API Express, modelos Mongoose, rutas públicas, autenticación, administración, CRUD, uploads locales, SEO y pruebas unitarias.
- **Fase donde se interrumpió:** originalmente en FASE 15 — Responsive completo; al retomar esta ejecución, el trabajo más reciente estaba en FASE 17 — Accesibilidad y FASE 18 — Testing (`frontend/scripts/visual-audit.mjs`, `frontend/src/App.test.jsx` y este roadmap).
- **Archivos incompletos o parciales encontrados:** `frontend/scripts/visual-audit.mjs` no ejecutaba un motor WCAG ni recorría todas las vistas admin; no existía una prueba autenticada con MongoDB y storage reales; FASE 21 todavía depende de decisiones de despliegue.
- **Archivos correctos verificados:** arquitectura y rutas en `frontend/src/App.jsx`; Home responsive; portfolio y detalle alimentados por API; servicio HTTP; contexto y guard de autenticación; layout y pantallas admin; app, rutas, controladores, validadores, modelos, storage y scripts del backend; `DESIGN.md`.
- **Errores e inconsistencias encontrados:** respuestas `categorie`/`technologie` en el CRUD de taxonomías; contraste insuficiente del token `--text-muted`; overflow horizontal real en tablas admin mobile/tablet; errores de mutación admin sin feedback; dos vulnerabilidades moderadas de desarrollo en Vitest 3; aplicación nueva todavía sin seguimiento en Git. Los cambios locales de `index.html`, `script.js`, `styles.css` y `sitemap.xml` legacy se preservaron.
- **Código duplicado:** el sitio estático raíz y la aplicación `frontend/` coexisten por la decisión documentada de conservar el legado; no se detectó una segunda implementación React accidental.
- **Acciones de recuperación:** inventario y contraste roadmap/código; corrección del contrato de taxonomías; integración de axe-core; ajuste AA del texto secundario; tablas admin responsive; feedback accesible en mutaciones; prueba end-to-end de API con base Mongo aislada y limpieza de uploads; actualización segura a Vitest 5.
- **Pruebas realizadas:** `npm run check` (lint, 16 tests unitarios y build), `npm run test:integration -w backend` (1 flujo autenticado completo), `npm audit` (0 vulnerabilidades) y auditoría visual/WCAG de Home, portfolio, detalle, contacto y todas las vistas admin en 390, 780, 1280 y 2560 px.
- **Estado de archivos de la fase interrumpida:** `frontend/src/styles/global.css` — **COMPLETO**; `frontend/scripts/visual-audit.mjs` — **COMPLETO** para validación automatizada; integración Mongo/admin — **COMPLETA**; imports y rutas — **COMPLETOS**. Solo queda validación humana con lector de pantalla/teclado físico y la definición del despliegue.

## FASE 0 — Auditoría del proyecto existente `[x] Finalizado`

- **Objetivo:** comprender el punto de partida sin perder trabajo existente.
- **Tareas:** inventario del repositorio; lectura de HTML, CSS, JavaScript, sitemap y assets; revisión de Git.
- **Archivos creados:** ninguno.
- **Archivos modificados:** ninguno.
- **Decisiones técnicas:** conservar el sitio estático raíz como legado; construir la aplicación nueva en `frontend/` y `backend/`.
- **Pruebas ejecutadas:** inspección estructural con `rg`; `git status`; auditoría de dimensiones de imágenes.
- **Errores encontrados:** no existen `package.json`, React, API ni base de datos; sitemap incompleto; varias imágenes pesan 1–3 MB; el sitio actual contiene portfolio hardcodeado y envío externo de formulario.
- **Pendientes:** ninguno; la migración se completó en fases posteriores sin sobrescribir los cambios locales legacy.

## FASE 1 — Análisis Stitch Desktop + Mobile `[x] Finalizado`

- **Objetivo:** fijar las dos pantallas autorizadas como única referencia visual.
- **Tareas:** consulta MCP de Desktop y Mobile; descarga temporal de HTML/capturas; análisis de estructura, tipografía, color, spacing, grids y responsive.
- **Archivos creados:** ninguno en el repositorio.
- **Archivos modificados:** ninguno.
- **Decisiones técnicas:** implementación React única con breakpoints; Desktop 12 columnas y Mobile compacto sin duplicación de logo o contenido.
- **Pruebas ejecutadas:** verificación de IDs, títulos, device type y tamaños de ambas pantallas.
- **Errores encontrados:** el HTML exportado por Stitch contiene pequeñas inconsistencias de IDs y contenido entre vistas; se normalizarán semánticamente sin mezclar otras pantallas.
- **Pendientes:** ninguno; la implementación fue contrastada nuevamente durante la recuperación.

## FASE 2 — Design System `[x] Finalizado`

- **Objetivo:** traducir Stitch a tokens y reglas implementables.
- **Tareas:** documentar color, tipografía, espaciado, layout, breakpoints, componentes y accesibilidad.
- **Archivos creados:** `DESIGN.md`.
- **Archivos modificados:** ninguno.
- **Decisiones técnicas:** CSS custom properties como fuente técnica; fuentes Plus Jakarta Sans, Inter y JetBrains Mono.
- **Pruebas ejecutadas:** contraste conceptual y comparación de tokens con los dos HTML exportados.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno; se compararon las capturas responsive con las dos fuentes autorizadas.

## FASE 3 — Arquitectura React `[x] Finalizado`

- **Objetivo:** crear el frontend Vite y su arquitectura de rutas/componentes.
- **Tareas:** scaffold; router; layouts; servicios; contextos; manejo de estados.
- **Archivos creados:** `frontend/`, configuración Vite, router, layouts, servicio API, contexto de autenticación, hooks y estados comunes.
- **Archivos modificados:** `package.json` y `package-lock.json` del workspace.
- **Decisiones técnicas:** monorepo npm con `frontend/` y `backend/`; el sitio estático raíz se conserva.
- **Pruebas ejecutadas:** lint, tests y build de producción.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 4 — Implementación Home `[x] Finalizado`

- **Objetivo:** reproducir Desktop y Mobile desde un único árbol React.
- **Tareas:** header, hero, selector, servicios, proyectos destacados, CTA, contacto y footer.
- **Archivos creados:** componentes de Home, layout público y estilos en `frontend/src/`.
- **Archivos modificados:** `frontend/src/pages/Home/HomePage.jsx`, `frontend/src/styles/global.css`.
- **Decisiones técnicas:** datos de proyectos exclusivamente desde API.
- **Pruebas ejecutadas:** smoke test de ruta, build y auditoría visual completa.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 5 — Backend Node.js `[x] Finalizado`

- **Objetivo:** establecer Express, configuración, middlewares y manejo de errores.
- **Tareas:** app factory, servidor, CORS, seguridad, logging y healthcheck.
- **Archivos creados / modificados:** `backend/src/app.js`, `server.js`, configuración, middlewares y paquetes del backend.
- **Decisiones técnicas:** app factory testeable, CORS con credenciales, Helmet, compresión, logging y límites por grupo de rutas.
- **Pruebas ejecutadas:** healthcheck Supertest y arranque real contra MongoDB local.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 6 — MongoDB y modelos `[x] Finalizado`

- **Objetivo:** persistir proyectos, categorías, tecnologías, usuarios y contenido.
- **Tareas:** esquemas Mongoose, índices, relaciones y seed.
- **Archivos creados / modificados:** modelos `Project`, `Category`, `Technology`, `User`, `SiteContent`, `ContactMessage`; conexión y seed idempotente.
- **Decisiones técnicas:** referencias Mongoose para categoría y tecnologías.
- **Pruebas ejecutadas:** conexión real y consultas públicas sobre MongoDB local sin alterar datos.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 7 — API de proyectos `[x] Finalizado`

- **Objetivo:** exponer consultas públicas y administración REST.
- **Tareas:** controllers, routes, validación, orden y estados.
- **Archivos creados / modificados:** `projectController.js`, rutas públicas/admin y `validators/schemas.js`.
- **Decisiones técnicas:** endpoints públicos separados de `/api/admin`.
- **Pruebas ejecutadas:** validadores, endpoints públicos reales y pruebas unitarias de actualización/eliminación.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 8 — Portfolio público `[x] Finalizado`

- **Objetivo:** listar proyectos publicados desde MongoDB.
- **Tareas:** cards, estados loading/error/empty y navegación.
- **Archivos creados / modificados:** `PortfolioPage.jsx`, `ProjectCard.jsx`, estados comunes y servicio API.
- **Decisiones técnicas:** API como única fuente de proyectos.
- **Pruebas ejecutadas:** smoke test React Router y auditoría responsive en cuatro anchos.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 9 — Detalle de proyectos `[x] Finalizado`

- **Objetivo:** mostrar cada proyecto publicado por slug.
- **Tareas:** portada, metadatos, tecnologías, galería y enlaces.
- **Archivos creados / modificados:** `ProjectDetailPage.jsx`, SEO y estilos de detalle/galería.
- **Decisiones técnicas:** metadata SEO por proyecto.
- **Pruebas ejecutadas:** auditoría responsive con proyecto y galería simulados desde la API.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 10 — Autenticación `[x] Finalizado`

- **Objetivo:** proteger administración y endpoints mutables.
- **Tareas:** usuario, hash, login/logout/me, JWT y guards React.
- **Archivos creados / modificados:** modelo y script de usuario, controladores/rutas auth, middleware, contexto y guard React.
- **Decisiones técnicas:** JWT en cookie HttpOnly, `SameSite=Strict`, firma corta, `issuer` y `audience` verificados.
- **Pruebas ejecutadas:** endpoint admin protegido y redirección frontend al login.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 11 — Panel administrador `[x] Finalizado`

- **Objetivo:** crear dashboard y navegación administrativa.
- **Tareas:** layout, métricas, estados y rutas protegidas.
- **Archivos creados / modificados:** `AdminLayout.jsx`, `DashboardPage.jsx` y controlador de métricas.
- **Decisiones técnicas:** drawer hasta 1023 px y barra lateral persistente desde desktop.
- **Pruebas ejecutadas:** render admin y apertura de navegación en 390/780 px; layout 1280/2560 px.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 12 — CRUD proyectos `[x] Finalizado`

- **Objetivo:** mantener portfolio sin editar React.
- **Tareas:** crear, editar, eliminar, publicar, destacar y ordenar.
- **Archivos creados / modificados:** listado y formulario único de proyectos; rutas y controladores CRUD/toggles.
- **Decisiones técnicas:** formulario único create/edit.
- **Pruebas ejecutadas:** validación de payload y pruebas de ciclo de actualización/eliminación.
- **Errores encontrados:** ninguno.
- **Pendientes:** ninguno propio de esta fase.

## FASE 13 — Categorías y tecnologías `[x] Finalizado`

- **Objetivo:** normalizar taxonomías reutilizables.
- **Tareas:** modelos, API y CRUD administrativo.
- **Archivos creados / modificados:** modelos, controlador genérico, rutas y `TaxonomyPage.jsx`.
- **Decisiones técnicas:** slugs únicos e inactivación sin pérdida histórica.
- **Pruebas ejecutadas:** validación de taxonomías, bloqueo de borrado cuando están en uso y creación real autenticada en MongoDB.
- **Errores encontrados:** las claves singulares de respuesta se generaban recortando la `s` (`categorie`/`technologie`); corregido con claves explícitas `category`/`technology`.
- **Pendientes:** ninguno propio de esta fase.

## FASE 14 — Gestión de imágenes `[x] Finalizado`

- **Objetivo:** subir portada y galería con backend desacoplado.
- **Tareas:** upload, validación MIME/tamaño y storage service.
- **Archivos creados / modificados:** servicio local, controlador/ruta de upload, formulario de proyecto y limpieza en `projectController.js`.
- **Decisiones técnicas:** almacenamiento local MVP tras interfaz de servicio.
- **Pruebas ejecutadas:** rechazo de firma inválida y limpieza selectiva al editar/borrar.
- **Errores encontrados:** `remove()` existía pero no se utilizaba, dejando archivos huérfanos; corregido.
- **Pendientes:** ninguno para el storage local MVP.

## FASE 15 — Responsive completo `[x] Finalizado`

- **Objetivo:** asegurar fidelidad y usabilidad en Desktop/Mobile.
- **Tareas:** auditoría 390, 780, 1280 y 2560 px; menú; grids; galería; admin.
- **Archivos creados / modificados:** `global.css`, layouts de navegación y `frontend/scripts/visual-audit.mjs`.
- **Decisiones técnicas:** implementación única; menú público bajo 768 px y drawer admin bajo 1024 px.
- **Pruebas ejecutadas:** Home, portfolio, detalle, contacto, dashboard, proyectos, formulario create/edit, categorías, tecnologías y contenidos en 390, 780, 1280 y 2560 px; sin overflow desplazable ni duplicados.
- **Errores encontrados:** admin demasiado estrecho a 780 px; corregido moviendo el drawer al breakpoint tablet. Las tablas admin desbordaban al ampliar la cobertura; corregido con layout de taxonomías apilado y columnas mobile compactas.
- **Pendientes:** ninguno propio de esta fase.

## FASE 16 — SEO `[x] Finalizado`

- **Objetivo:** metadata, canonical y contenido indexable por ruta.
- **Tareas:** Helmet, Open Graph, robots y sitemap dinámico/final.
- **Archivos creados / modificados:** `Seo.jsx`, controlador SEO, rutas `robots.txt`/sitemap, archivos robots/sitemap y variables de sitio.
- **Decisiones técnicas:** metadata de proyecto administrable; canonical automático; sitemap dinámico desde proyectos publicados.
- **Pruebas ejecutadas:** tests de sitemap/robots y consulta real a ambos endpoints.
- **Errores encontrados:** sitemap legacy solo incluía Home y no existía robots; corregido.
- **Pendientes:** ninguno propio de esta fase; producción debe enrutar `/sitemap.xml` al backend.

## FASE 17 — Accesibilidad `[~] En curso`

- **Objetivo:** experiencia WCAG 2.2 AA.
- **Tareas:** teclado, foco, labels, estados, contraste, reduced motion.
- **Archivos creados / modificados:** layouts, navegación, estados admin, estilos y auditoría visual/semántica con axe-core.
- **Decisiones técnicas:** HTML semántico y mensajes live.
- **Pruebas ejecutadas:** axe WCAG 2.2 AA, landmarks, H1, idioma, alternativas, labels, nombres accesibles, IDs, reduced motion, menús y contraste en cuatro viewports y todas las rutas relevantes.
- **Errores encontrados:** faltaban estado ARIA y cierre con Escape/cambio de breakpoint en el drawer admin; corregido. Se eliminó un `main` anidado en 404 y se elevó `--text-muted` de `#64748B` a `#8997AA` por contraste insuficiente.
- **Pendientes:** recorrido humano final con lector de pantalla y teclado físico; no es sustituible por axe ni por Playwright.

## FASE 18 — Testing `[x] Finalizado`

- **Objetivo:** cubrir flujos críticos y regresiones.
- **Tareas:** tests frontend, API, auth y validadores.
- **Archivos creados / modificados:** tests de utilidades, rutas frontend, API, validadores, storage, SEO, ciclo de imágenes y `adminFlow.integration.test.js`; configuración de integración independiente.
- **Decisiones técnicas:** Vitest 5, Testing Library y Supertest; base Mongo con nombre único, eliminada al finalizar; integración opt-in para que la suite unitaria no dependa de un servicio externo.
- **Pruebas ejecutadas:** 16 tests unitarios (6 frontend y 10 backend) más 1 flujo de integración autenticado que crea taxonomías, sube imagen, crea/publica/edita/elimina el proyecto y verifica la limpieza física del upload.
- **Errores encontrados:** frontend solo tenía tests de formatters y el contrato singular de taxonomías estaba roto; ambos puntos quedaron cubiertos.
- **Pendientes:** ninguno para el alcance MVP.

## FASE 19 — Seguridad `[x] Finalizado`

- **Objetivo:** reducir superficie de ataque del MVP.
- **Tareas:** Helmet, rate limits, validación, cookies seguras, upload seguro y secretos.
- **Archivos creados / modificados:** configuración Express, auth, validadores y storage local.
- **Decisiones técnicas:** bcrypt factor 12, JWT corto HttpOnly/SameSite, emisor/audiencia, CORS explícito y límites de requests/uploads.
- **Pruebas ejecutadas:** endpoints protegidos, protocolos URL, firma binaria de upload y `npm audit` completo (0 vulnerabilidades).
- **Errores encontrados:** MIME confiaba solo en el encabezado y JWT no verificaba emisor/audiencia; corregido. Vitest 3 arrastraba una vulnerabilidad moderada en `@vitest/mocker`; actualizado y validado con Vitest 5.
- **Pendientes:** ninguno para el alcance MVP; rotar secretos en despliegue.

## FASE 20 — Optimización `[x] Finalizado`

- **Objetivo:** mejorar carga, bundles, imágenes y consultas.
- **Tareas:** lazy loading, índices, compresión de assets y análisis build.
- **Archivos creados / modificados:** derivados WebP en `frontend/public/`, Vite, seed y carga diferida de rutas en `App.jsx`.
- **Decisiones técnicas:** conservar intactos los assets legacy; publicar solo los seis medios usados por la app y separar chunks por página.
- **Pruebas ejecutadas:** inspección visual de derivados, build y análisis de tamaños.
- **Errores encontrados:** imágenes legacy sobredimensionadas.
- **Pendientes:** ninguno propio de esta fase. Build reducido de 14,86 MB a 1,11 MB; JS inicial de ~252 KB a ~211 KB.

## FASE 21 — Producción `[!] Bloqueado`

- **Objetivo:** preparar despliegue reproducible y operación segura.
- **Tareas:** variables, build, reverse proxy/hosting, Mongo administrado, backups y observabilidad.
- **Archivos creados / modificados:** pendientes.
- **Decisiones técnicas:** frontend estático y API Node desplegables por separado o como servicio único.
- **Pruebas ejecutadas:** pendientes.
- **Errores encontrados:** ninguno en el build; faltan decisiones externas para generar una configuración de despliegue concreta sin asumir infraestructura.
- **Pendientes:** definir proveedor/arquitectura de hosting, MongoDB administrado, dominio/proxy, almacenamiento persistente de uploads, secretos, política de backups y observabilidad.
