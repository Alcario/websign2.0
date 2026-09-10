import { Helmet } from 'react-helmet-async';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://websign.com.ar').replace(/\/$/, '');
const absoluteUrl = (value) => value ? new URL(value, `${siteUrl}/`).href : '';

export default function Seo({ title, description, image, canonical, type = 'website', noIndex = false }) {
  const fullTitle = title ? `${title} | WebSign` : 'WebSign | Software que simplifica tu negocio';
  const metaDescription = description || 'Sistemas web y desarrollo de software a medida para simplificar tu negocio.';
  const canonicalUrl = absoluteUrl(canonical || (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const socialImage = absoluteUrl(image || '/logo-websign.png');
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:site_name" content="WebSign" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={socialImage} />
      {!noIndex && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}
