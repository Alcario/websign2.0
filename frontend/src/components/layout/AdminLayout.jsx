import { FolderKanban, Gauge, Layers3, LogOut, Menu, Settings2, Tags, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Seo from '../common/Seo';

const items = [
  ['.', 'Resumen', Gauge],
  ['projects', 'Proyectos', FolderKanban],
  ['categories', 'Categorías', Tags],
  ['technologies', 'Tecnologías', Layers3],
  ['content', 'Textos del sitio', Settings2],
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => { await logout(); navigate('/admin/login'); };
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = (event) => event.matches && setOpen(false);
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <div className="admin-shell">
      <Seo title="Administración" noIndex />
      <aside id="admin-navigation" className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <Link className="brand" to="/admin"><img src="/logo-websign.svg" alt="" width="40" height="30" /><span>WebSign</span><small>ADMIN</small></Link>
        <nav aria-label="Administración">{items.map(([to, label, Icon]) => <NavLink to={to} end={to === '.'} onClick={() => setOpen(false)} key={to}><Icon aria-hidden="true" />{label}</NavLink>)}</nav>
        <div className="admin-user"><span><strong>{user?.name}</strong><small>{user?.email}</small></span><button aria-label="Cerrar sesión" onClick={handleLogout}><LogOut /></button></div>
      </aside>
      <div className="admin-main"><header className="admin-topbar"><button aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'} aria-expanded={open} aria-controls="admin-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><Link to="/" target="_blank">Ver sitio público ↗</Link></header><main><Outlet /></main></div>
    </div>
  );
}
