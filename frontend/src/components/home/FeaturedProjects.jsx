import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { api } from '../../services/api';
import ProjectCard from '../projects/ProjectCard';
import LoadingState, { EmptyState, ErrorState } from '../common/States';

export default function FeaturedProjects() {
  const { data, loading, error, refetch } = useFetch(() => api.get('/projects/featured'));
  const projects = data?.projects || [];

  return (
    <section className="section" id="proyectos-destacados" aria-labelledby="featured-title">
      <div className="container">
        <div className="section-heading section-heading--split"><div><span className="eyebrow">Trabajo real</span><h2 id="featured-title">Proyectos destacados</h2><p>Soluciones creadas para operaciones, equipos y desafíos concretos.</p></div><Link className="text-link" to="/portfolio">Ver portfolio completo <span aria-hidden="true">→</span></Link></div>
        {loading && <LoadingState label="Cargando proyectos destacados…" />}
        {error && <ErrorState message={error} onRetry={refetch} />}
        {!loading && !error && projects.length === 0 && <EmptyState title="Próximamente, nuevos proyectos" description="Los proyectos publicados y destacados desde administración aparecerán acá." />}
        {projects.length > 0 && <div className="projects-grid">{projects.slice(0, 3).map((project) => <ProjectCard project={project} key={project._id} />)}</div>}
      </div>
    </section>
  );
}
