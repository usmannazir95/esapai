# Case Studies Implementation

This document describes the Case Studies feature implementation with Sanity CMS.

## Overview

The Case Studies feature allows content editors to manage case study content through Sanity Studio, with a beautiful timeline visualization on the frontend.

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Sanity Studio Setup

1. Navigate to the studio directory:
   ```bash
   cd studio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the studio directory:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Run the studio:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3333](http://localhost:3333) and log in to Sanity

### 3. Creating Your First Case Study

1. In Sanity Studio, click "Create new" → "Case Study"
2. Fill in the required fields:
   - **Title**: The case study title (e.g., "Voice Revolution")
   - **Slug**: Auto-generated from title (or customize)
   - **Subtitle**: Brief description
   - **Tags**: Add relevant tags (e.g., "vision 2025", "Voice", "AI Control")
   - **Hero Images**: Upload exactly 2 images for the hero section
   - **Timeline**: Add timeline entries with:
     - Date (required)
     - Title (required)
     - Description (required)
     - Exactly 3 images per entry
   - **Published At**: Set publication date
   - **Featured**: Toggle if this is a featured case study
3. Click "Publish" to make it live

## File Structure

```
app/
  case-study/
    [slug]/
      page.tsx          # Dynamic case study detail page
      loading.tsx       # Loading state
    page.tsx            # Case studies listing page
    loading.tsx         # Loading state
  api/
    case-studies/
      [slug]/
        route.ts        # API route for single case study
      route.ts          # API route for all case studies

components/
  pages/
    case-study/
      case-study-page.tsx  # Main case study detail component
  sections/
    case-study/
      timeline.tsx         # Timeline visualization component
  ui/
    case-study-card.tsx   # Case study card for listing

lib/
  case-studies.ts         # Type definitions and data fetching
  hooks/
    use-case-study-content.ts  # React hook for case study data
  sanity/
    client.ts             # Sanity client configuration
    image.ts              # Image URL builder

studio/
  schemas/
    caseStudy.ts          # Sanity schema definition
    index.ts              # Schema exports
  sanity.config.ts        # Sanity Studio configuration
```

## Features

- **Timeline Visualization**: Beautiful vertical timeline with dates, titles, descriptions, and images
- **GSAP Animations**: Staggered fade-in animations for timeline entries
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Image Optimization**: Automatic image optimization via Sanity CDN
- **Static Generation**: Supports static site generation for better performance
- **Type Safety**: Full TypeScript support throughout

## API Routes

- `GET /api/case-studies` - Fetch all case studies
- `GET /api/case-studies/[slug]` - Fetch a single case study by slug

## Navigation

The Case Study link has been added to:
- Main navigation (desktop and mobile)
- Footer navigation

## Next Steps

1. Set up your Sanity project and get your project ID
2. Configure environment variables
3. Start the Sanity Studio and create your first case study
4. The case studies will automatically appear on the `/case-study` page
