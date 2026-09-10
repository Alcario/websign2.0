import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Seo from '../../components/common/Seo';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });
  const location = useLocation();
  const navigate = useNavigate();
  if (!loading && user) return <Navigate to="/admin" replace />;
  const submit = async (event) => { event.preventDefault(); setStatus({ loading: true, error: '' }); try { await login(form); navigate(location.state?.from || '/admin', { replace: true }); } catch (error) { setStatus({ loading: false, error: error.message }); } };
  return <main className="login-page"><Seo title="Administración" noIndex /><div className="login-card"><div className="brand"><img src="/logo-websign.svg" alt="" width="42" height="32" /><span>WebSign</span></div><span className="eyebrow">Panel administrativo</span><h1>Bienvenido de nuevo</h1><p>Ingresá con tu cuenta de administración.</p><form onSubmit={submit}><label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="username" required /></label><label>Contraseña<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" minLength="10" required /></label>{status.error && <p className="form-status form-status--error" role="alert">{status.error}</p>}<button className="button button--primary button--large" disabled={status.loading}>{status.loading ? 'Ingresando…' : 'Ingresar'}</button></form><a href="/">← Volver al sitio</a></div></main>;
}
