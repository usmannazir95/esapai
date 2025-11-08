# Animation Plan: GSAP + Three.js/React Three Fiber Integration

## Overview
This document outlines a comprehensive animation strategy for all landing page sections using GSAP for 2D animations and Three.js/React Three Fiber for 3D elements.

## Dependencies to Install

```bash
npm install gsap @react-three/fiber @react-three/drei three
npm install --save-dev @types/three
```

## Animation Architecture

### 1. GSAP Setup & Configuration

Create a centralized GSAP configuration file:

**File: `lib/animations/gsap-config.ts`**
```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Global animation defaults
gsap.defaults({
  ease: "power2.out",
  duration: 1,
});

// Performance optimization
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger };
```

### 2. Three.js/React Three Fiber Setup

**File: `lib/animations/three-config.ts`**
```typescript
import * as THREE from "three";

// Shared Three.js configuration
export const threeConfig = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
  },
  renderer: {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
  },
};

// Performance monitoring
export const checkWebGLSupport = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
};
```

---

## Section-by-Section Animation Plan

### Section 1: Hero Section
**File: `components/sections/hero/hero.tsx`**

#### Current State
- Uses `motion/react` for animations
- Frame fade-out on scroll
- Circle breathing effect
- Box floating animation

#### GSAP Migration & Enhancements

**Animation Sequence:**
1. **Initial Load (0-1s)**
   - Frame: Fade in from top-left with rotation (0.8s)
   - Circle: Scale from 0.8 to 1 with glow pulse (1s)
   - Box: Fade in and float up (0.6s)
   - Badge: Slide up from bottom with fade (0.7s)
   - Title: Split text reveal (word-by-word, 1.2s)
   - Subtitle: Fade in with stagger (0.8s)
   - CTA Button: Scale up with bounce (0.6s, delay: 1.2s)

2. **Scroll Animations**
   - Frame: Fade out and scale down (scroll: 0-200px)
   - Circle: Parallax movement (slower scroll rate)
   - Content: Subtle parallax on text elements

3. **Three.js Integration**
   - **3D Background Particles**: Floating particles behind content
   - **Interactive 3D Logo**: Rotating ESAP logo (optional)

**Implementation:**
```typescript
// Hero animations hook
const useHeroAnimations = () => {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Frame animation
      tl.from(frameRef.current, {
        opacity: 0,
        x: -50,
        y: -50,
        rotation: -15,
        duration: 0.8,
      });

      // Circle breathing (continuous)
      gsap.to(circleRef.current, {
        scale: 1.08,
        opacity: 1,
        filter: "drop-shadow(0 0 50px rgba(19,245,132,0.7))",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Box floating
      tl.from(boxRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
      }, "-=0.4");
      gsap.to(boxRef.current, {
        y: -20,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Badge
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
      }, "-=0.3");

      // Title split text
      if (titleRef.current) {
        const words = titleRef.current.textContent?.split(" ") || [];
        titleRef.current.innerHTML = words
          .map((word) => `<span class="word">${word}</span>`)
          .join(" ");
        
        gsap.from(".word", {
          opacity: 0,
          y: 50,
          rotationX: -90,
          stagger: 0.1,
          duration: 0.8,
        });
      }

      // Subtitle
      tl.from(subtitleRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
      }, "-=0.5");

      // CTA Button
      tl.from(ctaRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.2");

      // Scroll animations
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Frame fade out
          gsap.to(frameRef.current, {
            opacity: 1 - progress,
            scale: 1 - progress * 0.2,
            duration: 0.1,
          });

          // Parallax circle
          gsap.to(circleRef.current, {
            y: progress * 100,
            scale: 1 + progress * 0.1,
            duration: 0.1,
          });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return {
    heroRef,
    frameRef,
    circleRef,
    boxRef,
    badgeRef,
    titleRef,
    subtitleRef,
    ctaRef,
  };
};
```

**Three.js Component:**
```typescript
// components/three/hero-particles.tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function HeroParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#13F584"
        transparent
        opacity={0.6}
      />
    </points>
  );
}
```

---

### Section 2: Mission Section
**File: `components/sections/about/mission.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Section header: Fade in + slide up (0.8s)
2. Cards: Staggered reveal from bottom with scale (0.6s each, 0.15s delay)
3. Card hover: 3D tilt effect with glow enhancement

**Implementation:**
```typescript
const useMissionAnimations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger animation
      gsap.from(cardsRef.current?.children || [], {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Card hover effects
      const cards = cardsRef.current?.children || [];
      Array.from(cards).forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef, headerRef, cardsRef };
};
```

---

### Section 3: Team Section
**File: `components/sections/about/team.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Header: Fade in + slide down (0.8s)
2. Top member (large card): Scale up from center (0.8s)
3. Middle row: Slide in from left/right (0.7s, stagger 0.2s)
4. Bottom row: Slide in from left/right (0.7s, stagger 0.2s)
5. Card hover: 3D flip effect with image zoom

**Three.js Integration:**
- Optional: 3D team member avatars (if images are 3D models)

**Implementation:**
```typescript
const useTeamAnimations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const middleRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Header
      tl.from(headerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
      });

      // Top card
      tl.from(topCardRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
      }, "-=0.4");

      // Middle row
      tl.from(middleRowRef.current?.children || [], {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -100 : 100),
        rotationY: (index) => (index % 2 === 0 ? -15 : 15),
        duration: 0.7,
        stagger: 0.2,
      }, "-=0.3");

      // Bottom row
      tl.from(bottomRowRef.current?.children || [], {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -100 : 100),
        rotationY: (index) => (index % 2 === 0 ? -15 : 15),
        duration: 0.7,
        stagger: 0.2,
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef, headerRef, topCardRef, middleRowRef, bottomRowRef };
};
```

---

### Section 4: Vision Section
**File: `components/sections/about/vision.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Header: Fade in with text reveal
2. Content: Parallax scroll effect
3. SVG elements: Animated path drawing
4. Icons: Rotate and scale on hover

**Three.js Integration:**
- 3D robot model (if available)
- Particle effects around vision elements

---

### Section 5: Service Section (Circular Brain Layout)
**File: `components/sections/features/home/service.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Header: Fade in (0.8s)
2. Brain: Pulse and rotate in (1s)
3. Ellipse: Scale up with glow (1.2s)
4. Service items: Orbit animation - items appear in sequence around brain
   - Each item: Fade in + scale from center (0.6s)
   - Stagger: 0.2s between items
5. Floor grid: Slide up from bottom (1s)
6. Hover: Service items move closer to center with glow

**Three.js Integration:**
- 3D brain model with neural network visualization
- 3D orbiting service nodes around brain
- Interactive hover effects with 3D depth

**Implementation:**
```typescript
const useServiceAnimations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);
  const ellipseRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<HTMLDivElement>(null);
  const floorGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Brain pulse and rotate
      tl.from(brainRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        duration: 1,
        ease: "back.out(1.5)",
      });

      // Continuous brain pulse
      gsap.to(brainRef.current, {
        scale: 1.05,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Ellipse glow
      tl.from(ellipseRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: "drop-shadow(0 0 0px rgba(19,245,132,0))",
        duration: 1.2,
      }, "-=0.5");
      gsap.to(ellipseRef.current, {
        filter: "drop-shadow(0 0 60px rgba(19,245,132,0.6))",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Service items orbit animation
      const items = serviceItemsRef.current?.children || [];
      Array.from(items).forEach((item, index) => {
        const angle = (index * 60) * (Math.PI / 180); // 60 degrees apart
        const radius = 450;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        tl.from(item, {
          opacity: 0,
          scale: 0,
          x: x,
          y: y,
          rotation: angle * (180 / Math.PI),
          duration: 0.6,
          ease: "back.out(1.5)",
        }, `-=${0.8 - index * 0.2}`);
      });

      // Floor grid
      tl.from(floorGridRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
      }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef, brainRef, ellipseRef, serviceItemsRef, floorGridRef };
};
```

**Three.js Service Brain:**
```typescript
// components/three/service-brain.tsx
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function ServiceBrain3D() {
  const brainRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, "/models/brain.glb"); // If available

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      brainRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={brainRef}>
      <primitive object={gltf.scene} scale={2} />
      {/* Neural network particles */}
      <NeuralNetwork />
    </group>
  );
}
```

---

### Section 6: Automation Hub
**File: `components/sections/features/product/automation-hub.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Header: Fade in + slide down (0.8s)
2. Feature cards: Staggered reveal with 3D flip effect
   - Cards flip from back to front (0.8s each, 0.2s stagger)
3. Card images: Scale up on reveal
4. Hover: 3D tilt with depth effect

**Three.js Integration:**
- 3D automation hub visualization
- Interactive 3D feature cards

**Implementation:**
```typescript
const useAutomationHubAnimations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards 3D flip animation
      const cards = cardsRef.current?.children || [];
      Array.from(cards).forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          rotationY: 90,
          x: index % 2 === 0 ? -100 : 100,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Hover 3D tilt
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            rotationY: 5,
            rotationX: -5,
            z: 20,
            scale: 1.05,
            duration: 0.3,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            z: 0,
            scale: 1,
            duration: 0.3,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef, cardsRef };
};
```

---

### Section 7: Performance Section
**File: `components/sections/features/product/performance-section.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Metrics: Count-up animation (0-100% or target value)
2. Charts/Graphs: Animated drawing
3. Cards: Staggered reveal with scale

**Three.js Integration:**
- 3D performance visualization
- Animated 3D charts

---

### Section 8: Product Features
**File: `components/sections/features/product/product-features.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Features: Staggered fade-in with slide
2. Icons: Rotate and scale on reveal
3. Hover: Glow effect with scale

---

### Section 9: Repetitive Work Section
**File: `components/sections/features/service/repetitive-work.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Content: Parallax scroll
2. Visual elements: Animated workflow diagram
3. Icons: Sequential reveal

---

### Section 10: Service Features
**File: `components/sections/features/service/service-features.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Features grid: Masonry-style reveal
2. Cards: Flip animation on scroll
3. Hover: 3D transform

---

### Section 11: World Map Section
**File: `components/sections/features/home/world-map-section.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Map: Fade in and zoom
2. Markers: Pop-in animation with pulse
3. Connections: Animated lines between points
4. Interactive: Hover effects on markers

**Three.js Integration:**
- 3D globe with markers
- Animated connection lines
- Interactive rotation

**Implementation:**
```typescript
// components/three/world-globe.tsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

export function WorldGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#13F584"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
      {/* Markers */}
      <Marker position={[1.5, 0.5, 0]} label="New York" />
      <Marker position={[-1.2, 0.8, 0.5]} label="London" />
      {/* Add more markers */}
    </>
  );
}
```

---

### Section 12: YouTube Video Section
**File: `components/sections/shared/youtube-video.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Video container: Scale up with fade (0.8s)
2. Play button: Pulse animation
3. Hover: Subtle scale and glow

---

### Section 13: Contact Section
**File: `components/sections/shared/contact-section.tsx`**

#### Animation Plan

**On Scroll Into View:**
1. Left column (text): Slide in from left (0.8s)
2. Right column (form): Slide in from right (0.8s)
3. Form fields: Staggered fade-in (0.5s each, 0.1s delay)
4. Social icons: Pop-in with rotation (0.4s each, 0.1s delay)
5. Form submission: Success animation

**Three.js Integration:**
- Optional: 3D background particles
- Form field focus: 3D depth effect

**Implementation:**
```typescript
const useContactAnimations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Left column
      tl.from(leftColRef.current, {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: "power2.out",
      });

      // Right column
      tl.from(rightColRef.current, {
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");

      // Form fields
      tl.from(formFieldsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
      }, "-=0.3");

      // Social icons
      tl.from(socialIconsRef.current?.children || [], {
        opacity: 0,
        scale: 0,
        rotation: -180,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef, leftColRef, rightColRef, formFieldsRef, socialIconsRef };
};
```

---

## Global Animation Utilities

### Scroll Progress Indicator
```typescript
// components/ui/scroll-progress.tsx
const useScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressRef.current) {
          gsap.to(progressRef.current, {
            width: `${self.progress * 100}%`,
            duration: 0.1,
          });
        }
      },
    });
  }, []);

  return progressRef;
};
```

### Page Transition Animations
```typescript
// lib/animations/page-transitions.ts
export const pageTransition = {
  fadeIn: (element: HTMLElement) => {
    gsap.from(element, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  },
  slideUp: (element: HTMLElement) => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    });
  },
};
```

### Reusable Animation Hooks
```typescript
// lib/hooks/use-scroll-reveal.ts
export const useScrollReveal = (
  ref: RefObject<HTMLElement>,
  options?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
        ...options,
      },
    });
  }, [ref, options]);
};
```

---

## Performance Optimization

### 1. Lazy Loading Three.js Components
```typescript
import dynamic from "next/dynamic";

const WorldGlobe = dynamic(() => import("@/components/three/world-globe"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
```

### 2. GSAP Performance Settings
```typescript
// Reduce repaints
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

// Use will-change CSS
gsap.set(".animated-element", {
  willChange: "transform, opacity",
});
```

### 3. ScrollTrigger Optimization
```typescript
// Batch ScrollTrigger updates
ScrollTrigger.batch(".card", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
    });
  },
});
```

### 4. Three.js Performance
```typescript
// Limit frame rate on low-end devices
const frameRate = window.devicePixelRatio > 2 ? 60 : 30;
useFrame((state, delta) => {
  // Throttle updates
}, { frameloop: "demand" });
```

---

## Implementation Priority

### Phase 1: Core GSAP Setup (Week 1)
1. Install dependencies
2. Create GSAP configuration
3. Migrate Hero section from motion/react to GSAP
4. Implement scroll animations

### Phase 2: Section Animations (Week 2)
1. Mission section
2. Team section
3. Service section
4. Contact section

### Phase 3: Three.js Integration (Week 3)
1. Hero particles
2. Service brain 3D model
3. World globe
4. Performance optimizations

### Phase 4: Polish & Optimization (Week 4)
1. Fine-tune timing
2. Performance testing
3. Mobile responsiveness
4. Accessibility considerations

---

## Accessibility Considerations

1. **Respect prefers-reduced-motion**
```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0.1);
  // Disable auto-play animations
}
```

2. **Keyboard Navigation**
   - Ensure all animated elements are keyboard accessible
   - Pause animations on focus

3. **Screen Readers**
   - Use `aria-live` for dynamic content
   - Provide alternative text for 3D visualizations

---

## Testing Checklist

- [ ] All animations work on initial load
- [ ] Scroll animations trigger at correct points
- [ ] Hover effects are smooth
- [ ] Mobile performance is acceptable
- [ ] Reduced motion preference is respected
- [ ] No layout shifts during animations
- [ ] Three.js components load correctly
- [ ] No console errors
- [ ] Performance metrics meet targets (60fps)

---

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Three.js Examples](https://threejs.org/examples/)
- [ScrollTrigger Guide](https://greensock.com/docs/v3/Plugins/ScrollTrigger)

