"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, MutableRefObject } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Frame from "@/components/sections/shared/frame";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useIntersectionAnimation } from "@/lib/hooks/use-intersection-animation";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

const socialMediaLinks = [
  {
    name: "Facebook",
    iconPath: "/contact/cfacebook.svg",
    href: "https://www.facebook.com/esapai.official/",
  },
  {
    name: "Instagram",
    iconPath: "/contact/cinstagram.svg",
    href: "https://www.instagram.com/esapai.official/",
  },
  {
    name: "LinkedIn",
    iconPath: "/contact/clinkedin.svg",
    href: "https://www.linkedin.com/company/esapai/",
  },
  { name: "X", iconPath: "/contact/xc.svg", href: "https://x.com/esap_ai" },
  {
    name: "YouTube",
    iconPath: "/contact/xyoutube.svg",
    href: "https://www.youtube.com/channel/UC7LyRbfXwb7at1gCQpUMzGg",
  },
];

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const leftHasAnimatedRef = useRef(false);
  const socialFloatTweensRef = useRef<gsap.core.Tween[]>([]);

  // Intersection observer to trigger animations when in view
  const { ref: intersectionRef, isInView } = useIntersectionAnimation({
    threshold: 0.15,
    rootMargin: "100px",
  });

  // Separate observer for the left content (title + social section)
  const { ref: leftIntersectionRef, isInView: isLeftInView } = useIntersectionAnimation({
    threshold: 0.15,
    rootMargin: "100px",
  });

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string>("");
  const [submissionState, setSubmissionState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setSubmissionState("error");
      setSubmissionMessage("Please accept the terms to continue.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionState("sending");
    setSubmissionMessage("Sending your message…");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = (await response.json()) as { success: boolean; message: string };

      if (data.success) {
        setSubmissionState("success");
        setSubmissionMessage("Thanks! We received your message.");
        setFormData({ fullName: "", email: "", message: "" });
        setAgreedToTerms(false);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(
        error instanceof Error ? error.message : "Unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set initial states once to prevent flash (only for non-reduced motion users)
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (!formCardRef.current) return;

    const items = formCardRef.current.querySelectorAll<HTMLElement>(
      '[data-gsap="contact-form-item"]'
    );

    gsap.set(formCardRef.current, { opacity: 0, y: 28, scale: 0.98 });
    gsap.set(items, { opacity: 0, y: 16 });
  }, { scope: sectionRef });

  // Left column initial states (title + social) - only for non-reduced motion users
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (!leftColumnRef.current) return;

    const leftItems = leftColumnRef.current.querySelectorAll<HTMLElement>(
      '[data-gsap="contact-left-item"]'
    );
    const socialIcons = leftColumnRef.current.querySelectorAll<HTMLElement>(
      '[data-gsap="contact-social-icon"]'
    );

    gsap.set(leftItems, { opacity: 0, y: 22 });
    gsap.set(socialIcons, { opacity: 0, y: 12, scale: 0.92 });
  }, { scope: sectionRef });

  // Entrance animation when the form card scrolls into view (plays once)
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (!formCardRef.current) return;
    if (hasAnimatedRef.current) return;

    // If IntersectionObserver hasn't fired yet, fall back to a simple viewport check
    const rect = formCardRef.current.getBoundingClientRect();
    const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isInView && !isCurrentlyVisible) return;

    hasAnimatedRef.current = true;

    const items = formCardRef.current.querySelectorAll<HTMLElement>(
      '[data-gsap="contact-form-item"]'
    );

    const tl = gsap.timeline();
    tl.to(formCardRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    }).to(
      items,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      },
      "-=0.45"
    );
  }, { scope: sectionRef, dependencies: [isInView] });

  // Entrance animation for left column (plays once)
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (!leftColumnRef.current) return;
    if (leftHasAnimatedRef.current) return;

    // Fallback visibility check in case IntersectionObserver hasn't fired yet
    const rect = leftColumnRef.current.getBoundingClientRect();
    const isCurrentlyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isLeftInView && !isCurrentlyVisible) return;

    leftHasAnimatedRef.current = true;

    const leftItems = leftColumnRef.current.querySelectorAll<HTMLElement>(
      '[data-gsap="contact-left-item"]'
    );
    const socialIcons = leftColumnRef.current.querySelectorAll<HTMLElement>(
      '[data-gsap="contact-social-icon"]'
    );
    const socialFloatTargets = leftColumnRef.current.querySelectorAll<HTMLElement>(
      '[data-gsap="contact-social-float"]'
    );

    const tl = gsap.timeline();
    tl.to(leftItems, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.08,
    }).to(
      socialIcons,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.06,
      },
      "-=0.25"
    ).add(() => {
      // Start floating after a short delay (and only once).
      // Important: float targets are inner wrappers so hover scale on <a> is unaffected.
      if (prefersReducedMotion()) return;
      if (socialFloatTweensRef.current.length > 0) return;
      if (socialFloatTargets.length === 0) return;

      const tweens: gsap.core.Tween[] = [];
      socialFloatTargets.forEach((el) => {
        // Subtle variance per icon for a more organic feel
        const amplitude = gsap.utils.random(6, 10);
        const duration = gsap.utils.random(2.2, 3.2);
        const phaseDelay = gsap.utils.random(0, 0.4);

        const tween = gsap.to(el, {
          y: -amplitude,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.0 + phaseDelay, // "after a certain timer"
          force3D: true,
          paused: true, // start after the delayedPlay call below
        });
        tweens.push(tween);
      });

      socialFloatTweensRef.current = tweens;

      // Play all float tweens together after the configured delay
      gsap.delayedCall(1.0, () => {
        socialFloatTweensRef.current.forEach((tween) => tween.play());
      });
    }, "+=0.05");
  }, { scope: sectionRef, dependencies: [isLeftInView] });

  // Pause/resume floating icons based on visibility
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tweens = socialFloatTweensRef.current;
    if (tweens.length === 0) return;

    if (!isLeftInView) {
      tweens.forEach((tween) => tween.pause());
    } else {
      tweens.forEach((tween) => tween.resume());
    }
  }, [isLeftInView]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
    >
      {/* Animated Frame Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-35">
          <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-transparent to-dark/80" />
      </div>

      {/* Green Gradient Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-gradient-to-b from-primary via-primary/20 to-transparent opacity-30 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start lg:items-center">
            {/* Left Column - Contact Information */}
            <div
              ref={(node) => {
                if (!node) return;
                leftColumnRef.current = node;
                (leftIntersectionRef as MutableRefObject<HTMLElement | null>).current = node;
              }}
              className="lg:col-span-3 space-y-6 md:space-y-8"
            >
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
                Whether you have a question, a comment, or just want to say
                hello, please don&apos;t hesitate to get in touch.
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
                  {socialMediaLinks.map((social) => (
                    <a
                      key={social.name}
                      data-gsap="contact-social-icon"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                      aria-label={social.name}
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

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2 w-full">
              <div
                ref={(node) => {
                  if (!node) return;
                  formCardRef.current = node;
                  (intersectionRef as MutableRefObject<HTMLElement | null>).current = node;
                }}
                className="contact-form-card p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Field */}
                  <div data-gsap="contact-form-item" className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="text-white-opacity-70 text-xs md:text-sm font-semibold tracking-wide block"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="contact-input w-full px-4 py-3 md:py-3.5 text-light-gray"
                    />
                  </div>

                  {/* Email Field */}
                  <div data-gsap="contact-form-item" className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-white-opacity-70 text-xs md:text-sm font-semibold tracking-wide block"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      required
                      className="contact-input w-full px-4 py-3 md:py-3.5 text-light-gray"
                    />
                  </div>

                  {/* Message Field */}
                  <div data-gsap="contact-form-item" className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-white-opacity-70 text-xs md:text-sm font-semibold tracking-wide block"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      rows={5}
                      className="contact-input w-full px-4 py-3 md:py-3.5 text-light-gray resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div data-gsap="contact-form-item">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={!agreedToTerms || isSubmitting}
                      className="w-full py-6 rounded-[40px] text-base md:text-lg font-semibold shadow-lg shadow-primary-30 hover:shadow-primary-50 transition-all"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>

                  {submissionMessage && (
                    <p
                      className={`text-sm ${
                        submissionState === "error"
                          ? "text-red-400"
                          : submissionState === "success"
                            ? "text-primary"
                            : "text-light-gray-90"
                      }`}
                    >
                      {submissionMessage}
                    </p>
                  )}

                  {/* Terms and Conditions */}
                  <div
                    data-gsap="contact-form-item"
                    className="flex items-start gap-3 pt-2"
                  >
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      required
                      className="mt-1 w-5 h-5 rounded border-white-opacity-20 bg-white-opacity-10 text-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 cursor-pointer accent-primary"
                    />
                    <label
                      htmlFor="terms"
                      className="text-light-gray-90 text-sm md:text-base cursor-pointer"
                    >
                      By submitting, I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ESAP Terms of Conditions
                      </a>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
