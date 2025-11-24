'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface FooterData {
  companyName: string;
  tagline: string;
  logoUrl: string;
  address: string;
  email: string;
  phone: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    github: string;
    linkedin: string;
  };
  companyLinks: Array<{ label: string; url: string }>;
  serviceLinks: Array<{ label: string; url: string }>;
  copyrightText: string;
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await api.get('/footer');
        if (response.data.success) {
          // Override with NexroSolution branding even if API returns data
          const apiData = response.data.data;
          setFooterData({
            ...apiData,
            companyName: 'NexroSolution',
            tagline: apiData.tagline || 'Empowering Business with High-Tech Solutions',
            logoUrl: '/logos/nexrosolution.png',
            copyrightText: apiData.copyrightText?.replace(/Innovate|Innovatech/g, 'NexroSolution') || '© 2025 NexroSolution. All rights reserved.',
          });
        } else {
          // Set default footer data with NexroSolution branding
          setFooterData({
            companyName: 'NexroSolution',
            tagline: 'Empowering Business with High-Tech Solutions',
            logoUrl: '/logos/nexrosolution.png',
            address: '123 Innovation Drive, Tech City',
            email: 'hello@nexrosolution.com',
            phone: '(123) 456-7890',
            socialLinks: {
              facebook: '',
              twitter: '',
              github: '',
              linkedin: '',
            },
            companyLinks: [
              { label: 'About Us', url: '/about' },
              { label: 'Our Journey', url: '/our-journey' },
              { label: 'Our Work', url: '/our-work' },
            ],
            serviceLinks: [
              { label: 'Custom Software', url: '/services' },
              { label: 'Web Development', url: '/services' },
              { label: 'Cloud Integration', url: '/services' },
            ],
            copyrightText: '© 2025 NexroSolution. All rights reserved.',
          });
        }
      } catch (error) {
        console.error('Failed to fetch footer:', error);
        // Set default footer data with NexroSolution branding
        setFooterData({
          companyName: 'NexroSolution',
          tagline: 'Empowering Business with High-Tech Solutions',
          logoUrl: '/logos/nexrosolution.png',
          address: '123 Innovation Drive, Tech City',
          email: 'hello@nexrosolution.com',
          phone: '(123) 456-7890',
          socialLinks: {
            facebook: '',
            twitter: '',
            github: '',
            linkedin: '',
          },
          companyLinks: [
            { label: 'About Us', url: '/about' },
            { label: 'Our Journey', url: '/our-journey' },
            { label: 'Our Work', url: '/our-work' },
          ],
          serviceLinks: [
            { label: 'Custom Software', url: '/services' },
            { label: 'Web Development', url: '/services' },
            { label: 'Cloud Integration', url: '/services' },
          ],
          copyrightText: '© 2025 NexroSolution. All rights reserved.',
        });
      }
    };
    fetchFooter();
  }, []);

  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                {footerData.logoUrl ? (
                  <Image
                    src={footerData.logoUrl}
                    alt={footerData.companyName}
                    width={40}
                    height={40}
                    className="object-contain group-hover:opacity-80 transition-opacity"
                    priority
                    unoptimized
                    onError={(e) => {
                      // Fallback if logo doesn't load - show NexroSolution initial
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center"><span class="text-white font-bold text-xs">NX</span></div>';
                      }
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">NX</span>
                  </div>
                )}
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {footerData.companyName}
              </span>
            </Link>
            <p className="text-sm mb-4 text-gray-400">{footerData.tagline}</p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerData.companyLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerData.serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>{footerData.address}</li>
              <li>
                <a href={`mailto:${footerData.email}`} className="hover:text-white transition">
                  {footerData.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footerData.phone}`} className="hover:text-white transition">
                  {footerData.phone}
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {footerData.socialLinks.facebook && (
                <a href={footerData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {footerData.socialLinks.twitter && (
                <a href={footerData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              {footerData.socialLinks.github && (
                <a href={footerData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>{footerData.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}

