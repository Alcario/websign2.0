import { Headphones, Handshake, Terminal, Wrench } from 'lucide-react';

const reasons = [
  [Wrench, 'Software para negocios reales', 'Funciones enfocadas en problemas operativos concretos.'],
  [Terminal, 'Código limpio y escalable', 'Tecnología moderna, rápida y preparada para evolucionar.'],
  [Handshake, 'Acompañamiento personal', 'Implementación y capacitación directa para tu equipo.'],
  [Headphones, 'Soporte continuo', 'Contacto humano, cercano y sin intermediarios innecesarios.'],
];

export default function WhyWebsign() {
  return <section className="section section--alternate" aria-labelledby="why-title"><div className="container"><div className="section-heading section-heading--center"><span className="eyebrow">Nuestra propuesta</span><h2 id="why-title">¿Por qué elegir WebSign?</h2><p>Ingeniería práctica y cercana para simplificar tu negocio.</p></div><div className="reasons-grid">{reasons.map(([Icon, title, text]) => <article key={title}><span className="icon-box icon-box--purple"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
