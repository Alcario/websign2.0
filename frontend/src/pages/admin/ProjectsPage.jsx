import { Edit3, Plus, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingState, { EmptyState, ErrorState } from '../../components/common/States';
import useFetch from '../../hooks/useFetch';
import { api } from '../../services/api';

export default function ProjectsPage() {
  const { data, loading, error, refetch } = useFetch(() => api.get('/admin/projects'));
  const projects = data?.projects || [];
  const [actionError, setActionError] = useState('');
  const toggle = async (project, field) => { setActionError(''); try { await api.patch(`/admin/projects/${project._id}/${field}`, { value: !project[field] }); await refetch(); } catch (currentError) { setActionError(currentError.message); } };
  const remove = async (project) => { if (!window.confirm(`¿Eliminar definitivamente “${project.title}”?`)) return; setActionError(''); try { await api.delete(`/admin/projects/${project._id}`); await refetch(); } catch (currentError) { setActionError(currentError.message); } };
  return <div className="admin-page"><div className="admin-heading"><div><span className="eyebrow">Portfolio</span><h1>Proyectos</h1><p>Creá, ordená y controlá qué se publica.</p></div><Link className="button button--primary" to="new"><Plus />Nuevo proyecto</Link></div>{actionError && <p className="form-status form-status--error" role="alert">{actionError}</p>}{loading && <LoadingState />}{error && <ErrorState message={error} onRetry={refetch} />}{!loading && !error && projects.length === 0 && <EmptyState title="No hay proyectos cargados" />}{projects.length > 0 && <div className="admin-table-wrap"><table className="admin-table admin-table--projects"><thead><tr><th>Orden</th><th>Proyecto</th><th>Categoría</th><th>Publicado</th><th>Destacado</th><th><span className="sr-only">Acciones</span></th></tr></thead><tbody>{projects.map((project) => <tr key={project._id}><td>{project.order}</td><td><strong>{project.title}</strong><small>/{project.slug}</small></td><td>{project.category?.name || '—'}</td><td><button className={`status-toggle ${project.published ? 'is-on' : ''}`} onClick={() => toggle(project, 'publish')}>{project.published ? 'Publicado' : 'Borrador'}</button></td><td><button className={`icon-action ${project.featured ? 'is-featured' : ''}`} onClick={() => toggle(project, 'feature')} aria-label={project.featured ? 'Quitar destacado' : 'Marcar destacado'}><Star fill={project.featured ? 'currentColor' : 'none'} /></button></td><td><div className="row-actions"><Link className="icon-action" to={project._id} aria-label={`Editar ${project.title}`}><Edit3 /></Link><button className="icon-action icon-action--danger" onClick={() => remove(project)} aria-label={`Eliminar ${project.title}`}><Trash2 /></button></div></td></tr>)}</tbody></table></div>}</div>;
}
