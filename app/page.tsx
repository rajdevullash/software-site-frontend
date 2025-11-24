import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getHero, getServices, getTestimonials, getCompanies } from '@/lib/server-api';

// Dynamically import HomeContent to reduce initial bundle size
const HomeContent = dynamic(() => import('@/components/home/HomeContent'), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  ),
});

// Default fallback data
const defaultHero = {
  headline: 'NexroSolution - Empowering Business with High-Tech Solutions',
  subheadline: 'Empowering Business with High-Tech Solutions. We deliver cutting-edge software solutions and strategic consulting services.',
  ctaText: 'Get Started',
};

const defaultServices = [
  {
    _id: '1',
    title: 'Custom Software',
    slug: 'custom-software',
    description: 'Tailored software solutions to meet your unique business needs and objectives.',
    icon: '< >',
    iconUrl: '',
  },
  {
    _id: '2',
    title: 'Web App Development',
    slug: 'web-app-development',
    description: 'Modern and responsive web applications for seamless user experiences.',
    icon: '🌐',
    iconUrl: '',
  },
  {
    _id: '3',
    title: 'Cloud Integration',
    slug: 'cloud-integration',
    description: 'Integrate cloud services to enhance scalability, security, and efficiency.',
    icon: '☁️',
    iconUrl: '',
  },
];

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const hero = await getHero();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexrosolution.com';
  
  // Override any "Innovative" or "Innovate" text with NexroSolution
  let title = hero?.headline || 'NexroSolution - Empowering Business with High-Tech Solutions';
  let description = hero?.subheadline || 'Empowering Business with High-Tech Solutions. We deliver cutting-edge software solutions and strategic consulting services.';
  
  // Replace any "Innovative" or "Innovate" references with NexroSolution
  title = title.replace(/Innovative|Innovate|Innovatech/gi, 'NexroSolution').trim();
  if (!title.includes('NexroSolution')) {
    title = 'NexroSolution - Empowering Business with High-Tech Solutions';
  }
  description = description.replace(/Innovative|Innovate|Innovatech/gi, 'NexroSolution');
  
  return {
    title: {
      default: title,
      template: '%s | NexroSolution',
    },
    description,
    keywords: [
      'NexroSolution',
      'software development',
      'custom software',
      'web development',
      'cloud integration',
      'enterprise software',
      'software solutions',
      'digital transformation',
      'technology consulting',
      'high-tech solutions',
    ],
    authors: [{ name: 'NexroSolution' }],
    creator: 'NexroSolution',
    publisher: 'NexroSolution',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: 'NexroSolution',
      title,
      description,
      images: [
        {
          url: '/logos/nexrosolution.png',
          width: 1200,
          height: 630,
          alt: 'NexroSolution - Empowering Business with High-Tech Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logos/nexrosolution.png'],
      creator: '@nexrosolution',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: siteUrl,
    },
    verification: {
      // Add your verification codes here when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

// Server Component - uses ISR (Incremental Static Regeneration)
// This page will be statically generated at build time and revalidated every 300 seconds (5 minutes)
export const revalidate = 300; // Revalidate every 5 minutes for ISR - reduces API calls

export default async function Home() {
  // Fetch data in parallel for better performance
  // If API is unavailable during build, fallback data will be used
  const [hero, services, testimonials, companies] = await Promise.all([
    getHero(),
    getServices(),
    getTestimonials(),
    getCompanies(),
  ]);

  return (
    <>
      <Navbar />
      <HomeContent
        hero={hero || defaultHero}
        services={services || defaultServices}
        testimonials={testimonials || []}
        companies={companies || []}
      />
      <Footer />
    </>
  );
}
