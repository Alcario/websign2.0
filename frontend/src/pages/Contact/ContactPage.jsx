import Seo from '../../components/common/Seo';
import ContactSection from '../../components/home/ContactSection';

export default function ContactPage() {
  return <><Seo title="Contacto" description="Contanos qué necesita tu organización y evaluamos la mejor solución." /><div className="page-hero"><div className="container"><span className="eyebrow">Hablemos</span><h1>Tu próximo sistema empieza con una conversación clara.</h1></div></div><ContactSection compact /></>;
}
