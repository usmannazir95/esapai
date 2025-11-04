"use client";

import { useServiceMenu } from "./service-menu-context";

export function ServiceMenuBackdrop() {
  const { isServiceOpen, setIsServiceOpen } = useServiceMenu();

  if (!isServiceOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg z-40 transition-opacity duration-300"
      onClick={() => setIsServiceOpen(false)}
      aria-hidden="true"
    />
  );
}

