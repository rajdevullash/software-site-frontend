# Software Company Website Frontend

A modern frontend for a software company website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **User-Facing Website**: Beautiful, responsive website with hero section, services, testimonials, and more
- **Admin Panel**: Complete admin panel with sidebar for content management
- **Content Management**: Manage all website content from the admin panel
- **Modern UI**: Clean and professional design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

### User-Facing Pages
- `/` - Home page
- `/services` - Services page
- `/about` - About us page
- `/contact` - Contact page
- `/case-studies` - Case studies listing

### Admin Pages
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/hero` - Hero section management
- `/admin/services` - Services management
- `/admin/testimonials` - Testimonials management
- `/admin/companies` - Companies management
- `/admin/case-studies` - Case studies management
- `/admin/footer` - Footer management

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── admin/          # Admin pages
│   ├── page.tsx        # Home page
│   └── ...
├── components/         # Reusable components
│   ├── admin/         # Admin components
│   └── layout/        # Layout components
└── lib/               # Utilities and API client
```

# software-site-frontend
