import { AlertCircle, Inbox } from 'lucide-react';

export default function LoadingState({ label = 'Cargando…' }) {
  return <div className="state-card state-card--loading" role="status"><span className="spinner" />{label}</div>;
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card" role="alert">
      <AlertCircle aria-hidden="true" />
      <p>{message}</p>
      {onRetry && <button className="button button--secondary button--small" onClick={onRetry}>Reintentar</button>}
    </div>
  );
}

export function EmptyState({ title = 'Todavía no hay contenido', description }) {
  return <div className="state-card"><Inbox aria-hidden="true" /><strong>{title}</strong>{description && <p>{description}</p>}</div>;
}
