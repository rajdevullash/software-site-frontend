'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/slug/${params.slug}`);
        if (response.data.success) {
          setService(response.data.data);
          
          // Fetch related services
          const allServicesRes = await api.get('/services/active');
          if (allServicesRes.data.success) {
            const allServices = allServicesRes.data.data;
            const related = allServices.filter((s: Service) => s.slug !== response.data.data.slug).slice(0, 3);
            setRelatedServices(related);
          }
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
        router.push('/services');
      } finally {
        setLoading(false);
      }
    };
    
    if (params.slug) {
      fetchService();
    }
  }, [params.slug, router]);

  const getServiceImage = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('custom') || titleLower.includes('software')) {
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop';
    } else if (titleLower.includes('web') || titleLower.includes('app')) {
      return 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop';
    } else if (titleLower.includes('cloud')) {
      return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop';
    } else if (titleLower.includes('data') || titleLower.includes('analytics')) {
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop';
    } else if (titleLower.includes('consulting') || titleLower.includes('strategy')) {
      return 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop';
    }
    return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop';
  };

  const getServiceFeatures = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('custom') || titleLower.includes('software')) {
      return [
        'Tailored solutions for your unique needs',
        'Scalable architecture design',
        'Agile development methodology',
        'Quality assurance & testing',
        'Ongoing support & maintenance',
        'Modern technology stack',
        'Performance optimization',
        'Security best practices'
      ];
    } else if (titleLower.includes('web') || titleLower.includes('app')) {
      return [
        'Responsive design for all devices',
        'Modern UI/UX implementation',
        'Performance optimization',
        'SEO-friendly architecture',
        'Cross-browser compatibility',
        'Progressive Web App (PWA) support',
        'Fast loading times',
        'Accessibility compliance'
      ];
    } else if (titleLower.includes('cloud')) {
      return [
        'Cloud migration strategy',
        'Infrastructure optimization',
        'Security & compliance',
        'Cost-effective solutions',
        '24/7 monitoring & support',
        'Auto-scaling capabilities',
        'Disaster recovery planning',
        'Multi-cloud deployment'
      ];
    } else if (titleLower.includes('data') || titleLower.includes('analytics')) {
      return [
        'Data collection & integration',
        'Advanced analytics & insights',
        'Real-time dashboards',
        'Predictive modeling',
        'Business intelligence solutions',
        'Data visualization',
        'Machine learning integration',
        'Custom reporting tools'
      ];
    } else if (titleLower.includes('consulting') || titleLower.includes('strategy')) {
      return [
        'Digital transformation strategy',
        'Technology assessment',
        'Process optimization',
        'Change management',
        'Strategic planning & roadmap',
        'IT architecture review',
        'Best practices implementation',
        'Team training & support'
      ];
    }
    return [
      'Expert consultation',
      'Customized solutions',
      'Proven methodologies',
      'Dedicated support',
      'Results-driven approach',
      'Industry expertise',
      'Scalable solutions',
      'Long-term partnership'
    ];
  };

  const getServiceBenefits = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('custom') || titleLower.includes('software')) {
      return [
        { icon: '⚡', title: 'Faster Time to Market', description: 'Accelerate your product launch with agile development' },
        { icon: '📈', title: 'Scalable Growth', description: 'Build solutions that grow with your business' },
        { icon: '🔒', title: 'Enhanced Security', description: 'Enterprise-grade security from day one' },
        { icon: '💰', title: 'Cost Efficiency', description: 'Reduce long-term costs with optimized solutions' }
      ];
    } else if (titleLower.includes('web') || titleLower.includes('app')) {
      return [
        { icon: '📱', title: 'Mobile-First', description: 'Reach customers on any device, anywhere' },
        { icon: '🚀', title: 'Performance', description: 'Lightning-fast load times and smooth interactions' },
        { icon: '🎨', title: 'Modern Design', description: 'Beautiful, intuitive user experiences' },
        { icon: '🔍', title: 'SEO Optimized', description: 'Better search rankings and visibility' }
      ];
    } else if (titleLower.includes('cloud')) {
      return [
        { icon: '☁️', title: 'Flexibility', description: 'Scale up or down based on demand' },
        { icon: '💾', title: 'Reliability', description: '99.9% uptime guarantee' },
        { icon: '🔐', title: 'Security', description: 'Enterprise-level security and compliance' },
        { icon: '📊', title: 'Cost Savings', description: 'Pay only for what you use' }
      ];
    }
    return [
      { icon: '🎯', title: 'Strategic Advantage', description: 'Gain competitive edge with expert guidance' },
      { icon: '⚡', title: 'Efficiency', description: 'Streamline operations and processes' },
      { icon: '📈', title: 'Growth', description: 'Unlock new opportunities for expansion' },
      { icon: '🤝', title: 'Partnership', description: 'Long-term collaboration for success' }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading service details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return null;
  }

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
              Our Service
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed mb-6 sm:mb-8 px-4">
              {service.description}
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
                  View Case Studies
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Image Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={getServiceImage(service.title)}
              alt={service.title}
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Comprehensive {service.title} Solutions
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                We deliver cutting-edge {service.title.toLowerCase()} solutions tailored to your business needs. Our expert team combines industry best practices with nexrosolution technologies to create solutions that drive growth and efficiency.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                With years of experience and a proven track record, we help businesses transform their operations, improve customer experiences, and achieve their strategic objectives through technology.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose Us?</h3>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  'Expert team with proven track record',
                  'Customized solutions for your needs',
                  'Agile and flexible approach',
                  '24/7 support and maintenance',
                  'Competitive pricing',
                  'On-time project delivery'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm sm:text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Key Features & Capabilities
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Our {service.title.toLowerCase()} service includes a comprehensive set of features designed to meet your business requirements.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {getServiceFeatures(service.title).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900 font-medium">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Benefits of Our {service.title} Service
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Discover how our solutions can transform your business and drive measurable results.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {getServiceBenefits(service.title).map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 text-center"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Process
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              A structured approach that ensures successful project delivery from concept to completion.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your business needs, goals, and requirements through detailed consultation.' },
              { step: '02', title: 'Planning', description: 'Designing a comprehensive strategy and solution architecture tailored to your needs.' },
              { step: '03', title: 'Development', description: 'Building your solution using agile methodology with regular updates and feedback.' },
              { step: '04', title: 'Launch & Support', description: 'Deployment, testing, and ongoing support to ensure optimal performance.' }
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
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-blue-200 -z-10" style={{ width: 'calc(100% - 4rem)' }}></div>
                )}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-3 sm:mb-4">{item.step}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
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
                Related Services
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Explore our other service offerings that complement this solution.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {relatedServices.map((relatedService, index) => (
                <motion.div
                  key={relatedService._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getServiceImage(relatedService.title)}
                      alt={relatedService.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white">{relatedService.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 text-sm">{relatedService.description}</p>
                    <Link
                      href={`/services/${relatedService.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-2"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Let's discuss how our {service.title.toLowerCase()} service can transform your business and drive measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/contact"
                  className="inline-block w-full sm:w-auto text-center bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-xl"
                >
                  Schedule a Consultation
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/services"
                  className="inline-block w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors duration-200"
                >
                  View All Services
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

