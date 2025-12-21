"use client";

import { services } from "@/lib/services";
import { DropdownMenu } from "./dropdown-menu";
import { useServiceMenu } from "./service-menu-context";

export function ServiceDropdownMenu() {
  const { isServiceOpen, setIsServiceOpen } = useServiceMenu();

  return (
    <DropdownMenu
      title="Our Services"
      description="Stay ahead with AI-powered tools that track environmental data in real-time."
      items={services}
      basePath="/service"
      dropdownClass="service-dropdown"
      itemClass="service-dropdown-item"
      isOpen={isServiceOpen}
      onClose={() => setIsServiceOpen(false)}
    />
  );
}





