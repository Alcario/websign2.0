import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/#sistemas', label: 'Productos' },
  { to: '/#desarrollo-medida', label: 'Desarrollo a medida' },
  { to: '/portfolio', label: 'Proyectos' },
  { to: '/contacto', label: 'Contacto' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = (event) => event.matches && setOpen(false);
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="WebSign, inicio">
          <img src="/logo-websign.svg" alt="" width="42" height="32" />
          <span>WebSign</span>
        </Link>
        <nav id="primary-navigation" className={`primary-nav ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
          {links.map((link) => link.to.includes('#') ? (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ) : (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'is-active' : undefined}>{link.label}</NavLink>
          ))}
          <Link className="button button--primary nav-mobile-cta" to="/contacto">Hablemos</Link>
        </nav>
        <Link className="button button--primary nav-cta" to="/contacto">Hablemos <span aria-hidden="true">→</span></Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
