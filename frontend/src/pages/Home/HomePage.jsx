import { useEffect, useState } from 'react';
import Seo from '../../components/common/Seo';
import Hero from '../../components/home/Hero';
import QuickSolutions from '../../components/home/QuickSolutions';
import Products from '../../components/home/Products';
import Pricing from '../../components/home/Pricing';
import CustomDevelopment from '../../components/home/CustomDevelopment';
import FeaturedProjects from '../../components/home/FeaturedProjects';
import WhyWebsign from '../../components/home/WhyWebsign';
import ContactSection from '../../components/home/ContactSection';
import { api } from '../../services/api';

export default function HomePage() {
  const [content, setContent] = useState({});
  useEffect(() => { api.get('/content/home').then((data) => setContent(data.content || {})).catch(() => {}); }, []);
  return <><Seo description="Sistemas listos para usar y desarrollo de software a medida para digitalizar y mejorar tus procesos." /><Hero content={content} /><QuickSolutions /><Products /><Pricing /><CustomDevelopment /><FeaturedProjects /><WhyWebsign /><ContactSection /></>;
}
