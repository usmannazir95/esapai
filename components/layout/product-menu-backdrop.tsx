"use client";

import { useProductMenu } from "./product-menu-context";

export function ProductMenuBackdrop() {
  const { isProductOpen, setIsProductOpen } = useProductMenu();

  if (!isProductOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg z-40 transition-opacity duration-300"
      onClick={() => setIsProductOpen(false)}
      aria-hidden="true"
    />
  );
}

