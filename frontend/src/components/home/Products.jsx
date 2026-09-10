import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Fuel,
  Heart,
  MailCheck,
  Store,
} from 'lucide-react';

const products = [
  {
    id: 'luweb',
    name: 'LuWeb',
    category: 'Lubricentros',
    badge: 'Lubricentros',
    mobileBadge: '1 MES GRATIS',
    description: 'Gestión simple para lubricentros y talleres automotores.',
    Icon: Fuel,
    tone: 'purple',
    benefits: ['Clientes y vehículos centralizados', 'Historial de servicios y cambios', 'Acceso y sticker QR para parabrisas'],
    priceUnit: '/ mes',
    cta: 'Probar LuWeb',
  },
  {
    id: 'tiweb',
    name: 'TiWeb',
    category: 'Comercios',
    badge: 'Comercio',
    mobileBadge: '1 MES GRATIS',
    description: 'Control integral para comercios, ventas y administración.',
    Icon: Store,
    tone: 'pink',
    benefits: ['Control ágil de stock y ventas', 'Cuentas corrientes y proveedores', 'Reportes claros de caja diaria'],
    priceUnit: '/ mes',
    cta: 'Probar TiWeb',
  },
  {
    id: 'weddingmanager',
    name: 'WeddingManager',
    category: 'Bodas',
    badge: 'Boda',
    mobileBadge: 'PLANNING',
    description: 'Planificación económica y presupuesto para casamientos.',
    Icon: Heart,
    tone: 'rose',
    benefits: ['Gestión integral de proveedores', 'Control y comparación de presupuestos', 'Seguimiento de gastos y pagos'],
    priceUnit: '/ mes',
    cta: 'Probar WeddingManager',
  },
  {
    id: 'invitaciones',
    name: 'Invitación Digital',
    category: 'Eventos',
    badge: 'Eventos',
    mobileBadge: 'EN VIVO',
    description: 'Gestión interactiva de eventos, confirmaciones automáticas y recepción de regalos.',
    Icon: MailCheck,
    tone: 'event',
    benefits: ['Invitación web interactiva', 'Confirmación de asistencia RSVP', 'Gestión de mesas y regalos'],
    priceUnit: '/ evento',
    cta: 'Crear invitación',
  },
];

function ProductCard({ product }) {
  const { id, name, category, badge, mobileBadge, description, Icon, tone, benefits, priceUnit, cta } = product;

  return (
    <article className={`product-card product-card--${tone}`} id={id}>
      <div className="product-card__head">
        <span className="product-card__icon" aria-hidden="true"><Icon /></span>
        <div className="product-card__identity"><h3>{name}</h3><span>{category}</span></div>
        <span className="product-card__badge product-card__badge--desktop">{badge}</span>
        <span className="product-card__badge product-card__badge--mobile">{mobileBadge}</span>
      </div>
      <p className="product-card__description">{description}</p>
      <ul>
        {benefits.map((benefit) => <li key={benefit}><CheckCircle2 aria-hidden="true" /><span>{benefit}</span></li>)}
      </ul>
      <div className="product-card__footer">
        <div className="product-card__price"><span>Precio</span><strong>Desde $30.000 <small>{priceUnit}</small></strong></div>
        <a className="product-card__cta" href="#contacto">
          <span>{cta}</span>
          <ArrowRight className="product-card__arrow product-card__arrow--desktop" aria-hidden="true" />
          <ChevronRight className="product-card__arrow product-card__arrow--mobile" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <section className="section products-section" id="sistemas" aria-labelledby="products-title">
      <div className="container">
        <div className="products-heading">
          <span className="eyebrow">Soluciones WebSign</span>
          <h2 id="products-title">Soluciones pensadas para cada necesidad</h2>
          <p>Elegí la herramienta que mejor se adapte a tu actividad.</p>
        </div>
        <div className="products-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
}
