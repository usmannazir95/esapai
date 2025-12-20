"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ProductMenuContextType {
  isProductOpen: boolean;
  setIsProductOpen: (open: boolean) => void;
}

const ProductMenuContext = createContext<ProductMenuContextType | undefined>(
  undefined
);

export function ProductMenuProvider({ children }: { children: ReactNode }) {
  const [isProductOpen, setIsProductOpen] = useState(false);

  return (
    <ProductMenuContext.Provider value={{ isProductOpen, setIsProductOpen }}>
      {children}
    </ProductMenuContext.Provider>
  );
}

export function useProductMenu() {
  const context = useContext(ProductMenuContext);
  if (context === undefined) {
    throw new Error("useProductMenu must be used within a ProductMenuProvider");
  }
  return context;
}



