import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import HeroManager from '../components/admin/HeroManager';
import StatsManager from '../components/admin/StatsManager';
import ServicesManager from '../components/admin/ServicesManager';
import AboutManager from '../components/admin/AboutManager';
import PortfolioManager from '../components/admin/PortfolioManager';
import TechStackManager from '../components/admin/TechStackManager';
import TeamManager from '../components/admin/TeamManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';
import MessagesManager from '../components/admin/MessagesManager';
import SettingsManager from '../components/admin/SettingsManager';
import BlogManager from '../components/admin/BlogManager';

const AdminPage = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="hero" element={<HeroManager />} />
        <Route path="stats" element={<StatsManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="about" element={<AboutManager />} />
        <Route path="portfolio" element={<PortfolioManager />} />
        <Route path="techstack" element={<TechStackManager />} />
        <Route path="team" element={<TeamManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="messages" element={<MessagesManager />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="settings" element={<SettingsManager />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPage;
