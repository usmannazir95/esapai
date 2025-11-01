import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="mx-auto max-w-3xl bg-white-opacity-10 backdrop-blur-lg rounded-[40px] pl-8 pr-2 py-2">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
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
                className="text-light-gray hover:text-primary transition-colors whitespace-nowrap"
              >
                Home
              </Link>
              <Link
                href="/product"
                className="text-light-gray hover:text-primary transition-colors whitespace-nowrap"
              >
                Product
              </Link>
              <Link
                href="/service"
                className="text-light-gray hover:text-primary transition-colors whitespace-nowrap"
              >
                Service
              </Link>
              <Link
                href="/about"
                className="text-light-gray hover:text-primary transition-colors whitespace-nowrap"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-light-gray hover:text-primary transition-colors whitespace-nowrap"
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

