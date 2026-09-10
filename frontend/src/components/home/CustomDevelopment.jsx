import { Check, MessageCircle, MoveRight } from 'lucide-react';

export default function CustomDevelopment() {
  return (
    <section className="section custom-section" id="desarrollo-medida" aria-labelledby="custom-development-title">
      <div className="container">
        <div className="custom-card">
          <div className="custom-card__copy">
            <span className="eyebrow">Desarrollo exclusivo</span>
            <h2 id="custom-development-title">
              <span className="custom-copy--desktop">Desarrollo de Software a Medida</span>
              <span className="custom-copy--mobile">¿Necesitás software a medida?</span>
            </h2>
            <p>
              <span className="custom-copy--desktop">Si tu empresa tiene procesos particulares o requerimientos únicos, diseñamos y construimos sistemas exclusivos desde cero.</span>
              <span className="custom-copy--mobile">Desarrollamos soluciones personalizadas: ERPs, sistemas de facturación AFIP, plataformas cloud y portales empresariales.</span>
            </p>
            <ul><li><Check aria-hidden="true" />ERP &amp; Gestión a medida</li><li><Check aria-hidden="true" />Integración de APIs &amp; Pagos</li><li><Check aria-hidden="true" />Código 100% propietario</li></ul>
          </div>
          <a className="button button--primary button--large custom-card__desktop-cta" href="#contacto">Consultar por desarrollo a medida <MoveRight aria-hidden="true" /></a>
          <div className="custom-card__mobile-actions">
            <a className="button custom-card__whatsapp" href="https://wa.me/5493510000000" target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" />Consultar por WhatsApp</a>
            <a className="button button--secondary" href="#contacto">Enviar formulario</a>
          </div>
        </div>
      </div>
    </section>
  );
}
