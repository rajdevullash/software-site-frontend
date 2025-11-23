// Server-side API utility for Next.js server components
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

async function fetchApi<T>(endpoint: string, options?: { revalidate?: number }): Promise<T | null> {
  try {
    const fetchOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Only add revalidate in production or when explicitly requested
    // During build time, we want to use cached data or fallback
    if (options?.revalidate !== undefined) {
      fetchOptions.next = { revalidate: options.revalidate };
    } else {
      // Use ISR with 300 second (5 min) revalidation for production
      // During build, this will use cached data if available
      fetchOptions.next = { revalidate: 300 };
    }

    const response = await fetch(`${API_URL}${endpoint}`, fetchOptions);

    if (!response.ok) {
      return null;
    }

    const result: ApiResponse<T> = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    // Silently fail during build time - we have fallback data
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Failed to fetch ${endpoint}:`, error);
    }
    return null;
  }
}

export async function getHero() {
  return fetchApi<{
    headline: string;
    subheadline: string;
    ctaText: string;
  }>('/hero/active');
}

export async function getServices() {
  return fetchApi<Array<{
    _id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    iconUrl: string;
  }>>('/services/active');
}

export async function getTestimonials() {
  return fetchApi<Array<{
    _id: string;
    quote: string;
    authorName: string;
    authorTitle: string;
    authorCompany: string;
    authorAvatar: string;
  }>>('/testimonials/active');
}

export async function getCompanies() {
  return fetchApi<Array<{
    _id: string;
    name: string;
    logo: string;
    logoUrl: string;
  }>>('/companies/active');
}

