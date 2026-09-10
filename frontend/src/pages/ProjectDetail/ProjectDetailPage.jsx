import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../../components/common/Seo';
import LoadingState, { ErrorState } from '../../components/common/States';
import useFetch from '../../hooks/useFetch';
import { api } from '../../services/api';
import { getImageUrl, yearLabel } from '../../utils/formatters';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data, loading, error, refetch } = useFetch(() => api.get(`/projects/${slug}`), [slug]);
  const project = data?.project;
  if (loading) return <div className="section container"><LoadingState label="Cargando proyecto…" /></div>;
  if (error || !project) return <div className="section container"><ErrorState message={error || 'Proyecto no encontrado.'} onRetry={refetch} /></div>;
  const cover = getImageUrl(project.coverImage);

  return (
    <article className="project-detail">
      <Seo title={project.metaTitle || project.title} description={project.metaDescription || project.shortDescription} image={cover} type="article" />
      <header className="project-detail__hero"><div className="container"><Link className="text-link" to="/portfolio"><ArrowLeft size={16} />Volver al portfolio</Link><div className="project-detail__heading"><div><span className="eyebrow">{project.category?.name || 'Proyecto'}</span><h1>{project.title}</h1><p>{project.shortDescription}</p></div><dl><div><dt>Cliente</dt><dd>{project.client || 'Confidencial'}</dd></div><div><dt>Año</dt><dd>{yearLabel(project.year)}</dd></div></dl></div></div></header>
      {cover && <div className="container"><div className="project-cover"><img src={cover} alt={`Portada del proyecto ${project.title}`} /></div></div>}
      <div className="container project-detail__content"><div className="rich-copy"><span className="eyebrow">El proyecto</span><h2>Una solución construida para su contexto.</h2>{project.description.split('\n').filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><aside><h2>Tecnologías</h2><ul className="chip-list">{project.technologies?.map((item) => <li key={item._id}>{item.name}</li>)}</ul><div className="project-links">{project.websiteUrl && <a className="button button--primary" href={project.websiteUrl} target="_blank" rel="noreferrer">Visitar proyecto <ExternalLink size={17} /></a>}{project.repositoryUrl && <a className="button button--secondary" href={project.repositoryUrl} target="_blank" rel="noreferrer">Repositorio <Github size={17} /></a>}</div></aside></div>
      {project.images?.length > 0 && <section className="container project-gallery" aria-labelledby="gallery-title"><div className="section-heading"><span className="eyebrow">Galería</span><h2 id="gallery-title">Detalles de la solución</h2></div><div>{project.images.map((image, index) => <figure key={image._id || image.url}><img src={getImageUrl(image)} alt={image.alt || `${project.title}, captura ${index + 1}`} loading="lazy" /></figure>)}</div></section>}
    </article>
  );
}
