import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl, yearLabel } from '../../utils/formatters';

export default function ProjectCard({ project }) {
  const image = getImageUrl(project.coverImage);
  return (
    <article className="project-card">
      <Link className="project-card__media" to={`/portfolio/${project.slug}`} tabIndex="-1" aria-hidden="true">
        {image ? <img src={image} alt="" loading="lazy" /> : <div className="project-card__placeholder">WS</div>}
      </Link>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="badge">{project.category?.name || 'Proyecto'}</span>
          <span>{yearLabel(project.year)}</span>
        </div>
        <h3><Link to={`/portfolio/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.shortDescription}</p>
        {project.technologies?.length > 0 && (
          <ul className="chip-list" aria-label="Tecnologías">
            {project.technologies.slice(0, 4).map((technology) => <li key={technology._id || technology.slug}>{technology.name}</li>)}
          </ul>
        )}
        <Link className="text-link" to={`/portfolio/${project.slug}`}>Ver proyecto <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
