"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Music,
} from "lucide-react";

const socialMediaLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "TikTok", icon: Music, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "X", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
];

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setIsSubmitting(true);
    // TODO: Implement form submission logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    // Reset form
    setFormData({ fullName: "", email: "", message: "" });
    setAgreedToTerms(false);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Green Gradient Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-gradient-to-b from-primary via-primary/20 to-transparent opacity-30 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Column - Contact Information */}
            <div className="lg:col-span-3 space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-light-gray block">Contact us today.</span>
                  <span className="text-primary block">We&apos;re ready</span>
                  <span className="text-primary block">to assist you.</span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-light-gray-90 text-lg md:text-xl max-w-2xl">
                Whether you have a question, a comment, or just want to say hello,
                please don&apos;t hesitate to get in touch.
              </p>

              {/* Social Media Section */}
              <div className="space-y-6 pt-8">
                <h2 className="text-primary text-xl md:text-2xl font-semibold">
                  Get in touch On social media
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                  {socialMediaLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white border-2 border-white transition-all duration-300 hover:bg-primary hover:border-primary hover:scale-110 shadow-md"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-black group-hover:text-primary-dark transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="relative product-card p-6 md:p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="text-light-gray text-sm md:text-base font-medium block"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="ex:"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white-opacity-10 border border-white-opacity-20 text-light-gray placeholder:text-white-opacity-25 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-light-gray text-sm md:text-base font-medium block"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ex:"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white-opacity-10 border border-white-opacity-20 text-light-gray placeholder:text-white-opacity-25 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-light-gray text-sm md:text-base font-medium block"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="ex:"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white-opacity-10 border border-white-opacity-20 text-light-gray placeholder:text-white-opacity-25 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!agreedToTerms || isSubmitting}
                    className="w-full py-6 rounded-lg text-base md:text-lg font-semibold shadow-lg shadow-primary-30 hover:shadow-primary-50 transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-3 pt-2">
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
                        href="#"
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

