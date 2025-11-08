# SVG Animation Recommendations for Your Project

Based on your available SVGs and current setup, here are specific animation recommendations:

## 🎯 Priority Animations (High Impact)

### 1. **Hero Section SVGs** (`/landing/circle.svg`, `/landing/box.svg`, `/landing/frame.svg`)

**Current State:** Static images with basic opacity transitions

**Recommended Animations:**

#### **Circle SVG - Rotating Pulse Animation**
```typescript
// components/ui/animated-circle.tsx
"use client";
import { motion } from "motion/react";
import Image from "next/image";

export function AnimatedCircle() {
  return (
    <motion.div
      className="absolute top-[55%] left-1/2 -translate-x-1/2 z-0 pointer-events-none"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <Image
        src="/landing/circle.svg"
        alt="Circle decoration"
        width={600}
        height={608}
        className="w-auto h-auto"
        priority
      />
    </motion.div>
  );
}
```

#### **Box SVG - Floating & Glow Animation**
```typescript
// components/ui/animated-box.tsx
"use client";
import { motion } from "motion/react";
import Image from "next/image";

export function AnimatedBox() {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block w-full"
      animate={{
        y: [0, -20, 0],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src="/landing/box.svg"
        alt="Hexagonal icons decoration"
        width={100}
        height={100}
        className="w-full h-auto opacity-90 filter drop-shadow-[0_0_20px_rgba(19,245,132,0.3)]"
        priority
      />
    </motion.div>
  );
}
```

#### **Frame SVG - Draw-on-Scroll Animation**
```typescript
// components/ui/animated-frame.tsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

export function AnimatedFrame() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.8]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-20 pointer-events-none"
      style={{ opacity, scale }}
    >
      <Image
        src="/landing/frame.svg"
        alt="Frame decoration"
        width={300}
        height={300}
        className="w-auto h-auto"
        priority
      />
    </motion.div>
  );
}
```

### 2. **Vision Section Robot** (`/landing/vision/robot.svg`)

**Recommended: Interactive Robot Animation**

```typescript
// components/ui/animated-robot.tsx
"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export function AnimatedRobot() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative z-10 mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? [-10, 10, -10] : [0, -5, 0],
        rotate: isHovered ? [-2, 2, -2] : 0,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src="/landing/vision/robot.svg"
        alt="AI Robot icon"
        width={300}
        height={300}
        className="w-full h-full max-w-[250px] md:max-w-[300px] object-contain"
        priority
      />
    </motion.div>
  );
}
```

### 3. **Bot Light Glow** (`/landing/vision/Bot light.svg`)

**Recommended: Pulsing Glow Animation**

```typescript
// components/ui/animated-bot-light.tsx
"use client";
import { motion } from "motion/react";
import Image from "next/image";

export function AnimatedBotLight() {
  return (
    <motion.div
      className="absolute -top-40 left-1/2 -translate-x-1/2 z-0"
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src="/landing/vision/Bot light.svg"
        alt="Bot light glow"
        width={517}
        height={795}
        className="w-auto h-auto object-contain"
        priority
      />
    </motion.div>
  );
}
```

### 4. **Dot Circle** (`/landing/vision/Dot circle.svg`)

**Recommended: Rotating Dots Pattern**

```typescript
// components/ui/animated-dot-circle.tsx
"use client";
import { motion } from "motion/react";
import Image from "next/image";

export function AnimatedDotCircle() {
  return (
    <motion.div
      className="relative z-10 -mt-[280px] w-full flex items-center justify-center"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <Image
        src="/landing/vision/Dot circle.svg"
        alt="Radiating dots pattern"
        width={1200}
        height={800}
        className="w-full max-w-[1400px] object-contain"
      />
    </motion.div>
  );
}
```

### 5. **Product Icons** (`/products/*.svg`)

**Recommended: Staggered Entrance + Hover Effects**

```typescript
// components/ui/animated-product-icon.tsx
"use client";
import { motion } from "motion/react";
import Image from "next/image";

interface AnimatedProductIconProps {
  src: string;
  alt: string;
  delay?: number;
  size?: number;
}

export function AnimatedProductIcon({
  src,
  alt,
  delay = 0,
  size = 200,
}: AnimatedProductIconProps) {
  return (
    <motion.div
      className="relative w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        delay,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.2,
        rotate: 360,
        transition: { duration: 0.5 },
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-contain filter-glow-primary"
      />
    </motion.div>
  );
}
```

## 🎨 Advanced Animation Techniques

### 6. **Path Drawing for Complex SVGs**

If your SVGs contain paths, animate them drawing in:

```typescript
// For SVGs with paths - extract path data and animate
"use client";
import { motion } from "motion/react";

export function AnimatedSVGPath({ pathData }: { pathData: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <motion.path
        d={pathData}
        fill="none"
        stroke="rgba(19, 245, 132, 1)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
```

### 7. **Scroll-Triggered Animations**

Animate SVGs as they enter the viewport:

```typescript
// components/ui/scroll-animated-svg.tsx
"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

export function ScrollAnimatedSVG({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Image src={src} alt={alt} width={300} height={300} />
    </motion.div>
  );
}
```

### 8. **Gradient Animation on SVGs**

Animate gradient fills for dynamic color effects:

```typescript
// components/ui/gradient-animated-svg.tsx
"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function GradientAnimatedSVG() {
  const [gradientOffset, setGradientOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientOffset((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset={`${gradientOffset}%`}
            stopColor="rgba(19, 245, 132, 1)"
          />
          <stop
            offset={`${(gradientOffset + 50) % 100}%`}
            stopColor="rgba(19, 245, 132, 0.3)"
          />
        </linearGradient>
      </defs>
      {/* Use gradient in your SVG paths */}
    </svg>
  );
}
```

### 9. **Morphing Shapes**

Transform between different SVG shapes:

```typescript
// components/ui/morphing-svg.tsx
"use client";
import { motion } from "motion/react";

export function MorphingSVG() {
  const shapes = [
    "M 50,50 m -30,0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0", // Circle
    "M 50,10 L 60,40 L 90,40 L 70,60 L 80,90 L 50,70 L 20,90 L 30,60 L 10,40 L 40,40 Z", // Star
    "M 50,10 L 90,90 L 10,90 Z", // Triangle
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <motion.path
        d={shapes[0]}
        fill="rgba(19, 245, 132, 0.5)"
        animate={{
          d: shapes,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
```

### 10. **Particle Effects on SVGs**

Add animated particles around SVGs:

```typescript
// components/ui/particle-svg.tsx
"use client";
import { motion } from "motion/react";
import Image from "next/image";

export function ParticleSVG({ src, alt }: { src: string; alt: string }) {
  const particles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="relative">
      <Image src={src} alt={alt} width={300} height={300} />
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [
              0,
              Math.cos((i / particles.length) * Math.PI * 2) * 100,
              Math.cos((i / particles.length) * Math.PI * 2) * 50,
              0,
            ],
            y: [
              0,
              Math.sin((i / particles.length) * Math.PI * 2) * 100,
              Math.sin((i / particles.length) * Math.PI * 2) * 50,
              0,
            ],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
```

## 📋 Implementation Priority

### Phase 1: Quick Wins (1-2 hours)
1. ✅ Animate Hero Circle (rotating pulse)
2. ✅ Animate Hero Box (floating)
3. ✅ Animate Bot Light (pulsing glow)

### Phase 2: Medium Impact (2-4 hours)
4. ✅ Animate Robot (interactive hover)
5. ✅ Animate Dot Circle (rotation)
6. ✅ Add scroll-triggered animations to product icons

### Phase 3: Advanced (4-8 hours)
7. ✅ Path drawing for complex SVGs
8. ✅ Gradient animations
9. ✅ Particle effects
10. ✅ Morphing shapes

## 🎯 Performance Tips

1. **Use `will-change` CSS property** for animated elements
2. **Animate `transform` and `opacity` only** (GPU-accelerated)
3. **Use `useInView`** to only animate when visible
4. **Limit simultaneous animations** to prevent jank
5. **Use `initial={false}`** for components that mount frequently

## 🔧 Quick Implementation Example

Here's a complete example you can drop into your Hero component:

```typescript
// Update components/sections/hero/hero.tsx
"use client";
import { motion } from "motion/react";
import Image from "next/image";
// ... other imports

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden -mt-0">
      {/* Animated Circle */}
      <motion.div
        className="absolute top-[55%] left-1/2 -translate-x-1/2 z-0 pointer-events-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Image
          src="/landing/circle.svg"
          alt="Circle decoration"
          width={600}
          height={608}
          className="w-auto h-auto"
          priority
        />
      </motion.div>

      {/* Animated Box */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block w-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/landing/box.svg"
          alt="Hexagonal icons decoration"
          width={100}
          height={100}
          className="w-full h-auto opacity-90 filter drop-shadow-[0_0_20px_rgba(19,245,132,0.3)]"
          priority
        />
      </motion.div>

      {/* Rest of your hero content */}
    </section>
  );
}
```

## 📚 Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [SVG Path Animation Guide](https://css-tricks.com/svg-path-animation/)
- [Performance Best Practices](https://web.dev/animations/)

---

**Next Steps:** Start with Phase 1 animations for immediate visual impact, then gradually add more sophisticated effects!

