"use client";

import Image from "next/image";
import { forwardRef, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

export const ContactLeftColumn = forwardRef<
  HTMLDivElement,
  {
    socialLinks: ReadonlyArray<{ name: string; iconPath: string; href: string }>;
  }
>(function ContactLeftColumn({ socialLinks }, ref) {
  const socialIconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Hover effect for social icons - scale, rotation, and background
  const handleSocialHover = (index: number, isEntering: boolean) => {
    if (prefersReducedMotion()) return;
    
    const icon = socialIconRefs.current[index];
    if (!icon) return;
    
    if (isEntering) {
      gsap.to(icon, {
        scale: 1.15,
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
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    }
  };

  return (
    <div ref={ref} className="lg:col-span-3 space-y-6 md:space-y-8">
      {/* Main Heading */}
      <div className="space-y-4">
        <h1
          data-gsap="contact-left-item"
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gradient-primary"
        >
          <span className="block">Contact us today.</span>
          <span className="block">We&apos;re ready</span>
          <span className="block">to assist you.</span>
        </h1>
      </div>

      {/* Description */}
      <p
        data-gsap="contact-left-item"
        className="text-light-gray-90 text-lg md:text-xl max-w-2xl"
      >
        Whether you have a question, a comment, or just want to say hello, please
        don&apos;t hesitate to get in touch.
      </p>

      {/* Social Media Section */}
      <div className="space-y-6 pt-8">
        <h2
          data-gsap="contact-left-item"
          className="text-gradient-primary text-xl md:text-2xl font-semibold"
        >
          Get in touch On social media
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              ref={(el) => { socialIconRefs.current[index] = el; }}
              data-gsap="contact-social-icon"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-shadow duration-300"
              style={{ willChange: "transform, background-color" }}
              aria-label={social.name}
              onMouseEnter={() => handleSocialHover(index, true)}
              onMouseLeave={() => handleSocialHover(index, false)}
            >
              <span
                data-gsap="contact-social-float"
                className="inline-flex items-center justify-center"
              >
                <Image
                  src={social.iconPath}
                  alt={`${social.name} icon`}
                  width={24}
                  height={24}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});



