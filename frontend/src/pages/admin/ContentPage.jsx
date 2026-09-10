import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingState from '../../components/common/States';
import { api } from '../../services/api';

const defaults = { heroPrefix: 'Software que', heroAccent: 'simplifica', heroSuffix: 'tu negocio.', heroDescription: 'Sistemas listos para usar y desarrollo de software a medida para digitalizar y mejorar tus procesos.' };

export default function ContentPage() {
  const [form, setForm] = useState(defaults);
  const [status, setStatus] = useState({ loading: true, saving: false, message: '', error: '' });
  useEffect(() => { api.get('/admin/content/home').then((data) => setForm({ ...defaults, ...data.content })).catch((error) => setStatus((current) => ({ ...current, error: error.message }))).finally(() => setStatus((current) => ({ ...current, loading: false }))); }, []);
  const submit = async (event) => { event.preventDefault(); setStatus({ loading: false, saving: true, message: '', error: '' }); try { await api.put('/admin/content/home', { content: form }); setStatus({ loading: false, saving: false, message: 'Textos actualizados.', error: '' }); } catch (error) { setStatus({ loading: false, saving: false, message: '', error: error.message }); } };
  if (status.loading) return <div className="admin-page"><LoadingState /></div>;
  return <div className="admin-page"><div className="admin-heading"><div><span className="eyebrow">Contenido</span><h1>Textos del sitio</h1><p>Editá los mensajes principales sin modificar React.</p></div></div><form className="admin-form" onSubmit={submit}><section><h2>Hero de la Home</h2><div className="form-grid"><label>Inicio del título<input value={form.heroPrefix} onChange={(event) => setForm({ ...form, heroPrefix: event.target.value })} required /></label><label>Palabra destacada<input value={form.heroAccent} onChange={(event) => setForm({ ...form, heroAccent: event.target.value })} required /></label><label>Final del título<input value={form.heroSuffix} onChange={(event) => setForm({ ...form, heroSuffix: event.target.value })} required /></label><label className="form-grid__full">Descripción<textarea value={form.heroDescription} onChange={(event) => setForm({ ...form, heroDescription: event.target.value })} rows="3" required /></label></div></section>{status.error && <p className="form-status form-status--error" role="alert">{status.error}</p>}{status.message && <p className="form-status form-status--success" role="status">{status.message}</p>}<button className="button button--primary button--large" disabled={status.saving}><Save />{status.saving ? 'Guardando…' : 'Guardar textos'}</button></form></div>;
}
