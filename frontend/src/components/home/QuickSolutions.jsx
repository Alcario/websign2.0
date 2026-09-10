import { Car, ChevronRight, Code2, Heart, MailCheck, Store } from 'lucide-react';

const options = [
  { title: 'LuWeb', subtitle: 'Lubricentros', href: '#luweb', Icon: Car, tone: 'purple' },
  { title: 'TiWeb', subtitle: 'Comercios y negocios', href: '#tiweb', Icon: Store, tone: 'pink' },
  { title: 'WeddingManager', subtitle: 'Bodas y eventos', href: '#weddingmanager', Icon: Heart, tone: 'purple' },
  { title: 'Invitación Digital', subtitle: 'Invitaciones y RSVP', href: '#invitaciones', Icon: MailCheck, tone: 'blue' },
  { title: 'Software a medida', subtitle: 'Proyectos personalizados y ERP', href: '#desarrollo-medida', Icon: Code2, tone: 'purple', wide: true },
];

export default function QuickSolutions() {
  return (
    <section className="section section--compact section--alternate" aria-labelledby="quick-title">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Navegación rápida</span>
          <h2 id="quick-title">¿Qué necesitás resolver?</h2>
          <p>Elegí la opción que mejor represente tu actividad.</p>
        </div>
        <div className="quick-grid">
          {options.map(({ title, subtitle, href, Icon, tone, wide }) => (
            <a key={title} className={`quick-card ${wide ? 'quick-card--wide' : ''}`} href={href}>
              <span className={`icon-box icon-box--${tone}`}><Icon aria-hidden="true" /></span>
              <span><strong>{title}</strong><small>{subtitle}</small></span>
              <ChevronRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
