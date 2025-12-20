"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { useBodyScrollLock } from "@/lib/hooks/use-body-scroll-lock";

import { ProductDropdownMenu } from "../menus/product-dropdown-menu";
import { ServiceDropdownMenu } from "../menus/service-dropdown-menu";
import { useProductMenu } from "../menus/product-menu-context";
import { useServiceMenu } from "../menus/service-menu-context";
import { MobileAccordion, type MobileMenuItem } from "./mobile-accordion";

function NavLinkItem({
  href,
  label,
  isActive,
  onClick,
  className = "",
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
        isActive ? "is-active text-primary" : "text-light-gray hover:text-primary"
      } ${className}`}
      onClick={onClick}
    >
      <span className="nav-glow" aria-hidden="true" />
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

function NavDropdownTrigger({
  label,
  isActive,
  isOpen,
  onClick,
}: {
  label: string;
  isActive: boolean;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`nav-link-group relative group whitespace-nowrap flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
        isActive ? "is-active text-primary" : "text-light-gray hover:text-primary"
      }`}
      aria-expanded={isOpen}
    >
      <span className="nav-glow" aria-hidden="true" />
      <span className="relative z-10">{label}</span>
      <ChevronDown
        className={`size-4 transition-transform duration-200 relative z-10 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { isProductOpen, setIsProductOpen } = useProductMenu();
  const { isServiceOpen, setIsServiceOpen } = useServiceMenu();
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  // Floating navbar state
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 100; // Minimum scroll distance to trigger hide/show

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  useBodyScrollLock(isMobileMenuOpen);

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
  const mobileProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    slug: p.slug,
  })) satisfies MobileMenuItem[];
  const mobileServices = services.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    slug: s.slug,
  })) satisfies MobileMenuItem[];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 lg:py-5">
          <div className="mx-auto w-full max-w-5xl bg-white-opacity-10 backdrop-blur-lg rounded-[32px] sm:rounded-[40px] pl-3 sm:pl-4 md:pl-6 lg:pl-8 pr-2 sm:pr-2.5 md:pr-3 py-2 sm:py-2.5 md:py-3">
            <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8">
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
                  className="h-auto w-auto max-w-[45px] sm:max-w-[55px] md:max-w-[65px]"
                />
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
                <NavLinkItem
                  href="/"
                  label="Home"
                  isActive={isActive("/")}
                />

                {/* Product Dropdown */}
                <div className="relative" ref={productDropdownRef}>
                  <NavDropdownTrigger
                    label="Product"
                    isActive={productActive}
                    isOpen={isProductOpen}
                    onClick={() => setIsProductOpen(!isProductOpen)}
                  />
                  <ProductDropdownMenu />
                </div>

                {/* Service Dropdown */}
                <div className="relative" ref={serviceDropdownRef}>
                  <NavDropdownTrigger
                    label="Service"
                    isActive={serviceActive}
                    isOpen={isServiceOpen}
                    onClick={() => setIsServiceOpen(!isServiceOpen)}
                  />
                  <ServiceDropdownMenu />
                </div>

                <NavLinkItem
                  href="/about"
                  label="About Us"
                  isActive={isActive("/about")}
                />
                <NavLinkItem
                  href="/case-study"
                  label="Case Studies"
                  isActive={isActive("/case-study")}
                />
                <NavLinkItem
                  href="/contact"
                  label="Contact"
                  isActive={isActive("/contact")}
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  // Reset nested accordions whenever menu opens
                  if (!isMobileMenuOpen) {
                    setIsMobileProductsOpen(false);
                    setIsMobileServicesOpen(false);
                  }
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
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
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-50 w-full max-w-xs sm:max-w-sm h-full bg-white-opacity-10 backdrop-blur-lg shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-white/10">
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
          <nav className="flex flex-col flex-1 p-4 sm:p-5 md:p-6 overflow-y-auto">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 sm:py-3.5 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-base sm:text-lg font-medium">Home</span>
            </Link>

            <MobileAccordion
              id="mobile-products"
              title="Product"
              isOpen={isMobileProductsOpen}
              onToggle={() => {
                setIsMobileProductsOpen((prev) => !prev);
                setIsMobileServicesOpen(false);
              }}
              items={mobileProducts}
              basePath="/product"
              isSectionActive={isActive("/product")}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />

            <MobileAccordion
              id="mobile-services"
              title="Service"
              isOpen={isMobileServicesOpen}
              onToggle={() => {
                setIsMobileServicesOpen((prev) => !prev);
                setIsMobileProductsOpen(false);
              }}
              items={mobileServices}
              basePath="/service"
              isSectionActive={isActive("/service")}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 sm:py-3.5 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/about")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-base sm:text-lg font-medium">About Us</span>
            </Link>

            <Link
              href="/case-study"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 sm:py-3.5 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/case-study")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-base sm:text-lg font-medium">Case Studies</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link-group relative group px-4 py-3 sm:py-3.5 rounded-lg transition-all duration-300 mb-2 ${
                isActive("/contact")
                  ? "is-active text-primary"
                  : "text-light-gray hover:text-primary"
              }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-base sm:text-lg font-medium">Contact</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}



