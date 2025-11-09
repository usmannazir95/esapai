# Loaders and Skeletons Required

## Overview
This document lists all the loaders and skeleton components needed for the ESAP AI application to provide smooth loading experiences.

---

## ✅ Existing Skeletons (Already Implemented)

1. **Feature Skeletons** (for feature sections)
   - `FeatureSkeletonImage` - Image placeholder
   - `FeatureSkeletonGallery` - Gallery placeholder
   - `FeatureSkeletonYouTube` - YouTube video placeholder
   - `FeatureSkeletonGlobe` - 3D globe placeholder

---

## 🔴 Required: Next.js Page Loaders (`loading.tsx` files)

### 1. **Route-Level Loaders**
   - **`app/product/[slug]/loading.tsx`**
     - Purpose: Show while product page data loads
     - Should include: Hero skeleton, section skeletons
   
   - **`app/service/[slug]/loading.tsx`**
     - Purpose: Show while service page data loads
     - Should include: Hero skeleton, feature grid skeleton
   
   - **`app/product/page.tsx` loading state**
     - Purpose: Show while products list loads
     - Should include: Grid of product card skeletons
   
   - **`app/service/page.tsx` loading state**
     - Purpose: Show while services list loads
     - Should include: Grid of service card skeletons

---

## 🟡 Required: Component-Level Skeletons

### 2. **Hero Section Skeletons**
   - **`HeroSkeleton`** / `ProductHeroSkeleton` / `ServiceHeroSkeleton`
     - Purpose: Placeholder for hero sections
     - Elements: Title, subtitle, buttons, decorative elements
     - Location: `components/ui/skeletons/hero-skeleton.tsx`

### 3. **Card Skeletons**
   - **`ProductCardSkeleton`**
     - Purpose: Placeholder for product cards in listing pages
     - Elements: Icon, title, description, CTA button
     - Location: `components/ui/skeletons/product-card-skeleton.tsx`
   
   - **`ServiceCardSkeleton`**
     - Purpose: Placeholder for service cards in listing pages
     - Elements: Icon, title, description, CTA button
     - Location: `components/ui/skeletons/service-card-skeleton.tsx`
   
   - **`FeatureCardSkeleton`**
     - Purpose: Placeholder for feature cards
     - Elements: Icon, title, description
     - Location: `components/ui/skeletons/feature-card-skeleton.tsx`
   
   - **`MissionCardSkeleton`**
     - Purpose: Placeholder for mission cards
     - Elements: Title, description
     - Location: `components/ui/skeletons/mission-card-skeleton.tsx`
   
   - **`TeamCardSkeleton`**
     - Purpose: Placeholder for team member cards
     - Elements: Avatar, name, role, description
     - Location: `components/ui/skeletons/team-card-skeleton.tsx`

### 4. **Section Skeletons**
   - **`SectionSkeleton`**
     - Purpose: Generic section placeholder
     - Elements: Header, content area
     - Location: `components/ui/skeletons/section-skeleton.tsx`
   
   - **`GridSkeleton`**
     - Purpose: Grid layout placeholder
     - Elements: Multiple card skeletons in grid
     - Location: `components/ui/skeletons/grid-skeleton.tsx`
   
   - **`FeatureGridSkeleton`**
     - Purpose: Feature grid placeholder (2-3-4 columns)
     - Elements: Multiple feature card skeletons
     - Location: `components/ui/skeletons/feature-grid-skeleton.tsx`

### 5. **Content Skeletons**
   - **`YouTubeVideoSkeleton`**
     - Purpose: YouTube video player placeholder
     - Elements: Video frame, title, controls
     - Location: `components/ui/skeletons/youtube-video-skeleton.tsx`
   
   - **`PerformanceMetricsSkeleton`**
     - Purpose: Performance metrics placeholder
     - Elements: Metric cards with values
     - Location: `components/ui/skeletons/performance-metrics-skeleton.tsx`
   
   - **`AutomationHubSkeleton`**
     - Purpose: Automation hub grid placeholder
     - Elements: 4-column grid of feature cards
     - Location: `components/ui/skeletons/automation-hub-skeleton.tsx`

---

## 🟢 Required: Interactive Loaders

### 6. **Button Loaders**
   - **`ButtonLoader`** / Inline spinner component
     - Purpose: Show loading state in buttons during form submission
     - Elements: Spinner, optional text
     - Location: `components/ui/loaders/button-loader.tsx`
     - Usage: Inside Button component during async operations

### 7. **Form Loaders**
   - **`FormLoader`**
     - Purpose: Show loading overlay for forms
     - Elements: Overlay, spinner, message
     - Location: `components/ui/loaders/form-loader.tsx`

### 8. **Navigation Loaders**
   - **`PageTransitionLoader`**
     - Purpose: Show during route transitions
     - Elements: Progress bar or spinner
     - Location: `components/ui/loaders/page-transition-loader.tsx`
     - Usage: Next.js router events

### 9. **Data Fetching Loaders**
   - **`DataLoader`**
     - Purpose: Generic data loading indicator
     - Elements: Spinner with message
     - Location: `components/ui/loaders/data-loader.tsx`

---

## 🔵 Required: Skeleton Variants

### 10. **Skeleton Base Components**
   - **`Skeleton`** (Base component)
     - Purpose: Reusable skeleton base with pulse animation
     - Elements: Animated background
     - Location: `components/ui/skeletons/skeleton.tsx`
     - Props: `width`, `height`, `className`, `rounded`
   
   - **`SkeletonText`**
     - Purpose: Text line placeholder
     - Elements: Animated line(s)
     - Location: `components/ui/skeletons/skeleton-text.tsx`
     - Props: `lines`, `width`, `height`
   
   - **`SkeletonImage`**
     - Purpose: Image placeholder
     - Elements: Animated square/rectangle
     - Location: `components/ui/skeletons/skeleton-image.tsx`
     - Props: `width`, `height`, `rounded`

---

## 📋 Priority Order

### High Priority (Implement First)
1. ✅ `Skeleton` base component
2. ✅ `SkeletonText` component
3. ✅ `SkeletonImage` component
4. ✅ `ProductCardSkeleton` for `/product` page
5. ✅ `ServiceCardSkeleton` for `/service` page
6. ✅ `ProductHeroSkeleton` for `/product/[slug]/loading.tsx`
7. ✅ `ServiceHeroSkeleton` for `/service/[slug]/loading.tsx`
8. ✅ `ButtonLoader` for form submissions

### Medium Priority
9. `FeatureCardSkeleton`
10. `MissionCardSkeleton`
11. `SectionSkeleton`
12. `GridSkeleton`
13. `PageTransitionLoader`

### Low Priority (Nice to Have)
14. `TeamCardSkeleton`
15. `FormLoader`
16. `DataLoader`
17. `PerformanceMetricsSkeleton`
18. `AutomationHubSkeleton`

---

## 🎨 Design Requirements

### Visual Style
- Use **pulse animation** for skeleton loaders
- Match **primary green color** (rgba(19, 245, 132)) for loading indicators
- Use **dark background** matching `bg-dark`
- Maintain **border radius** consistent with product cards (32px)
- Use **blur effects** for glassmorphism style

### Animation
- **Skeleton pulse**: 2s ease-in-out infinite
- **Spinner rotation**: 1s linear infinite
- **Fade in/out**: 300ms ease-in-out

### Accessibility
- Add `aria-label="Loading..."` to all loaders
- Use `role="status"` for loading states
- Ensure proper color contrast

---

## 📁 Suggested File Structure

```
components/
  ui/
    skeletons/
      skeleton.tsx (base)
      skeleton-text.tsx
      skeleton-image.tsx
      hero-skeleton.tsx
      product-card-skeleton.tsx
      service-card-skeleton.tsx
      feature-card-skeleton.tsx
      mission-card-skeleton.tsx
      team-card-skeleton.tsx
      section-skeleton.tsx
      grid-skeleton.tsx
      feature-grid-skeleton.tsx
      youtube-video-skeleton.tsx
      performance-metrics-skeleton.tsx
      automation-hub-skeleton.tsx
    loaders/
      button-loader.tsx
      form-loader.tsx
      page-transition-loader.tsx
      data-loader.tsx
app/
  product/
    [slug]/
      loading.tsx
    page.tsx (loading state handled by Suspense)
  service/
    [slug]/
      loading.tsx
    page.tsx (loading state handled by Suspense)
```

---

## 🔧 Implementation Notes

1. **Next.js Loading States**: Use `loading.tsx` files for route-level loading
2. **Suspense Boundaries**: Wrap async components in Suspense with fallback
3. **Streaming**: Utilize React Server Components streaming for better UX
4. **Progressive Loading**: Show skeleton → partial content → full content
5. **Error Handling**: Combine with error boundaries for complete UX

---

## 📝 Usage Examples

### Route-Level Loading
```tsx
// app/product/[slug]/loading.tsx
export default function Loading() {
  return <ProductHeroSkeleton />
}
```

### Component-Level Loading
```tsx
// In a component
<Suspense fallback={<FeatureGridSkeleton />}>
  <FeatureGrid />
</Suspense>
```

### Button Loading
```tsx
<Button disabled={isLoading}>
  {isLoading ? <ButtonLoader /> : "Submit"}
</Button>
```





