"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CookieConsentStatus = "pending" | "accepted" | "rejected";

interface CookieConsentContextType {
  consentStatus: CookieConsentStatus;
  acceptCookies: () => void;
  rejectCookies: () => void;
  hasConsented: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

const COOKIE_CONSENT_KEY = "esapai-cookie-consent";
const COOKIE_CONSENT_EXPIRY_DAYS = 365;

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>("pending");
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check for existing consent in localStorage
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (storedConsent) {
      try {
        const consent = JSON.parse(storedConsent);
        const expiryDate = new Date(consent.expiry);
        
        // Check if consent has expired
        if (expiryDate > new Date()) {
          setConsentStatus(consent.status);
          setHasConsented(consent.status === "accepted");
        } else {
          // Consent expired, reset to pending
          localStorage.removeItem(COOKIE_CONSENT_KEY);
          setConsentStatus("pending");
          setHasConsented(false);
        }
      } catch (error) {
        // Invalid stored consent, reset
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        setConsentStatus("pending");
        setHasConsented(false);
      }
    }
  }, []);

  const acceptCookies = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);
    
    const consent = {
      status: "accepted" as const,
      expiry: expiryDate.toISOString(),
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setConsentStatus("accepted");
    setHasConsented(true);
  };

  const rejectCookies = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);
    
    const consent = {
      status: "rejected" as const,
      expiry: expiryDate.toISOString(),
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setConsentStatus("rejected");
    setHasConsented(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consentStatus,
        acceptCookies,
        rejectCookies,
        hasConsented,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}

