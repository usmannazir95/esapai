"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function CTASection() {
  return (
    <Section background="dark" padding="lg" className="relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary opacity-10 blur-[120px] rounded-full" />
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
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gradient-primary">
          Ready to Transform Your Business?
        </h2>
        
        <p className="text-lg md:text-xl lg:text-2xl text-light-gray-90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join forward-thinking companies that are leveraging AI to drive innovation, 
          increase efficiency, and unlock new possibilities. Let&apos;s build the future together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button
            variant="primary"
            size="lg"
            className="rounded-[40px] px-8 py-6 text-lg font-semibold w-full sm:w-auto"
            asChild
          >
            <Link href="/contact">Get Started Today</Link>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-[40px] px-8 py-6 text-lg font-semibold border-white-opacity-20 hover:bg-white-opacity-10 w-full sm:w-auto"
            asChild
          >
            <Link href="/product">Explore Our Products</Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-white-opacity-10">
          <p className="text-base text-light-gray-90">
            Have questions?{" "}
            <Link 
              href="/contact" 
              className="text-primary hover:underline font-semibold"
            >
              Contact our team
            </Link>
            {" "}for a personalized consultation.
          </p>
        </div>
      </div>
    </Section>
  );
}

