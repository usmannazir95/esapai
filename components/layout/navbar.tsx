"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useProductMenu } from "./product-menu-context";
import { useServiceMenu } from "./service-menu-context";
import { ProductDropdownMenu } from "./product-dropdown-menu";
import { ServiceDropdownMenu } from "./service-dropdown-menu";

export function Navbar() {
  const pathname = usePathname();
  const { isProductOpen, setIsProductOpen } = useProductMenu();
  const { isServiceOpen, setIsServiceOpen } = useServiceMenu();
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  
  // Floating navbar state
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollThreshold] = useState(100); // Minimum scroll distance to trigger hide/show
  
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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

  const productActive = isProductOpen || isActive("/product");
  const serviceActive = isServiceOpen || isActive("/service");

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4 md:py-5">
          <div className="mx-auto w-full max-w-5xl bg-white-opacity-10 backdrop-blur-lg rounded-[40px] pl-4 sm:pl-6 md:pl-8 pr-2 py-2 sm:py-2.5 md:py-3">
            <div className="flex items-center justify-between gap-4 sm:gap-6 md:gap-8">
              {/* Logo */}
              <Link 
                href="/" 
                className="flex items-center gap-2 shrink-0 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/logo/esaplogo.svg"
                  alt="ESAP Logo"
                  width={65}
                  height={21}
                  className="h-auto w-auto max-w-[50px] sm:max-w-[65px]"
                />
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
                <Link
                  href="/"
                  className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive("/")
                      ? "is-active text-primary"
                      : "text-light-gray hover:text-primary"
                  }`}
                >
                  <span className="nav-glow" aria-hidden="true" />
                  <span className="relative z-10">Home</span>
                </Link>
                {/* Product Dropdown */}
                <div className="relative" ref={productDropdownRef}>
                  <button
                    onClick={() => setIsProductOpen(!isProductOpen)}
                    className={`nav-link-group relative group whitespace-nowrap flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                      productActive
                        ? "is-active text-primary"
                        : "text-light-gray hover:text-primary"
                    }`}
                  >
                    <span className="nav-glow" aria-hidden="true" />
                    <span className="relative z-10">Product</span>
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 relative z-10 ${
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
                    className={`nav-link-group relative group whitespace-nowrap flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                      serviceActive
                        ? "is-active text-primary"
                        : "text-light-gray hover:text-primary"
                    }`}
                  >
                    <span className="nav-glow" aria-hidden="true" />
                    <span className="relative z-10">Service</span>
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 relative z-10 ${
                        isServiceOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <ServiceDropdownMenu />
                </div>
                <Link
                  href="/about"
                  className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive("/about")
                      ? "is-active text-primary"
                      : "text-light-gray hover:text-primary"
                  }`}
                >
                  <span className="nav-glow" aria-hidden="true" />
                  <span className="relative z-10">About Us</span>
                </Link>
                <Link
                  href="/case-study"
                  className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive("/case-study")
                      ? "is-active text-primary"
                      : "text-light-gray hover:text-primary"
                  }`}
                >
                  <span className="nav-glow" aria-hidden="true" />
                  <span className="relative z-10">Case Study</span>
                </Link>
                <Link
                  href="/contact"
                  className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive("/contact")
                      ? "is-active text-primary"
                      : "text-light-gray hover:text-primary"
                  }`}
                >
                  <span className="nav-glow" aria-hidden="true" />
                  <span className="relative z-10">Contact Us</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-light-gray hover:text-primary transition-colors duration-300"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-white-opacity-10 backdrop-blur-lg shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo/esaplogo.svg"
                alt="ESAP Logo"
                width={65}
                height={21}
                className="h-auto"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-light-gray hover:text-primary transition-colors duration-300"
              aria-label="Close mobile menu"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex flex-col flex-1 p-4 sm:p-6 overflow-y-auto">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-lg font-medium">Home</span>
            </Link>

            <Link
              href="/product"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/product")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-lg font-medium">Product</span>
            </Link>

            <Link
              href="/service"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/service")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-lg font-medium">Service</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/about")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-lg font-medium">About Us</span>
            </Link>

            <Link
              href="/case-study"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/case-study")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-lg font-medium">Case Study</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/contact")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-lg font-medium">Contact Us</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

