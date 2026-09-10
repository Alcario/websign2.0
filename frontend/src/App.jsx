import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingState from './components/common/States';

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const PortfolioPage = lazy(() => import('./pages/Portfolio/PortfolioPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetail/ProjectDetailPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const ProjectsPage = lazy(() => import('./pages/admin/ProjectsPage'));
const ProjectFormPage = lazy(() => import('./pages/admin/ProjectFormPage'));
const TaxonomyPage = lazy(() => import('./pages/admin/TaxonomyPage'));
const ContentPage = lazy(() => import('./pages/admin/ContentPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Suspense fallback={<div className="section container"><LoadingState /></div>}><Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Route>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/new" element={<ProjectFormPage />} />
          <Route path="projects/:id" element={<ProjectFormPage />} />
          <Route path="categories" element={<TaxonomyPage type="categories" />} />
          <Route path="technologies" element={<TaxonomyPage type="technologies" />} />
          <Route path="content" element={<ContentPage />} />
        </Route>
      </Route>
      <Route path="/inicio" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes></Suspense>
  );
}
