import { FolderKanban, Layers3, Star, Tags } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingState, { ErrorState } from '../../components/common/States';
import useFetch from '../../hooks/useFetch';
import { api } from '../../services/api';

export default function DashboardPage() {
  const { data, loading, error, refetch } = useFetch(() => api.get('/admin/dashboard'));
  const stats = data?.stats || {};
  return <div className="admin-page"><div className="admin-heading"><div><span className="eyebrow">Administración</span><h1>Resumen general</h1><p>Estado actual del contenido público.</p></div><Link className="button button--primary" to="projects/new">Nuevo proyecto</Link></div>{loading && <LoadingState />}{error && <ErrorState message={error} onRetry={refetch} />}{!loading && !error && <div className="stats-grid"><article><FolderKanban /><span>Proyectos</span><strong>{stats.projects || 0}</strong></article><article><Star /><span>Destacados</span><strong>{stats.featured || 0}</strong></article><article><Tags /><span>Categorías</span><strong>{stats.categories || 0}</strong></article><article><Layers3 /><span>Tecnologías</span><strong>{stats.technologies || 0}</strong></article></div>}</div>;
}
