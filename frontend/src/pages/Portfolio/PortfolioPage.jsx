import { useMemo, useState } from 'react';
import Seo from '../../components/common/Seo';
import ProjectCard from '../../components/projects/ProjectCard';
import LoadingState, { EmptyState, ErrorState } from '../../components/common/States';
import useFetch from '../../hooks/useFetch';
import { api } from '../../services/api';

export default function PortfolioPage() {
  const { data, loading, error, refetch } = useFetch(() => api.get('/projects'));
  const [category, setCategory] = useState('');
  const projects = useMemo(() => data?.projects || [], [data]);
  const categories = useMemo(() => [...new Map(projects.filter((project) => project.category).map((project) => [project.category.slug, project.category])).values()], [projects]);
  const visibleProjects = category ? projects.filter((project) => project.category?.slug === category) : projects;

  return (
    <><Seo title="Portfolio" description="Proyectos de software, plataformas web y soluciones digitales desarrolladas por WebSign." />
      <div className="page-hero"><div className="container"><span className="eyebrow">Portfolio</span><h1>Software diseñado para resolver problemas reales.</h1><p>Explorá plataformas, sistemas de gestión y experiencias digitales creadas para cada operación.</p></div></div>
      <section className="section portfolio-page"><div className="container">
        {categories.length > 0 && <div className="filters" role="group" aria-label="Filtrar por categoría"><button className={!category ? 'is-active' : ''} onClick={() => setCategory('')}>Todos</button>{categories.map((item) => <button className={category === item.slug ? 'is-active' : ''} onClick={() => setCategory(item.slug)} key={item.slug}>{item.name}</button>)}</div>}
        {loading && <LoadingState label="Cargando portfolio…" />}{error && <ErrorState message={error} onRetry={refetch} />}{!loading && !error && visibleProjects.length === 0 && <EmptyState title="No hay proyectos publicados en esta categoría" />}
        {visibleProjects.length > 0 && <div className="projects-grid">{visibleProjects.map((project) => <ProjectCard project={project} key={project._id} />)}</div>}
      </div></section>
    </>
  );
}
