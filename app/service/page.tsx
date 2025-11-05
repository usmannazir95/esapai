import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/services";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark">
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gradient-primary">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-light-gray-90 max-w-2xl mx-auto">
            Comprehensive AI solutions and services to help you transform your business with intelligent automation
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        <SectionHeader
          title="Comprehensive AI Services"
          subtitle="From strategy to implementation, we provide end-to-end AI solutions tailored to your business needs."
          subtitleClassName="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-5xl mx-auto px-4 mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
          {services.map((service) => (
            <Link key={service.id} href={`/service/${service.slug}`} className="block h-full">
              <SpotlightCard className="h-full">
                <div className="p-6 md:p-8 h-full flex flex-col">
                  {/* Service Icon - using serviceicon as default */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                    <Image
                      src={service.icon || "/landing/service/serviceicon.svg"}
                      alt={`${service.name} icon`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain filter-glow-primary"
                    />
                  </div>

                  {/* Service Name */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-radial-white">
                    {service.name}
                  </h3>

                  {/* Service Description */}
                  <p className="text-base md:text-lg text-light-gray-90 leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    <span>Learn More</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-lg md:text-xl text-light-gray-90 mb-6">
            Ready to transform your business with AI?
          </p>
          <Button
            variant="primary"
            size="lg"
            className="rounded-[40px] px-8 py-6 text-lg font-semibold"
            asChild
          >
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}

