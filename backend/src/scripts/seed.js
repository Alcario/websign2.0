import { connectDatabase, disconnectDatabase } from '../config/database.js';
import Category from '../models/Category.js';
import Project from '../models/Project.js';
import SiteContent from '../models/SiteContent.js';
import Technology from '../models/Technology.js';
import { slugify } from '../utils/slugify.js';

const categories = ['Sistemas de gestión', 'Ecommerce', 'Aplicaciones web', 'Educación', 'Automatización', 'IoT'];
const technologies = ['React', 'Node.js', 'MongoDB', 'WordPress', 'JavaScript', 'Python', 'Arduino'];

const projects = [
  { title: 'Rous Pastelería', client: 'Rous Pastelería', shortDescription: 'Sistema de gestión para controlar insumos, costos, clientes y operaciones.', description: 'El negocio necesitaba conocer el costo real de cada producto y centralizar información que estaba dispersa.\nConstruimos un sistema de gestión adaptado a su operación diaria, con trazabilidad de insumos, gastos y clientes.', category: 'Sistemas de gestión', technologies: ['React', 'Node.js', 'MongoDB'], cover: '/portfolio/lemon-pies.webp', year: 2025, featured: true, order: 1 },
  { title: 'Colegio Mark Twain', client: 'Colegio Mark Twain', shortDescription: 'Plataforma web para administrar restricciones y generar horarios escolares.', description: 'La generación manual de horarios involucraba cursos, docentes, espacios y múltiples restricciones.\nLa plataforma reúne estas variables y automatiza gran parte del proceso académico.', category: 'Educación', technologies: ['React', 'Node.js', 'MongoDB', 'Python'], cover: '/portfolio/horarios.webp', year: 2025, featured: true, order: 2 },
  { title: 'Orquesta Mediterránea', client: 'Orquesta Mediterránea de Córdoba', shortDescription: 'Gestión centralizada de alumnos, docentes, instrumentos y comodatos.', description: 'La organización necesitaba reducir la dispersión de datos y seguir su actividad cotidiana con claridad.\nCreamos una plataforma integral para ordenar la administración institucional.', category: 'Sistemas de gestión', technologies: ['React', 'Node.js', 'MongoDB'], cover: '/portfolio/orquesta-mediterranea.webp', year: 2024, featured: true, order: 3 },
  { title: 'TVM Group', client: 'TVM Group', shortDescription: 'ERP a medida para centralizar procesos de múltiples compañías.', description: 'Un sistema modular preparado para acompañar el crecimiento operativo del grupo y consolidar información clave.', category: 'Sistemas de gestión', technologies: ['React', 'Node.js', 'MongoDB'], cover: '/portfolio/tvm-alquileres.webp', year: 2026, featured: false, order: 4 },
  { title: 'Rous Indumentaria', client: 'Rous Indumentaria', shortDescription: 'Tienda online con catálogo y experiencia de compra administrable.', description: 'Desarrollo de presencia comercial y catálogo digital para facilitar el descubrimiento de productos y las consultas.', category: 'Ecommerce', technologies: ['WordPress', 'JavaScript'], cover: '/portfolio/rous-indumentaria.webp', year: 2024, featured: false, order: 5 },
  { title: 'DataFlow', client: 'Producto WebSign', shortDescription: 'Visualización y análisis de información operativa para tomar mejores decisiones.', description: 'Producto orientado a convertir datos dispersos en tableros claros, métricas accionables y seguimiento periódico.', category: 'Aplicaciones web', technologies: ['React', 'Node.js', 'MongoDB'], cover: '/portfolio/dataflow.webp', year: 2026, featured: false, order: 6 },
];

async function upsertNamed(Model, names) {
  const records = [];
  for (const [index, name] of names.entries()) records.push(await Model.findOneAndUpdate({ slug: slugify(name) }, { name, slug: slugify(name), active: true, order: index }, { upsert: true, new: true }));
  return records;
}

async function run() {
  await connectDatabase();
  const categoryRecords = await upsertNamed(Category, categories);
  const technologyRecords = await upsertNamed(Technology, technologies);
  const categoryMap = new Map(categoryRecords.map((item) => [item.name, item._id]));
  const technologyMap = new Map(technologyRecords.map((item) => [item.name, item._id]));
  for (const item of projects) {
    const slug = slugify(item.title);
    await Project.findOneAndUpdate({ slug }, { title: item.title, slug, client: item.client, shortDescription: item.shortDescription, description: item.description, category: categoryMap.get(item.category), technologies: item.technologies.map((name) => technologyMap.get(name)), coverImage: { url: item.cover, alt: `Vista del proyecto ${item.title}`, order: 0 }, images: [], year: item.year, websiteUrl: '', repositoryUrl: '', featured: item.featured, published: true, order: item.order, metaTitle: item.title, metaDescription: item.shortDescription }, { upsert: true, new: true, runValidators: true });
  }
  await SiteContent.findOneAndUpdate({ key: 'home' }, { content: { heroPrefix: 'Software que', heroAccent: 'simplifica', heroSuffix: 'tu negocio.', heroDescription: 'Sistemas listos para usar y desarrollo de software a medida para digitalizar y mejorar tus procesos.' } }, { upsert: true });
  console.log(`Seed listo: ${projects.length} proyectos, ${categories.length} categorías y ${technologies.length} tecnologías.`);
  await disconnectDatabase();
}

run().catch(async (error) => { console.error(error); await disconnectDatabase().catch(() => {}); process.exit(1); });
