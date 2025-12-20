/**
 * Contact form type definitions
 */

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

export type SubmissionState = "idle" | "sending" | "success" | "error";
