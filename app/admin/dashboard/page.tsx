'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import api from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    hero: 0,
    services: 0,
    testimonials: 0,
    companies: 0,
    caseStudies: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [heroRes, servicesRes, testimonialsRes, companiesRes, caseStudiesRes] = await Promise.all([
          api.get('/hero'),
          api.get('/services'),
          api.get('/testimonials'),
          api.get('/companies'),
          api.get('/case-studies'),
        ]);

        setStats({
          hero: heroRes.data.data?.length || 0,
          services: servicesRes.data.data?.length || 0,
          testimonials: testimonialsRes.data.data?.length || 0,
          companies: companiesRes.data.data?.length || 0,
          caseStudies: caseStudiesRes.data.data?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Hero Sections', value: stats.hero, color: 'bg-blue-500' },
    { name: 'Services', value: stats.services, color: 'bg-green-500' },
    { name: 'Testimonials', value: stats.testimonials, color: 'bg-yellow-500' },
    { name: 'Companies', value: stats.companies, color: 'bg-purple-500' },
    { name: 'Case Studies', value: stats.caseStudies, color: 'bg-red-500' },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat) => (
              <div
                key={stat.name}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl font-bold">{stat.value}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{stat.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

