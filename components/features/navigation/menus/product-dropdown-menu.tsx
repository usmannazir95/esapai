"use client";

import { products } from "@/lib/products";
import { DropdownMenu } from "./dropdown-menu";
import { useProductMenu } from "./product-menu-context";

export function ProductDropdownMenu() {
  const { isProductOpen, setIsProductOpen } = useProductMenu();

  return (
    <DropdownMenu
      title="Our Products"
      description="Stay ahead with AI-powered tools that track environmental data in real-time."
      items={products}
      basePath="/product"
      dropdownClass="product-dropdown"
      itemClass="product-dropdown-item"
      isOpen={isProductOpen}
      onClose={() => setIsProductOpen(false)}
    />
  );
}



