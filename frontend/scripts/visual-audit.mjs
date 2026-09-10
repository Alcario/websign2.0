import { mkdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import axe from 'axe-core';
import { chromium } from 'playwright-core';

const url = process.argv[2] || 'http://localhost:5173/';
const executablePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.join(os.tmpdir(), 'websign-visual-audit');
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const results = [];
const allViewports = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-780', width: 780, height: 1000 },
  { name: 'desktop-1280', width: 1280, height: 1000 },
  { name: 'wide-2560', width: 2560, height: 1440 },
];
const viewports = process.env.AUDIT_VIEWPORT
  ? allViewports.filter(({ name }) => name === process.env.AUDIT_VIEWPORT)
  : allViewports;

const projects = [
  { _id: 'audit-1', title: 'Sistema de gestión', slug: 'sistema-gestion', shortDescription: 'Operaciones y datos centralizados para un negocio en crecimiento.', year: 2026, category: { _id: 'category-1', name: 'Sistemas' }, technologies: [{ _id: 'technology-1', name: 'React' }], coverImage: { url: '/portfolio/dataflow.webp' } },
  { _id: 'audit-2', title: 'Plataforma institucional', slug: 'plataforma-institucional', shortDescription: 'Una experiencia web clara para una comunidad educativa.', year: 2026, category: { _id: 'category-2', name: 'Plataformas' }, technologies: [{ _id: 'technology-2', name: 'Node.js' }], coverImage: { url: '/portfolio/horarios.webp' } },
  { _id: 'audit-3', title: 'Comercio digital', slug: 'comercio-digital', shortDescription: 'Catálogo y consultas comerciales desde cualquier dispositivo.', year: 2026, category: { _id: 'category-3', name: 'Web' }, technologies: [{ _id: 'technology-3', name: 'MongoDB' }], coverImage: { url: '/portfolio/rous-indumentaria.webp' } },
];

const collectPageHealth = (page) => page.evaluate(() => {
  const hasAccessibleName = (element) => Boolean(element.getAttribute('aria-label') || element.getAttribute('aria-labelledby') || element.getAttribute('title') || element.textContent.trim());
  const viewportWidth = document.documentElement.clientWidth;
  const initialScroll = { x: window.scrollX, y: window.scrollY };
  window.scrollTo({ left: document.documentElement.scrollWidth, top: initialScroll.y, behavior: 'instant' });
  const horizontalScrollRange = window.scrollX;
  window.scrollTo({ left: initialScroll.x, top: initialScroll.y, behavior: 'instant' });
  return {
    clientWidth: viewportWidth,
    scrollWidth: document.documentElement.scrollWidth,
    horizontalScrollRange,
    duplicateIds: [...document.querySelectorAll('[id]')].map((element) => element.id).filter((id, index, ids) => ids.indexOf(id) !== index),
    imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
    controlsWithoutLabel: [...document.querySelectorAll('input, select, textarea')].filter((element) => element.type !== 'hidden' && !element.labels?.length && !element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')).length,
    buttonsWithoutName: [...document.querySelectorAll('button')].filter((element) => !hasAccessibleName(element)).length,
    linksWithoutName: [...document.querySelectorAll('a:not([aria-hidden="true"])')].filter((element) => !hasAccessibleName(element) && !element.querySelector('img[alt]:not([alt=""])')).length,
    mainLandmarks: document.querySelectorAll('main').length,
    primaryHeadings: document.querySelectorAll('h1').length,
    language: document.documentElement.lang,
  };
});

const collectAccessibility = async (page) => {
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(async () => window.axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
  }));
  return result.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    targets: violation.nodes.map((node) => node.target.join(' ')),
  }));
};

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  await page.route('**/api/**', (route) => {
    const { pathname } = new URL(route.request().url());
    let data = {};
    if (pathname === '/api/auth/me') data = { user: { id: 'audit-user', name: 'Auditoría', email: 'audit@websign.test', role: 'admin' } };
    else if (pathname === '/api/content/home' || pathname === '/api/admin/content/home') data = { content: {} };
    else if (pathname === '/api/projects' || pathname === '/api/projects/featured' || pathname === '/api/admin/projects') data = { projects };
    else if (pathname === '/api/admin/projects/audit-1') data = { project: projects[0] };
    else if (pathname === '/api/projects/sistema-gestion') data = { project: { ...projects[0], client: 'Cliente de prueba', description: 'Una solución desarrollada para centralizar la operación.\nLa plataforma permite trabajar con información confiable.', websiteUrl: 'https://example.com', repositoryUrl: '', images: [{ _id: 'image-1', url: '/portfolio/dataflow.webp', alt: 'Panel principal' }, { _id: 'image-2', url: '/portfolio/horarios.webp', alt: 'Vista secundaria' }], metaTitle: '', metaDescription: '' } };
    else if (pathname === '/api/admin/dashboard') data = { stats: { projects: 3, featured: 3, categories: 3, technologies: 3 } };
    else if (pathname === '/api/categories' || pathname === '/api/admin/categories') data = { categories: projects.map((project) => project.category) };
    else if (pathname === '/api/technologies' || pathname === '/api/admin/technologies') data = { technologies: projects.flatMap((project) => project.technologies) };
    else if (pathname === '/api/contact') data = { success: true };
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data }) });
  });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const metrics = { ...await collectPageHealth(page), ...await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    visibleHeaderLogos: [...document.querySelectorAll('.site-header .brand img')].filter((element) => element.getBoundingClientRect().width > 0).length,
    visibleDesktopCtas: [...document.querySelectorAll('.nav-cta')].filter((element) => getComputedStyle(element).display !== 'none').length,
    visibleMenuButtons: [...document.querySelectorAll('.menu-button')].filter((element) => getComputedStyle(element).display !== 'none').length,
  })), accessibilityViolations: await collectAccessibility(page) };
  const screenshot = path.join(outputDir, `home-${viewport.name}.png`);
  await page.screenshot({ path: screenshot, fullPage: true });

  let mobileMenu = null;
  if (viewport.width < 768) {
    await page.locator('.menu-button').click();
    mobileMenu = await page.evaluate(() => ({
      expanded: document.querySelector('.menu-button')?.getAttribute('aria-expanded'),
      visibleNavigation: getComputedStyle(document.querySelector('.primary-nav')).display !== 'none',
      visibleCtas: [...document.querySelectorAll('.nav-mobile-cta')].filter((element) => getComputedStyle(element).display !== 'none').length,
    }));
  }

  const routeMetrics = {};
  for (const routePath of [
    '/portfolio',
    '/portfolio/sistema-gestion',
    '/contacto',
    '/admin',
    '/admin/projects',
    '/admin/projects/new',
    '/admin/projects/audit-1',
    '/admin/categories',
    '/admin/technologies',
    '/admin/content',
  ]) {
    await page.goto(new URL(routePath, url).href, { waitUntil: 'networkidle' });
    routeMetrics[routePath] = {
      ...await collectPageHealth(page),
      accessibilityViolations: await collectAccessibility(page),
    };
  }
  const adminScreenshot = path.join(outputDir, `admin-${viewport.name}.png`);
  await page.screenshot({ path: adminScreenshot, fullPage: true });
  let adminMenu = null;
  if (viewport.width < 1024) {
    await page.locator('.admin-topbar button').click();
    adminMenu = await page.evaluate(() => ({
      expanded: document.querySelector('.admin-topbar button')?.getAttribute('aria-expanded'),
      visibleNavigation: document.querySelector('.admin-sidebar')?.classList.contains('is-open'),
    }));
  }

  results.push({ viewport, metrics, mobileMenu, adminMenu, routeMetrics, screenshot, adminScreenshot });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));

const failures = [];
for (const result of results) {
  const { viewport, metrics, mobileMenu } = result;
  const isMobile = viewport.width < 768;
  if (metrics.horizontalScrollRange > 0) failures.push(`${viewport.name}: overflow horizontal desplazable ${metrics.horizontalScrollRange}px`);
  if (metrics.visibleHeaderLogos !== 1) failures.push(`${viewport.name}: se esperó un único logo visible`);
  if (metrics.visibleDesktopCtas !== (isMobile ? 0 : 1)) failures.push(`${viewport.name}: CTA desktop visible incorrecto`);
  if (metrics.visibleMenuButtons !== (isMobile ? 1 : 0)) failures.push(`${viewport.name}: botón de menú visible incorrecto`);
  if (metrics.duplicateIds.length) failures.push(`${viewport.name}: IDs duplicados (${metrics.duplicateIds.join(', ')})`);
  if (metrics.imagesWithoutAlt || metrics.controlsWithoutLabel || metrics.buttonsWithoutName || metrics.linksWithoutName) failures.push(`${viewport.name}: faltan nombres o alternativas accesibles`);
  if (metrics.brokenImages) failures.push(`${viewport.name}: hay ${metrics.brokenImages} imágenes rotas`);
  if (metrics.mainLandmarks !== 1 || metrics.primaryHeadings !== 1 || metrics.language !== 'es') failures.push(`${viewport.name}: estructura semántica principal incorrecta`);
  if (metrics.accessibilityViolations.length) failures.push(`${viewport.name}: axe detectó ${metrics.accessibilityViolations.map(({ id }) => id).join(', ')}`);
  if (isMobile && (mobileMenu?.expanded !== 'true' || !mobileMenu.visibleNavigation || mobileMenu.visibleCtas !== 1)) failures.push(`${viewport.name}: el menú mobile no abre correctamente`);
  if (viewport.width < 1024 && (result.adminMenu?.expanded !== 'true' || !result.adminMenu.visibleNavigation)) failures.push(`${viewport.name}: el menú administrativo no abre correctamente`);
  for (const [routePath, routeMetrics] of Object.entries(result.routeMetrics)) {
    if (routeMetrics.horizontalScrollRange > 0) failures.push(`${viewport.name} ${routePath}: overflow horizontal desplazable ${routeMetrics.horizontalScrollRange}px`);
    if (routeMetrics.duplicateIds.length) failures.push(`${viewport.name} ${routePath}: IDs duplicados (${routeMetrics.duplicateIds.join(', ')})`);
    if (routeMetrics.imagesWithoutAlt || routeMetrics.controlsWithoutLabel || routeMetrics.buttonsWithoutName || routeMetrics.linksWithoutName) failures.push(`${viewport.name} ${routePath}: faltan nombres o alternativas accesibles`);
    if (routeMetrics.brokenImages) failures.push(`${viewport.name} ${routePath}: hay ${routeMetrics.brokenImages} imágenes rotas`);
    if (routeMetrics.mainLandmarks !== 1 || routeMetrics.primaryHeadings !== 1 || routeMetrics.language !== 'es') failures.push(`${viewport.name} ${routePath}: estructura semántica principal incorrecta`);
    if (routeMetrics.accessibilityViolations.length) failures.push(`${viewport.name} ${routePath}: axe detectó ${routeMetrics.accessibilityViolations.map(({ id }) => id).join(', ')}`);
  }
}

if (failures.length) {
  console.error(`Auditoría visual fallida:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
}
