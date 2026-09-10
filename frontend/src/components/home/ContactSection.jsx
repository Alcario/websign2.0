import { useState } from 'react';
import { CheckCircle2, Clock3, LockKeyhole, Send } from 'lucide-react';
import { api } from '../../services/api';

const initialForm = { type: 'saas', solution: 'LuWeb', name: '', email: '', phone: '', message: '' };

export default function ContactSection({ compact = false }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });

  const update = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Enviando consulta…' });
    try {
      await api.post('/contact', form);
      setStatus({ type: 'success', message: 'Recibimos tu consulta. Te responderemos dentro de las próximas 24 horas hábiles.' });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <section className={`section contact-section ${compact ? 'contact-section--compact' : ''}`} id="contacto" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy"><span className="eyebrow">Atención directa</span><h2 id="contact-title">Activá tu sistema o cotizá tu proyecto</h2><p>Contanos qué necesitás. Evaluamos tu consulta y te respondemos de forma personal.</p><ul><li><Clock3 /><span><strong>Respuesta en menos de 24 horas</strong><small>Sin bots ni respuestas genéricas.</small></span></li><li><CheckCircle2 /><span><strong>Asesoría inicial sin costo</strong><small>Revisamos el contexto antes de proponer.</small></span></li><li><LockKeyhole /><span><strong>Información resguardada</strong><small>Tus procesos e ideas se mantienen confidenciales.</small></span></li></ul></div>
        <form className="contact-form" onSubmit={submit}>
          <fieldset><legend>Tipo de solución</legend><div className="choice-grid"><label><input type="radio" name="type" value="saas" checked={form.type === 'saas'} onChange={update} />Sistema listo</label><label><input type="radio" name="type" value="custom" checked={form.type === 'custom'} onChange={update} />Desarrollo a medida</label></div></fieldset>
          {form.type === 'saas' && <label>Producto<select name="solution" value={form.solution} onChange={update}><option>LuWeb</option><option>TiWeb</option><option>WeddingManager</option><option>Invitación Digital</option></select></label>}
          <div className="form-row"><label>Nombre completo<input name="name" value={form.name} onChange={update} autoComplete="name" required /></label><label>Email<input type="email" name="email" value={form.email} onChange={update} autoComplete="email" required /></label></div>
          <label>Teléfono / WhatsApp<input type="tel" name="phone" value={form.phone} onChange={update} autoComplete="tel" required /></label>
          <label>¿Cómo podemos ayudarte?<textarea name="message" value={form.message} onChange={update} rows="4" maxLength="2000" /></label>
          <button className="button button--primary button--large" disabled={status.type === 'loading'}>{status.type === 'loading' ? 'Enviando…' : 'Enviar consulta'} <Send size={18} aria-hidden="true" /></button>
          {status.message && <p className={`form-status form-status--${status.type}`} role="status">{status.message}</p>}
          <small className="form-privacy"><LockKeyhole size={13} /> Tus datos se usan únicamente para responderte.</small>
        </form>
      </div>
    </section>
  );
}
