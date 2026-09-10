import { ArrowDown, Braces, CheckCircle2, Gauge, Layers3 } from 'lucide-react';
export default function Hero({ content = {} }) {
  return (
    <section className="hero">
      <div className="hero-glow hero-glow--one" />
      <div className="hero-glow hero-glow--two" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Estudio de software · Córdoba, Argentina</p>
          <h1>{content.heroPrefix || 'Software que'} <span>{content.heroAccent || 'simplifica'}</span> {content.heroSuffix || 'tu negocio.'}</h1>
          <p className="hero-lead">{content.heroDescription || 'Sistemas listos para usar y desarrollo de software a medida para digitalizar y mejorar tus procesos.'}</p>
          <div className="hero-actions">
            <a className="button button--primary button--large" href="#sistemas">Ver nuestros sistemas <ArrowDown size={18} aria-hidden="true" /></a>
            <a className="button button--secondary button--large" href="#desarrollo-medida">Desarrollo a medida</a>
          </div>
          <p className="hero-note"><span /> 30 días gratis · Segundo mes 50% OFF</p>
        </div>
        <div className="software-preview" aria-label="Vista conceptual del panel WebSign">
          <div className="software-preview__bar"><div><i /><i /><i /><span>WebSign Suite</span></div><strong><span /> En línea</strong></div>
          <div className="preview-primary"><div><small>Gestión diaria</small><b>Operaciones al día</b></div><Gauge aria-hidden="true" /></div>
          <div className="preview-columns">
            <div><Layers3 aria-hidden="true" /><small>Inventario y turnos</small><b>Sincronizado</b></div>
            <div><Braces aria-hidden="true" /><small>Acceso multi-dispositivo</small><b>Tiempo real</b></div>
          </div>
          <div className="preview-status"><CheckCircle2 aria-hidden="true" /><span>Todo funciona desde la nube</span><b>100%</b></div>
        </div>
      </div>
    </section>
  );
}
