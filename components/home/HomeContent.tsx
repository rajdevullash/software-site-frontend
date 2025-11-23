'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Counter, RatioCounter } from './Counter';
import { CodeBracketsIcon, BrowserIcon, CloudIcon } from '@/components/ui/ServiceIcons';

interface Hero {
  headline: string;
  subheadline: string;
  ctaText: string;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  iconUrl: string;
}

interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  authorAvatar: string;
}

interface Company {
  _id: string;
  name: string;
  logo: string;
  logoUrl: string;
}

interface HomeContentProps {
  hero: Hero | null;
  services: Service[];
  testimonials: Testimonial[];
  companies: Company[];
}

// Helper function to get icon component based on service title
const getServiceIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('custom') || titleLower.includes('software')) {
    return <CodeBracketsIcon className="w-12 h-12 text-blue-600" />;
  } else if (titleLower.includes('web') || titleLower.includes('app')) {
    return <BrowserIcon className="w-12 h-12 text-blue-600" />;
  } else if (titleLower.includes('cloud')) {
    return <CloudIcon className="w-12 h-12 text-blue-600" />;
  }
  return <CodeBracketsIcon className="w-12 h-12 text-blue-600" />;
};

// Helper function to get service image
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

// Helper function to get service features
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

export default function HomeContent({ hero, services, testimonials, companies }: HomeContentProps) {
  const defaultHero: Hero = {
    headline: 'Innovative Software Solutions for a Digital World',
    subheadline: 'We build custom software to help your business grow and succeed. Let\'s create something amazing together.',
    ctaText: 'Get Started',
  };

  const displayHero = hero || defaultHero;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-blue-400/30"
              >
                🚀 Transforming Businesses Through Technology
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                {displayHero.headline}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                {displayHero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/contact"
                    className="inline-block w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors duration-200 shadow-xl hover:shadow-2xl"
                  >
                    {displayHero.ctaText}
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/our-work"
                    className="inline-block w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors duration-200 border border-white/20"
                  >
                    View Our Work
                  </Link>
                </motion.div>
              </div>
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>50+ Happy Clients</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
                    alt="Software Development"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-xl"
                >
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">
                    <Counter end={98} suffix="%" duration={2} />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Client Satisfaction</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-xl"
                >
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                    <RatioCounter first={24} second={7} duration={2} />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">Support Available</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 sm:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { number: 100, suffix: '+', label: 'Projects Completed', icon: '🚀' },
              { number: 50, suffix: '+', label: 'Happy Clients', icon: '😊' },
              { number: 98, suffix: '%', label: 'Client Satisfaction', icon: '⭐' },
              { number: 10, suffix: '+', label: 'Years Experience', icon: '💼' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">
                  <Counter end={stat.number} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-gray-600 text-xs sm:text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Comprehensive Service Offerings
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              From strategy to implementation, we provide end-to-end solutions that align with your business objectives and drive measurable results.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={getServiceImage(service.title)}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg">
                      {service.iconUrl ? (
                        <Image
                          src={service.iconUrl}
                          alt={service.title}
                          width={40}
                          height={40}
                          className="w-8 h-8 sm:w-10 sm:h-10"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-2xl sm:text-3xl">{service.icon || '💻'}</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{service.title}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">{service.description}</p>
                  
                  <div className="mb-3 sm:mb-4">
                    <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">Key Features</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {getServiceFeatures(service.title).slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
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
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-200 w-full justify-center group-hover:shadow-lg"
                    >
                      Learn More
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50/30 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-100 text-indigo-600 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Built for Scale, Designed for Success
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              We combine cutting-edge technology with proven methodologies to deliver solutions that exceed expectations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast Delivery',
                description: 'Agile development process ensures rapid deployment without compromising quality.',
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Bank-level security protocols to protect your data and applications.',
              },
              {
                icon: '📈',
                title: 'Scalable Architecture',
                description: 'Built to grow with your business, handling millions of users seamlessly.',
              },
              {
                icon: '🎨',
                title: 'Modern UI/UX',
                description: 'Beautiful, intuitive interfaces that users love and engage with.',
              },
              {
                icon: '🔄',
                title: '24/7 Support',
                description: 'Round-the-clock monitoring and support to keep your systems running.',
              },
              {
                icon: '💡',
                title: 'Innovation First',
                description: 'Leveraging latest technologies and best practices for optimal results.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      {companies.length > 0 && (
        <section className="bg-white py-12 sm:py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              className="text-center mb-8 sm:mb-12"
            >
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-2">Trusted By</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Industry Leaders Trust Our Solutions
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8 items-center">
              {companies.map((company, index) => (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center"
                >
                  {company.logoUrl ? (
                    <Image
                      src={company.logoUrl}
                      alt={company.name}
                      width={128}
                      height={80}
                      className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-32 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-300 shadow-sm">
                      <span className="text-gray-600 text-xs font-semibold text-center px-2">
                        {company.name}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              className="text-center mb-16"
            >
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
                Testimonials
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what industry leaders have to say about working with us.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-4">
                    {testimonial.authorAvatar ? (
                      <Image
                        src={testimonial.authorAvatar}
                        alt={testimonial.authorName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200"
                        loading="lazy"
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-12 h-12"
                      >
                        <Image
                          src={`https://i.pravatar.cc/150?img=${index + 1}`}
                          alt={testimonial.authorName}
                          fill
                          className="rounded-full object-cover ring-2 ring-blue-200"
                          loading="lazy"
                        />
                      </motion.div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.authorName}</p>
                      <p className="text-sm text-gray-600">
                        {testimonial.authorTitle}
                        {testimonial.authorCompany && `, ${testimonial.authorCompany}`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Showcase Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Work in Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we've transformed businesses with cutting-edge technology solutions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', title: 'FinTech Platform' },
              { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', title: 'E-commerce Solution' },
              { img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop', title: 'HealthTech App' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Ready to build your next big idea?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Let's discuss how we can help you achieve your business goals with our innovative software solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-xl hover:shadow-2xl"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

