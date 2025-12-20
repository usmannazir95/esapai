"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ServiceMenuContextType } from "@/types/provider";

const ServiceMenuContext = createContext<ServiceMenuContextType | undefined>(
  undefined
);

export function ServiceMenuProvider({ children }: { children: ReactNode }) {
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  return (
    <ServiceMenuContext.Provider value={{ isServiceOpen, setIsServiceOpen }}>
      {children}
    </ServiceMenuContext.Provider>
  );
}

export function useServiceMenu() {
  const context = useContext(ServiceMenuContext);
  if (context === undefined) {
    throw new Error("useServiceMenu must be used within a ServiceMenuProvider");
  }
  return context;
}



