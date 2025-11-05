import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[20%] left-[10%] z-0 pointer-events-none opacity-20">
        <Image
          src="/landing/circle.svg"
          alt="Circle decoration"
          width={200}
          height={200}
          className="w-auto h-auto"
        />
      </div>
      <div className="absolute bottom-[20%] right-[10%] z-0 pointer-events-none opacity-20">
        <Image
          src="/landing/box.svg"
          alt="Box decoration"
          width={150}
          height={150}
          className="w-auto h-auto"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center max-w-4xl">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] lg:text-[15rem] font-bold leading-none text-gradient-primary opacity-20">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-primary">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            variant="primary"
            size="lg"
            className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]"
            asChild
          >
            <Link href="/">Go Home</Link>
          </Button>
          <Button
            variant="watch-demo"
            size="lg"
            className="rounded-[40px] px-8 py-6 text-lg font-semibold min-w-[180px]"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="product-card p-6 md:p-8 max-w-md">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-gradient-radial-white">
            Quick Links
          </h3>
          <nav className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-base"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-base"
            >
              About
            </Link>
            <Link
              href="/product"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-base"
            >
              Products
            </Link>
            <Link
              href="/service"
              className="text-primary hover:text-primary-opacity-90 transition-colors text-base"
            >
              Services
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}

