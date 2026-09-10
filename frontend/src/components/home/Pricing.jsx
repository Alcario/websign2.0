export default function Pricing() {
  return (
    <section className="section section--alternate" id="precios" aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-heading section-heading--center"><span className="eyebrow">Transparencia total</span><h2 id="pricing-title">Empezá sin riesgo. Sin letra chica.</h2><p>Probá el sistema con tu negocio antes de decidir.</p></div>
        <div className="pricing-grid">
          <article><span>Paso 1 · Mes 1</span><strong className="success-text">100% GRATIS</strong><p>Configuración y acompañamiento inicial sin compromiso.</p><small>Sin tarjeta requerida</small></article>
          <article><span>Paso 2 · Mes 2</span><strong className="accent-text">50% OFF</strong><p>Un segundo mes con descuento para consolidar el uso.</p><small>Descuento automático</small></article>
          <article><span>Paso 3 · En adelante</span><strong>Plan mensual</strong><p>Abono claro con actualizaciones y soporte continuo.</p><small>Sin permanencia</small></article>
        </div>
        <div className="center-action"><a className="button button--primary button--large" href="#contacto">Empezar prueba gratuita</a></div>
      </div>
    </section>
  );
}
