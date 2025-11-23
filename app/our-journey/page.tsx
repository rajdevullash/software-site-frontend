'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/api';
import { motion } from 'framer-motion';

interface Journey {
  _id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  position: 'left' | 'right';
  order: number;
}

const iconMap: Record<string, JSX.Element> = {
  location: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  people: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  building: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  diamond: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  circle: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function OurJourneyPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await api.get('/journey/active');
        if (response.data.success) {
          setJourneys(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch journeys:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJourneys();
  }, []);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || iconMap.circle;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm font-medium mb-6 border border-blue-400/30">
              Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Journey</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              From a small startup to a leading technology partner, discover the key moments that have shaped Innovatech Solutions.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Timeline */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading journey...</p>
          </div>
        ) : journeys.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No journey events found.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-16">
              {journeys.map((journey, index) => {
                const isLeft = journey.position === 'left' || (index % 2 === 0);
                const IconComponent = getIcon(journey.icon);

                return (
                  <motion.div
                    key={journey._id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isLeft ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-full md:w-5/12 ${
                        isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                      }`}
                    >
                      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className={`flex items-center gap-3 ${isLeft ? 'md:justify-end' : ''}`}>
                          <span className="text-sm font-semibold text-blue-600">{journey.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{journey.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{journey.description}</p>
                      </div>
                    </motion.div>

                    {/* Center Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex"
                    >
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full p-3 text-white shadow-lg">
                        {IconComponent}
                      </div>
                    </motion.div>

                    {/* Mobile Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      className="md:hidden mb-4"
                    >
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full p-3 text-white shadow-lg">
                        {IconComponent}
                      </div>
                    </motion.div>

                    {/* Spacer for alignment */}
                    <div className="w-full md:w-5/12"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

