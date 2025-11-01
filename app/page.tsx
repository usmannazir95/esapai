import { Hero } from "@/components/sections/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative">
      {/* Frame in top left */}
      <div className="fixed top-0 left-0 z-20 pointer-events-none">
        <Image
          src="/landing/frame.svg"
          alt="Frame decoration"
          width={300}
          height={300}
          className="w-auto h-auto"
          priority
        />
      </div>

      <Hero />
    </main>
  );
}
