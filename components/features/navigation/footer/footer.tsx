"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useInView } from "motion/react";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

const socialIcons = [
  {
    name: "Facebook",
    iconPath: "/contact/cfacebook.svg",
    href: "https://www.facebook.com/esapai.official/",
  },
  { name: "X", iconPath: "/contact/xc.svg", href: "https://x.com/esap_ai" },
  {
    name: "LinkedIn",
    iconPath: "/contact/clinkedin.svg",
    href: "https://www.linkedin.com/company/esapai/",
  },
  {
    name: "Instagram",
    iconPath: "/contact/cinstagram.svg",
    href: "https://www.instagram.com/esapai.official/",
  },
  {
    name: "YouTube",
    iconPath: "/contact/xyoutube.svg",
    href: "https://www.youtube.com/channel/UC7LyRbfXwb7at1gCQpUMzGg",
  },
];

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Case Study", href: "/case-study" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const navSectionRef = useRef<HTMLDivElement>(null);
  const navLinksRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const socialSectionRef = useRef<HTMLDivElement>(null);
  const socialIconsRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  // GSAP Entrance Animations
  useGSAP(() => {
    if (!isInView || prefersReducedMotion()) {
      // Set initial state for reduced motion
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 1 });
      if (descriptionRef.current) gsap.set(descriptionRef.current, { opacity: 1 });
      navLinksRefs.current.forEach((link) => {
        if (link) gsap.set(link, { opacity: 1 });
      });
      socialIconsRefs.current.forEach((icon) => {
        if (icon) gsap.set(icon, { opacity: 1 });
      });
      if (bottomBarRef.current) gsap.set(bottomBarRef.current, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Logo section - fade + slide up
    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 0, y: 20 });
      tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0);
    }

    // Description - fade in
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0 });
      tl.to(descriptionRef.current, { opacity: 1, duration: 0.6 }, 0.1);
    }

    // Navigation section - staggered links
    if (navSectionRef.current) {
      const links = navLinksRefs.current.filter(Boolean);
      links.forEach((link) => {
        if (link) gsap.set(link, { opacity: 0, x: -10 });
      });
      tl.to(links, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.05,
      }, 0.2);
    }

    // Social section - staggered icons
    if (socialSectionRef.current) {
      const icons = socialIconsRefs.current.filter(Boolean);
      icons.forEach((icon) => {
        if (icon) gsap.set(icon, { opacity: 0, scale: 0.8 });
      });
      tl.to(icons, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
      }, 0.4);
    }

    // Bottom bar - fade in last
    if (bottomBarRef.current) {
      gsap.set(bottomBarRef.current, { opacity: 0 });
      tl.to(bottomBarRef.current, { opacity: 1, duration: 0.6 }, 0.6);
    }
  }, { scope: footerRef, dependencies: [isInView] });

  // Hover effect for navigation links - animated underline
  const handleLinkHover = (index: number, isEntering: boolean) => {
    if (prefersReducedMotion()) return;

    const link = navLinksRefs.current[index];
    if (!link) return;

    if (isEntering) {
      gsap.to(link, {
        color: "#13F584",
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(link, {
        color: "rgba(255, 255, 255, 0.9)",
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  // Hover effect for social icons - scale, glow, rotation
  const handleSocialHover = (index: number, isEntering: boolean) => {
    if (prefersReducedMotion()) return;

    const icon = socialIconsRefs.current[index];
    if (!icon) return;

    if (isEntering) {
      gsap.to(icon, {
        scale: 1.1,
        rotation: 5,
        backgroundColor: "#13F584",
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    } else {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    }
  };

  // Logo hover effect
  const handleLogoHover = (isEntering: boolean) => {
    if (prefersReducedMotion() || !logoRef.current) return;

    if (isEntering) {
      gsap.to(logoRef.current, {
        scale: 1.05,
        filter: "drop-shadow(0 0 10px rgba(19, 245, 132, 0.3))",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(logoRef.current, {
        scale: 1,
        filter: "drop-shadow(0 0 0px rgba(19, 245, 132, 0))",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="w-full mt-auto bg-transparent relative"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 100%)"
      }}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
            {/* Logo and Description */}
            <div className="space-y-3 sm:space-y-4">
              <Link
                ref={logoRef}
                href="/"
                className="inline-block"
                onMouseEnter={() => handleLogoHover(true)}
                onMouseLeave={() => handleLogoHover(false)}
              >
                <Image
                  src="/logo/esaplogo.svg"
                  alt="ESAP Logo"
                  width={100}
                  height={32}
                  className="h-auto w-auto max-w-[80px] sm:max-w-[100px]"
                />
              </Link>
              <p ref={descriptionRef} className="text-light-gray-90 text-xs sm:text-sm md:text-base max-w-xs">
                Smartly Built for What&apos;s Next. Where Innovation Meets
                Productivity.
              </p>
            </div>

            {/* Navigation Links */}
            <div ref={navSectionRef} className="space-y-3 sm:space-y-4">
              <h3 className="text-premium-gradient font-semibold text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-2 sm:gap-3">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    ref={(el) => { navLinksRefs.current[index] = el; }}
                    href={link.href}
                    className="text-premium-body hover:text-primary text-xs sm:text-sm md:text-base w-fit relative"
                    onMouseEnter={() => handleLinkHover(index, true)}
                    onMouseLeave={() => handleLinkHover(index, false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Media */}
            <div ref={socialSectionRef} className="space-y-3 sm:space-y-4">
              <h3 className="text-premium-gradient font-semibold text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                Connect With Us
              </h3>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {socialIcons.map((icon, index) => (
                  <a
                    key={icon.name}
                    ref={(el) => { socialIconsRefs.current[index] = el; }}
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white-opacity-10 border border-white-opacity-25 transition-shadow duration-300"
                    style={{ willChange: "transform, background-color" }}
                    aria-label={icon.name}
                    onMouseEnter={() => handleSocialHover(index, true)}
                    onMouseLeave={() => handleSocialHover(index, false)}
                  >
                    <Image
                      src={icon.iconPath}
                      alt={icon.name}
                      width={20}
                      height={20}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div ref={bottomBarRef} className="pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-light-gray-90 text-xs sm:text-sm text-center sm:text-left">
                © {new Date().getFullYear()} ESAP. All rights reserved.
              </p>
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                <Link
                  href="/privacy"
                  className="text-light-gray-90 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-white-opacity-20">|</span>
                <Link
                  href="/terms"
                  className="text-light-gray-90 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
