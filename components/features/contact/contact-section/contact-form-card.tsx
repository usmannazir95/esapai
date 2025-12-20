"use client";

import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import type { ChangeEvent, FormEvent } from "react";

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

export type SubmissionState = "idle" | "sending" | "success" | "error";

export const ContactFormCard = forwardRef<
  HTMLDivElement,
  {
    formData: ContactFormData;
    agreedToTerms: boolean;
    isSubmitting: boolean;
    submissionMessage: string;
    submissionState: SubmissionState;
    onInputChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onAgreedToTermsChange: (checked: boolean) => void;
  }
>(function ContactFormCard(
  {
    formData,
    agreedToTerms,
    isSubmitting,
    submissionMessage,
    submissionState,
    onInputChange,
    onSubmit,
    onAgreedToTermsChange,
  },
  ref
) {
  return (
    <div className="lg:col-span-2 w-full">
      <div
        ref={ref}
        className="contact-form-card p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl"
      >
        <form onSubmit={onSubmit} className="space-y-6">
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
          <div data-gsap="contact-form-item" className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => onAgreedToTermsChange(e.target.checked)}
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
  );
});



