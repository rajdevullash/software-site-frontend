'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  iconUrl: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services/active');
        if (response.data.success) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getServiceImage = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('custom') || titleLower.includes('software')) {
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop';
    } else if (titleLower.includes('web') || titleLower.includes('app')) {
      return 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop';
    } else if (titleLower.includes('cloud')) {
      return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop';
    } else if (titleLower.includes('data') || titleLower.includes('analytics')) {
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop';
    } else if (titleLower.includes('consulting') || titleLower.includes('strategy')) {
      return 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop';
  };

  const getServiceFeatures = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('custom') || titleLower.includes('software')) {
      return [
        'Tailored solutions for your unique needs',
        'Scalable architecture design',
        'Agile development methodology',
        'Quality assurance & testing',
        'Ongoing support & maintenance'
      ];
    } else if (titleLower.includes('web') || titleLower.includes('app')) {
      return [
        'Responsive design for all devices',
        'Modern UI/UX implementation',
        'Performance optimization',
        'SEO-friendly architecture',
        'Cross-browser compatibility'
      ];
    } else if (titleLower.includes('cloud')) {
      return [
        'Cloud migration strategy',
        'Infrastructure optimization',
        'Security & compliance',
        'Cost-effective solutions',
        '24/7 monitoring & support'
      ];
    } else if (titleLower.includes('data') || titleLower.includes('analytics')) {
      return [
        'Data collection & integration',
        'Advanced analytics & insights',
        'Real-time dashboards',
        'Predictive modeling',
        'Business intelligence solutions'
      ];
    } else if (titleLower.includes('consulting') || titleLower.includes('strategy')) {
      return [
        'Digital transformation strategy',
        'Technology assessment',
        'Process optimization',
        'Change management',
        'Strategic planning & roadmap'
      ];
    }
    return [
      'Expert consultation',
      'Customized solutions',
      'Proven methodologies',
      'Dedicated support',
      'Results-driven approach'
    ];
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-900/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              Our Services
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Transform Your Business with
              <span className="block text-blue-400 mt-2">NexroSolution</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed mb-6 sm:mb-8 px-4">
              We deliver cutting-edge software solutions and strategic consulting services that drive growth, efficiency, and competitive advantage for businesses of all sizes.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/contact"
                  className="inline-block w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors duration-200 shadow-xl"
                >
                  Get Started Today
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/our-work"
                  className="inline-block w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors duration-200"
                >
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Comprehensive Service Offerings
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              From strategy to implementation, we provide end-to-end solutions that align with your business objectives and drive measurable results.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <motion.img
                      src={getServiceImage(service.title)}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                      <div className="bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg">
                        {service.iconUrl ? (
                          <img src={service.iconUrl} alt={service.title} className="w-10 h-10 sm:w-12 sm:h-12" />
                        ) : (
                          <span className="text-3xl sm:text-4xl">{service.icon || '💻'}</span>
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{service.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-lg">{service.description}</p>
                    
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 sm:mb-4">Key Features</h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {getServiceFeatures(service.title).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 sm:gap-3">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-200 w-full justify-center group-hover:shadow-lg"
                      >
                        Learn More
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with business acumen to deliver solutions that create real value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Proven Expertise',
                description: 'Years of experience delivering successful projects across industries'
              },
              {
                icon: '⚡',
                title: 'Fast Delivery',
                description: 'Agile methodologies ensure rapid development and time-to-market'
              },
              {
                icon: '🔒',
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security and 99.9% uptime guarantee'
              },
              {
                icon: '🤝',
                title: 'Dedicated Support',
                description: '24/7 support and ongoing maintenance for peace of mind'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A structured methodology that ensures successful project delivery from concept to completion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your business needs and objectives' },
              { step: '02', title: 'Strategy', description: 'Designing a tailored solution architecture' },
              { step: '03', title: 'Development', description: 'Building with agile, iterative methodology' },
              { step: '04', title: 'Launch & Support', description: 'Deployment and ongoing optimization' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-blue-200 -z-10" style={{ width: 'calc(100% - 4rem)' }}></div>
                )}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can transform your business and drive measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-xl"
                >
                  Schedule a Consultation
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/our-work"
                  className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                  View Case Studies
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
