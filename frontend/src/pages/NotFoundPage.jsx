import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';

export default function NotFoundPage() {
  return <div className="not-found"><Seo title="Página no encontrada" noIndex /><span>404</span><h1>Esta página no existe.</h1><p>Volvé al inicio o explorá nuestros proyectos.</p><div><Link className="button button--primary" to="/">Ir al inicio</Link><Link className="button button--secondary" to="/portfolio">Ver proyectos</Link></div></div>;
}
