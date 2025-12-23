"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

import { products } from "@/lib/products";
import { services } from "@/lib/services";
import { useBodyScrollLock } from "@/lib/hooks/use-body-scroll-lock";

import { ProductDropdownMenu } from "../menus/product-dropdown-menu";
import { ServiceDropdownMenu } from "../menus/service-dropdown-menu";
import { useProductMenu } from "../menus/product-menu-context";
import { useServiceMenu } from "../menus/service-menu-context";
import { MobileAccordion, type MobileMenuItem } from "./mobile-accordion";
import { Button } from "@/components/ui/button";

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
      className={`nav-link-group relative group whitespace-nowrap cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${isActive ? "is-active text-primary" : "text-light-gray hover:text-primary"
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
      className={`nav-link-group relative group whitespace-nowrap flex items-center gap-1 cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${isActive ? "is-active text-primary" : "text-light-gray hover:text-primary"
        }`}
      aria-expanded={isOpen}
    >
      <span className="nav-glow" aria-hidden="true" />
      <span className="relative z-10">{label}</span>
      <ChevronDown
        className={`size-4 transition-transform duration-200 relative z-10 ${isOpen ? "rotate-180" : ""
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

  // Resizable navbar state
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

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
      <div className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
        {/* Desktop Navbar */}
        <motion.div
          initial={false}
          animate={{
            backdropFilter: isScrolled ? "blur(10px)" : "blur(8px)",
            boxShadow: isScrolled
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
            width: isScrolled ? "55%" : "100%",
            y: isScrolled ? 20 : 0,
            borderRadius: isScrolled ? "50px" : "0px",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 40,
          }}
          style={{
            minWidth: isScrolled ? "800px" : "100%",
          }}
          className={cn(
            "relative z-[60] mx-auto hidden flex-row items-center justify-between self-start pointer-events-auto md:flex",
            isScrolled ? "bg-white/10" : "bg-white-opacity-10"
          )}
        >
          <div className={cn(
            "w-full flex items-center justify-between mx-auto px-6 py-3",
            isScrolled ? "max-w-none" : "max-w-7xl"
          )}>
            {/* Logo */}
            <div className="flex-1 flex items-center">
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
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 justify-center">
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
                label="Case Study"
                isActive={isActive("/case-study")}
              />
            </div>

            {/* Contact Button */}
            <div className="flex-1 flex items-center justify-end">
              <Button
                variant="primary"
                className="text-md md:text-lg px-12 md:px-16 py-4 md:py-5 rounded-full font-semibold shadow-lg shadow-primary-30 hover:shadow-primary-50 transition-all"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Navbar */}
        <motion.div
          initial={false}
          animate={{
            backdropFilter: isScrolled ? "blur(10px)" : "blur(8px)",
            boxShadow: isScrolled
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
            width: isScrolled ? "90%" : "100%",
            borderRadius: isScrolled ? "2rem" : "0px",
            y: isScrolled ? 20 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 40,
          }}
          className={cn(
            "relative z-50 mx-auto flex w-full flex-col items-center justify-between pointer-events-auto md:hidden overflow-hidden",
            isScrolled ? "bg-white/10" : "bg-white-opacity-10"
          )}
        >
          <div className="w-full flex items-center justify-between px-4 py-3">
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
              onClick={() => {
                if (!isMobileMenuOpen) {
                  setIsMobileProductsOpen(false);
                  setIsMobileServicesOpen(false);
                }
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-light-gray hover:text-primary transition-colors duration-300"
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
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-50 w-full max-w-xs sm:max-w-sm h-full bg-white-opacity-10 backdrop-blur-lg shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
              className={`nav-link-group relative group px-4 py-3 sm:py-3.5 rounded-lg transition-all duration-300 mb-2 ${isActive("/")
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
              className={`nav-link-group relative group px-4 py-3 sm:py-3.5 rounded-lg transition-all duration-300 mb-2 ${isActive("/about")
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
              className={`nav-link-group relative group px-4 py-3 sm:py-3.5 rounded-lg transition-all duration-300 mb-2 ${isActive("/case-study")
                ? "is-active text-primary"
                : "text-light-gray hover:text-primary"
                }`}
            >
              <span className="nav-glow" aria-hidden="true" />
              <span className="relative z-10 text-base sm:text-lg font-medium">Case Study</span>
            </Link>

            <Button
              asChild
              variant="primary"
              className="w-full mt-4 h-12"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
}



