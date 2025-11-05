"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useProductMenu } from "./product-menu-context";
import { useServiceMenu } from "./service-menu-context";
import { ProductDropdownMenu } from "./product-dropdown-menu";
import { ServiceDropdownMenu } from "./service-dropdown-menu";

export function Navbar() {
  const { isProductOpen, setIsProductOpen } = useProductMenu();
  const { isServiceOpen, setIsServiceOpen } = useServiceMenu();
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  
  // Floating navbar state
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollThreshold] = useState(100); // Minimum scroll distance to trigger hide/show

  useEffect(() => {
    function handleProductClickOutside(event: MouseEvent) {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductOpen(false);
      }
    }

    if (isProductOpen) {
      document.addEventListener("mousedown", handleProductClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleProductClickOutside);
    };
  }, [isProductOpen, setIsProductOpen]);

  useEffect(() => {
    function handleServiceClickOutside(event: MouseEvent) {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceOpen(false);
      }
    }

    if (isServiceOpen) {
      document.addEventListener("mousedown", handleServiceClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleServiceClickOutside);
    };
  }, [isServiceOpen, setIsServiceOpen]);

  // Floating navbar scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the top
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, scrollThreshold]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="mx-auto max-w-3xl bg-white-opacity-10 backdrop-blur-lg rounded-[40px] pl-8 pr-2 py-2">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 cursor-pointer">
              <Image
                src="/logo/esaplogo.svg"
                alt="ESAP Logo"
                width={65}
                height={21}
                className="h-auto"
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
              <Link
                href="/"
                className="text-light-gray hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
              >
                Home
              </Link>
              {/* Product Dropdown */}
              <div className="relative" ref={productDropdownRef}>
                <button
                  onClick={() => setIsProductOpen(!isProductOpen)}
                  className="text-light-gray hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
                >
                  Product
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      isProductOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ProductDropdownMenu />
              </div>
              {/* Service Dropdown */}
              <div className="relative" ref={serviceDropdownRef}>
                <button
                  onClick={() => setIsServiceOpen(!isServiceOpen)}
                  className="text-light-gray hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
                >
                  Service
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      isServiceOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ServiceDropdownMenu />
              </div>
              <Link
                href="/about"
                className="text-light-gray hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-light-gray hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
              >
                Contact Us
              </Link>
            </div>

            {/* Sign Up Button */}
            <div className="shrink-0">
              <Button variant="signup" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

