import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/"><img src="/logo-websign.svg" alt="" width="38" height="28" /><span>WebSign</span></Link>
          <p>Sistemas listos para usar y desarrollo de software a medida para organizaciones que quieren trabajar mejor.</p>
          <span>Córdoba, Argentina · Proyectos para todo el país</span>
        </div>
        <div>
          <h2>Explorar</h2>
          <Link to="/">Inicio</Link>
          <Link to="/portfolio">Proyectos</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div>
          <h2>Contacto</h2>
          <a href="mailto:contacto@websign.com.ar">contacto@websign.com.ar</a>
          <a href="https://wa.me/5493510000000" target="_blank" rel="noreferrer">WhatsApp</a>
          <Link to="/admin/login">Acceso administrador</Link>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} WebSign.</span><span>Software que simplifica.</span></div>
    </footer>
  );
}
