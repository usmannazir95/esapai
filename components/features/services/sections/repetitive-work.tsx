"use client";

import Image from "next/image";
import { Section } from "@/components/ui/section";

export function RepetitiveWork() {
  return (
    <Section padding="sm" overflow="visible">
      <div className="relative">
        <div className="absolute inset-x-0 -top-8 flex justify-center pointer-events-none select-none z-0">
          <Image
            src="/services/frame2.svg"
            alt="Decorative frame"
            width={640}
            height={180}
            className="w-full max-w-[900px] h-auto opacity-90"
            priority
          />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 items-center z-10">
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block text-light-gray-90">
                The End of <span className="text-gradient-primary">Repetitive</span>
              </span>
              <span className="block text-light-gray-90">
                Work. <span className="text-gradient-primary">Systems</span> that
                work
              </span>
              <span className="block text-light-gray-90">
                for people <span className="text-gradient-primary">not</span> the
                other
              </span>
              <span className="block text-light-gray-90">way around.</span>
            </h2>
          </div>

          <div className="md:col-span-2 flex items-center justify-end">
            <div className="relative w-full max-w-[300px] h-auto">
              <Image
                src="/landing/mission/mission.svg"
                alt="Mission illustration"
                width={230}
                height={216}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}



