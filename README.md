# ESAP AI

A modern, high-performance website for ESAP AI - an AI platform company specializing in enterprise AI solutions, voice-activated ERP systems, and intelligent automation.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16, React 19, and TypeScript
- **3D Graphics**: Interactive 3D components using Three.js and React Three Fiber
- **Advanced Animations**: Smooth animations powered by GSAP
- **Performance Optimized**: Code splitting, lazy loading, and performance monitoring
- **SEO Optimized**: Comprehensive SEO with structured data and metadata
- **Content Management**: Integrated with Sanity CMS for dynamic content
- **Responsive Design**: Fully responsive with mobile-first approach
- **Accessibility**: WCAG compliant with reduced motion support

## 📋 Prerequisites

- **Node.js**: 20.x or higher
- **pnpm**: 8.x or higher (recommended package manager)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd esapai
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your_ga_id

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm dev:turbo` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm build:turbo` - Build for production with Turbopack
- `pnpm build:analyze` - Build and analyze bundle size
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📁 Project Structure

```
esapai/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── case-study/        # Case studies pages
│   ├── contact/           # Contact page
│   ├── product/           # Product pages
│   ├── service/           # Service pages
│   └── ...
├── components/
│   ├── features/          # Feature-specific components
│   │   ├── about/         # About page components
│   │   ├── case-studies/  # Case study components
│   │   ├── contact/       # Contact components
│   │   ├── home/          # Home page components
│   │   ├── navigation/    # Navigation components
│   │   ├── products/      # Product components
│   │   └── services/      # Service components
│   ├── pages/             # Page-level components
│   ├── shared/            # Shared/reusable components
│   ├── three/             # Three.js 3D components
│   └── ui/                # UI primitives
├── lib/
│   ├── hooks/             # Custom React hooks
│   ├── sanity/            # Sanity CMS integration
│   ├── seo/               # SEO utilities
│   └── utils/             # Utility functions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🎨 Tech Stack

### Core
- **Next.js 16.0.10** - React framework
- **React 19.2.1** - UI library
- **TypeScript 5** - Type safety

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Animations & 3D
- **GSAP 3.13.0** - Animation library
- **Three.js 0.181.1** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Motion** - Animation library

### Content Management
- **Sanity 5.0.0** - Headless CMS
- **next-sanity** - Sanity integration for Next.js

### Other Libraries
- **ReactFlow** - Node-based UI builder
- **Cobe** - Globe visualization
- **Class Variance Authority** - Component variants

## 🔧 Configuration

### Next.js Configuration
The project uses a custom `next.config.ts` with:
- Image optimization and remote patterns
- Security headers
- Bundle analysis support
- Performance optimizations

### TypeScript Configuration
Strict TypeScript mode is enabled with path aliases configured:
- `@/*` maps to the project root

### ESLint
ESLint is configured with Next.js recommended rules.

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables for Production

Ensure all required environment variables are set in your deployment platform:
- Vercel: Add variables in project settings
- Other platforms: Configure according to their documentation

### Performance Considerations

- Images are automatically optimized via Next.js Image component
- Code splitting is implemented for optimal bundle sizes
- Lazy loading is used for below-the-fold content
- Performance monitoring is built-in

## 📝 Key Features Implementation

### Performance Optimizations
- Dynamic imports for code splitting
- Lazy section loading
- Performance tier detection
- Adaptive quality settings for 3D components
- Image optimization with WebP/AVIF support

### SEO Features
- Comprehensive metadata generation
- Structured data (JSON-LD)
- Breadcrumb navigation
- Open Graph tags
- Twitter Card support

### Accessibility
- WCAG 2.1 compliance
- Reduced motion support
- Keyboard navigation
- Screen reader optimization
- Semantic HTML

## 🤝 Contributing

1. Create a feature branch from `development`
2. Make your changes
3. Ensure all tests pass and linting is clean
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Three.js Documentation](https://threejs.org/docs)

## 📞 Support

For issues and questions, please contact the development team.
