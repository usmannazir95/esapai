# Loading States & Skeletons - Complete Requirements

## 📊 Overview
This document provides a comprehensive list of all loading states and skeleton components needed for the ESAP AI application, organized by priority and implementation status.

---

## ✅ Already Implemented

### Feature Skeletons (for Product Features)
- ✅ `FeatureSkeletonImage` - Image placeholder
- ✅ `FeatureSkeletonGallery` - Gallery placeholder  
- ✅ `FeatureSkeletonYouTube` - YouTube video placeholder
- ✅ `FeatureSkeletonGlobe` - 3D globe placeholder
- ✅ `FeatureSkeleton` - Main skeleton selector component

---

## 🔴 HIGH PRIORITY - Critical for User Experience

### 1. Base Skeleton Components (Foundation)
**Status:** ❌ Not Implemented  
**Priority:** CRITICAL - Required before other skeletons

#### 1.1 `Skeleton` (Base Component)
- **Location:** `components/ui/skeletons/skeleton.tsx`
- **Purpose:** Reusable base skeleton with pulse animation
- **Props:**
  - `width?: string | number`
  - `height?: string | number`
  - `className?: string`
  - `rounded?: boolean | string`
- **Usage:** Base for all other skeleton components

#### 1.2 `SkeletonText`
- **Location:** `components/ui/skeletons/skeleton-text.tsx`
- **Purpose:** Text line placeholder(s)
- **Props:**
  - `lines?: number` (default: 1)
  - `width?: string` (default: "100%")
  - `height?: string` (default: "1rem")
  - `className?: string`
- **Usage:** For titles, descriptions, paragraphs

#### 1.3 `SkeletonImage`
- **Location:** `components/ui/skeletons/skeleton-image.tsx`
- **Purpose:** Image/icon placeholder
- **Props:**
  - `width?: string | number`
  - `height?: string | number`
  - `rounded?: boolean | string`
  - `className?: string`
- **Usage:** For product icons, team avatars, feature images

---

### 2. Page-Level Loading States (Next.js)
**Status:** ❌ Not Implemented  
**Priority:** CRITICAL - Required for route transitions

#### 2.1 `app/product/[slug]/loading.tsx`
- **Purpose:** Show while product detail page loads
- **Should Include:**
  - ProductHeroSkeleton
  - MissionSkeleton (3 cards)
  - AutomationHubSkeleton (4-column grid)
  - SectionSkeleton (for ProductFeatures)
  - YouTubeVideoSkeleton
  - PerformanceMetricsSkeleton

#### 2.2 `app/service/[slug]/loading.tsx`
- **Purpose:** Show while service detail page loads
- **Should Include:**
  - ServiceHeroSkeleton
  - ServiceFeaturesSkeleton (grid)
  - RepetitiveWorkSkeleton
  - YouTubeVideoSkeleton

#### 2.3 `app/product/page.tsx` - Loading State
- **Purpose:** Show while products list loads
- **Should Include:**
  - HeroSkeleton (simple)
  - ProductCardSkeleton (grid of 6-9 cards)

#### 2.4 `app/service/page.tsx` - Loading State
- **Purpose:** Show while services list loads
- **Should Include:**
  - HeroSkeleton (simple)
  - ServiceCardSkeleton (grid of 6 cards)

#### 2.5 `app/about/page.tsx` - Loading State (Optional)
- **Purpose:** Show while about page loads
- **Should Include:**
  - AboutHeroSkeleton
  - TeamSkeleton (grid)

#### 2.6 `app/contact/page.tsx` - Loading State (Optional)
- **Purpose:** Show while contact page loads
- **Should Include:**
  - ContactSectionSkeleton

---

### 3. Hero Section Skeletons
**Status:** ❌ Not Implemented  
**Priority:** HIGH - First thing users see

#### 3.1 `HeroSkeleton`
- **Location:** `components/ui/skeletons/hero-skeleton.tsx`
- **Purpose:** Generic hero section placeholder
- **Elements:**
  - Title skeleton (2-3 lines)
  - Subtitle skeleton (2 lines)
  - Button skeleton
  - Decorative elements (optional)

#### 3.2 `ProductHeroSkeleton`
- **Location:** `components/ui/skeletons/product-hero-skeleton.tsx`
- **Purpose:** Product hero with icon placeholder
- **Elements:**
  - Large title skeleton
  - Subtitle lines (2-3)
  - CTA buttons (2)
  - Central icon placeholder (large)
  - Decorative elements (left/right icons)

#### 3.3 `ServiceHeroSkeleton`
- **Location:** `components/ui/skeletons/service-hero-skeleton.tsx`
- **Purpose:** Service hero placeholder
- **Elements:**
  - Title skeleton
  - Subtitle lines
  - CTA buttons
  - Frame decoration placeholder

#### 3.4 `AboutHeroSkeleton`
- **Location:** `components/ui/skeletons/about-hero-skeleton.tsx`
- **Purpose:** About page hero
- **Elements:**
  - Title skeleton
  - Description lines (2-3)

---

### 4. Card Skeletons
**Status:** ❌ Not Implemented  
**Priority:** HIGH - Used in listing pages

#### 4.1 `ProductCardSkeleton`
- **Location:** `components/ui/skeletons/product-card-skeleton.tsx`
- **Purpose:** Product card in `/product` listing
- **Elements:**
  - Icon skeleton (80x80px)
  - Title skeleton (1 line)
  - Description skeleton (2-3 lines)
  - CTA link skeleton
- **Layout:** Matches SpotlightCard structure

#### 4.2 `ServiceCardSkeleton`
- **Location:** `components/ui/skeletons/service-card-skeleton.tsx`
- **Purpose:** Service card in `/service` listing
- **Elements:**
  - Icon skeleton (80x80px)
  - Title skeleton (1 line)
  - Description skeleton (2-3 lines)
  - CTA link skeleton
- **Layout:** Matches SpotlightCard structure

#### 4.3 `FeatureCardSkeleton`
- **Location:** `components/ui/skeletons/feature-card-skeleton.tsx`
- **Purpose:** Feature card placeholder
- **Elements:**
  - Icon/image skeleton
  - Title skeleton
  - Description skeleton (2 lines)

#### 4.4 `MissionCardSkeleton`
- **Location:** `components/ui/skeletons/mission-card-skeleton.tsx`
- **Purpose:** Mission card placeholder (3-column grid)
- **Elements:**
  - Title skeleton
  - Description skeleton (3-4 lines)

#### 4.5 `TeamCardSkeleton`
- **Location:** `components/ui/skeletons/team-card-skeleton.tsx`
- **Purpose:** Team member card placeholder
- **Elements:**
  - Avatar skeleton (circular, 200x200px)
  - Name skeleton
  - Role skeleton
  - Description skeleton (2-3 lines)

---

### 5. Section Skeletons
**Status:** ❌ Not Implemented  
**Priority:** HIGH - Used throughout pages

#### 5.1 `SectionSkeleton`
- **Location:** `components/ui/skeletons/section-skeleton.tsx`
- **Purpose:** Generic section placeholder
- **Elements:**
  - SectionHeader skeleton (title + subtitle)
  - Content area skeleton

#### 5.2 `AutomationHubSkeleton`
- **Location:** `components/ui/skeletons/automation-hub-skeleton.tsx`
- **Purpose:** 4-column feature grid placeholder
- **Elements:**
  - SectionHeader skeleton
  - Grid of 4 FeatureCardSkeleton components

#### 5.3 `ServiceFeaturesSkeleton`
- **Location:** `components/ui/skeletons/service-features-skeleton.tsx`
- **Purpose:** Service features grid placeholder
- **Elements:**
  - SectionHeader skeleton
  - Grid of feature cards (variable columns)

#### 5.4 `PerformanceMetricsSkeleton`
- **Location:** `components/ui/skeletons/performance-metrics-skeleton.tsx`
- **Purpose:** Performance metrics placeholder
- **Elements:**
  - 3 metric cards with:
    - Large number skeleton
    - Label skeleton

---

### 6. Interactive Loaders
**Status:** ❌ Not Implemented  
**Priority:** HIGH - For user interactions

#### 6.1 `ButtonLoader`
- **Location:** `components/ui/loaders/button-loader.tsx`
- **Purpose:** Loading spinner for buttons
- **Elements:**
  - Spinner (animated)
  - Optional text
- **Usage:** Inside Button during async operations
- **Props:**
  - `size?: "sm" | "md" | "lg"`
  - `text?: string`
  - `className?: string`

#### 6.2 `Spinner`
- **Location:** `components/ui/loaders/spinner.tsx`
- **Purpose:** Reusable spinner component
- **Variants:**
  - Primary color
  - White
  - Small/Medium/Large sizes

---

## 🟡 MEDIUM PRIORITY - Enhanced UX

### 7. Grid & Layout Skeletons
**Status:** ❌ Not Implemented

#### 7.1 `GridSkeleton`
- **Location:** `components/ui/skeletons/grid-skeleton.tsx`
- **Purpose:** Generic grid placeholder
- **Props:**
  - `columns?: number` (responsive: 1, 2, 3)
  - `items?: number`
  - `itemComponent?: React.ComponentType`
- **Usage:** Flexible grid with any card skeleton

#### 7.2 `FeatureGridSkeleton`
- **Location:** `components/ui/skeletons/feature-grid-skeleton.tsx`
- **Purpose:** Feature grid (2-3-4 columns)
- **Elements:** Multiple FeatureCardSkeleton components

---

### 8. Content-Specific Skeletons
**Status:** ❌ Not Implemented

#### 8.1 `YouTubeVideoSkeleton`
- **Location:** `components/ui/skeletons/youtube-video-skeleton.tsx`
- **Purpose:** YouTube video player placeholder
- **Elements:**
  - Video frame (16:9 aspect ratio)
  - Title skeleton
  - Play button overlay

#### 8.2 `RepetitiveWorkSkeleton`
- **Location:** `components/ui/skeletons/repetitive-work-skeleton.tsx`
- **Purpose:** RepetitiveWork section placeholder
- **Elements:**
  - SectionHeader skeleton
  - Content grid skeleton

#### 8.3 `ContactSectionSkeleton`
- **Location:** `components/ui/skeletons/contact-section-skeleton.tsx`
- **Purpose:** Contact form placeholder
- **Elements:**
  - Title skeleton
  - Form fields skeleton (3-4 inputs)
  - Button skeleton
  - Social links skeleton

---

### 9. Navigation & Transition Loaders
**Status:** ❌ Not Implemented

#### 9.1 `PageTransitionLoader`
- **Location:** `components/ui/loaders/page-transition-loader.tsx`
- **Purpose:** Show during route transitions
- **Elements:**
  - Progress bar (top of page)
  - Or full-screen overlay with spinner
- **Usage:** Next.js router events or Suspense boundaries

#### 9.2 `NavigationLoader`
- **Location:** `components/ui/loaders/navigation-loader.tsx`
- **Purpose:** Show during navigation
- **Elements:** Small spinner in navbar

---

## 🟢 LOW PRIORITY - Nice to Have

### 10. Advanced Loaders
**Status:** ❌ Not Implemented

#### 10.1 `FormLoader`
- **Location:** `components/ui/loaders/form-loader.tsx`
- **Purpose:** Form submission overlay
- **Elements:**
  - Overlay backdrop
  - Spinner
  - Optional message

#### 10.2 `DataLoader`
- **Location:** `components/ui/loaders/data-loader.tsx`
- **Purpose:** Generic data loading indicator
- **Elements:**
  - Spinner
  - Message text
  - Optional retry button

#### 10.3 `InfiniteScrollLoader`
- **Location:** `components/ui/loaders/infinite-scroll-loader.tsx`
- **Purpose:** Load more indicator
- **Elements:**
  - Spinner
  - "Loading more..." text

---

## 📋 Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] Create `Skeleton` base component
- [ ] Create `SkeletonText` component
- [ ] Create `SkeletonImage` component
- [ ] Create `Spinner` component
- [ ] Create `ButtonLoader` component

### Phase 2: Page Skeletons (Week 1-2)
- [ ] Create `HeroSkeleton`
- [ ] Create `ProductHeroSkeleton`
- [ ] Create `ServiceHeroSkeleton`
- [ ] Create `ProductCardSkeleton`
- [ ] Create `ServiceCardSkeleton`
- [ ] Create `app/product/[slug]/loading.tsx`
- [ ] Create `app/service/[slug]/loading.tsx`

### Phase 3: Section Skeletons (Week 2)
- [ ] Create `SectionSkeleton`
- [ ] Create `MissionCardSkeleton`
- [ ] Create `FeatureCardSkeleton`
- [ ] Create `AutomationHubSkeleton`
- [ ] Create `PerformanceMetricsSkeleton`
- [ ] Create `ServiceFeaturesSkeleton`

### Phase 4: Content Skeletons (Week 2-3)
- [ ] Create `YouTubeVideoSkeleton`
- [ ] Create `TeamCardSkeleton`
- [ ] Create `RepetitiveWorkSkeleton`
- [ ] Create `ContactSectionSkeleton`

### Phase 5: Advanced (Week 3+)
- [ ] Create `PageTransitionLoader`
- [ ] Create `GridSkeleton`
- [ ] Create `FormLoader`
- [ ] Create `DataLoader`

---

## 🎨 Design Specifications

### Visual Style
- **Background Color:** `bg-dark` (matches site theme)
- **Skeleton Color:** `bg-white-opacity-10` with pulse animation
- **Primary Accent:** `rgba(19, 245, 132)` for loaders
- **Border Radius:** Match component styles (32px for cards, 8px for text)
- **Spacing:** Match component padding/margins

### Animation
- **Pulse Duration:** 2s ease-in-out infinite
- **Spinner Rotation:** 1s linear infinite
- **Fade Transition:** 300ms ease-in-out

### Responsive Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## 📁 File Structure

```
components/
  ui/
    skeletons/
      skeleton.tsx                    # Base component
      skeleton-text.tsx              # Text lines
      skeleton-image.tsx            # Image/icon
      hero-skeleton.tsx              # Generic hero
      product-hero-skeleton.tsx     # Product hero
      service-hero-skeleton.tsx      # Service hero
      about-hero-skeleton.tsx       # About hero
      product-card-skeleton.tsx     # Product card
      service-card-skeleton.tsx      # Service card
      feature-card-skeleton.tsx     # Feature card
      mission-card-skeleton.tsx     # Mission card
      team-card-skeleton.tsx         # Team card
      section-skeleton.tsx           # Generic section
      automation-hub-skeleton.tsx    # Automation hub
      service-features-skeleton.tsx  # Service features
      performance-metrics-skeleton.tsx # Metrics
      youtube-video-skeleton.tsx     # YouTube video
      repetitive-work-skeleton.tsx   # Repetitive work
      contact-section-skeleton.tsx   # Contact form
      grid-skeleton.tsx              # Generic grid
      feature-grid-skeleton.tsx      # Feature grid
    loaders/
      spinner.tsx                    # Base spinner
      button-loader.tsx              # Button loader
      page-transition-loader.tsx     # Route transition
      navigation-loader.tsx          # Navigation
      form-loader.tsx                # Form overlay
      data-loader.tsx                # Data loading
      infinite-scroll-loader.tsx     # Infinite scroll
app/
  product/
    [slug]/
      loading.tsx                    # Product detail loading
    page.tsx                         # (Suspense fallback)
  service/
    [slug]/
      loading.tsx                    # Service detail loading
    page.tsx                         # (Suspense fallback)
  about/
    page.tsx                         # (Suspense fallback)
  contact/
    page.tsx                         # (Suspense fallback)
```

---

## 🔧 Usage Examples

### Route-Level Loading
```tsx
// app/product/[slug]/loading.tsx
import { ProductHeroSkeleton } from "@/components/ui/skeletons/product-hero-skeleton";
import { SectionSkeleton } from "@/components/ui/skeletons/section-skeleton";

export default function Loading() {
  return (
    <main className="relative">
      <ProductHeroSkeleton />
      <SectionSkeleton />
      <SectionSkeleton />
    </main>
  );
}
```

### Component-Level Loading
```tsx
import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/ui/skeletons/product-card-skeleton";
import { ProductCard } from "@/components/product-card";

export function ProductsList() {
  return (
    <Suspense fallback={<ProductCardSkeleton count={6} />}>
      <ProductCard />
    </Suspense>
  );
}
```

### Button Loading
```tsx
import { ButtonLoader } from "@/components/ui/loaders/button-loader";

<Button disabled={isLoading}>
  {isLoading ? <ButtonLoader /> : "Submit"}
</Button>
```

---

## ♿ Accessibility Requirements

- Add `aria-label="Loading..."` to all loaders
- Use `role="status"` for loading states
- Ensure proper color contrast (WCAG AA)
- Support reduced motion preferences
- Provide screen reader announcements

---

## 📊 Priority Summary

| Priority | Count | Status |
|----------|-------|--------|
| 🔴 Critical | 20 | 0% Complete |
| 🟡 Medium | 8 | 0% Complete |
| 🟢 Low | 5 | 0% Complete |
| **Total** | **33** | **0% Complete** |

---

## 🚀 Quick Start

1. **Start with base components:**
   ```bash
   # Create skeleton base
   touch components/ui/skeletons/skeleton.tsx
   touch components/ui/skeletons/skeleton-text.tsx
   touch components/ui/skeletons/skeleton-image.tsx
   ```

2. **Add spinner:**
   ```bash
   touch components/ui/loaders/spinner.tsx
   touch components/ui/loaders/button-loader.tsx
   ```

3. **Create page loaders:**
   ```bash
   touch app/product/[slug]/loading.tsx
   touch app/service/[slug]/loading.tsx
   ```

4. **Build card skeletons:**
   ```bash
   touch components/ui/skeletons/product-card-skeleton.tsx
   touch components/ui/skeletons/service-card-skeleton.tsx
   ```

---

## 📝 Notes

- All skeletons should match existing component styles
- Use Tailwind classes for consistency
- Test on mobile, tablet, and desktop
- Ensure animations are smooth (60fps)
- Consider dark mode compatibility
- Match spacing and sizing with actual components

