import Project from '../models/Project.js';
import { env } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const escapeXml = (value) => String(value).replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]);
const entry = (path, lastModified) => `<url><loc>${escapeXml(`${env.siteUrl}${path}`)}</loc>${lastModified ? `<lastmod>${new Date(lastModified).toISOString()}</lastmod>` : ''}</url>`;

export const sitemap = asyncHandler(async (_request, response) => {
  const projects = await Project.find({ published: true }).select('slug updatedAt').sort({ updatedAt: -1 }).lean();
  const urls = [entry('/'), entry('/portfolio'), entry('/contacto'), ...projects.map((project) => entry(`/portfolio/${project.slug}`, project.updatedAt))];
  response.type('application/xml').set('Cache-Control', 'public, max-age=3600').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`);
});

export const robots = (_request, response) => response.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${env.siteUrl}/sitemap.xml\n`);
