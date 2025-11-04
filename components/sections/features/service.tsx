"use client";

import Image from "next/image";

interface ServiceItemProps {
  title: string | React.ReactNode;
  description: string;
  iconPosition: "left" | "right";
  positionStyle: {
    left: string;
    top: string;
    transform?: string;
  };
  descriptionClassName?: string;
}

function ServiceItem({
  title,
  description,
  iconPosition,
  positionStyle,
  descriptionClassName = "",
}: ServiceItemProps) {
  const textAlignment = iconPosition === "left" ? "text-left" : "text-right";
  const iconOrder = iconPosition === "left";

  return (
    <div className="absolute" style={positionStyle}>
      <div className="product-card p-4 md:p-6 lg:p-8 min-w-[320px] sm:min-w-[360px] md:min-w-[400px] max-w-[420px]">
        <div className="flex flex-row items-center gap-5 md:gap-6 lg:gap-8">
          {iconOrder ? (
            <>
              {/* Glowing Green Cylindrical Icon on Left */}
              <div className="shrink-0">
                <div className="relative">
                  <Image
                    src="/landing/service/serviceicon.svg"
                    alt="Service icon"
                    width={60}
                    height={60}
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(19, 245, 132, 0.8)) drop-shadow(0 0 40px rgba(19, 245, 132, 0.4))'
                    }}
                  />
                </div>
              </div>
              {/* Text Content */}
              <div className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
                <h3 className={`text-base md:text-lg lg:text-xl font-semibold text-gradient-radial-white leading-relaxed ${textAlignment}`}>
                  {title}
                </h3>
                <p className={`text-sm md:text-base text-white-opacity-70 leading-relaxed ${textAlignment} ${descriptionClassName}`}>
                  {description}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Text Content */}
              <div className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
                <h3 className={`text-base md:text-lg lg:text-xl font-semibold text-gradient-radial-white leading-relaxed ${textAlignment}`}>
                  {title}
                </h3>
                <p className={`text-sm md:text-base text-white-opacity-70 leading-relaxed ${textAlignment} ${descriptionClassName}`}>
                  {description}
                </p>
              </div>
              {/* Glowing Green Cylindrical Icon on Right */}
              <div className="shrink-0">
                <div className="relative">
                  <Image
                    src="/landing/service/serviceicon.svg"
                    alt="Service icon"
                    width={60}
                    height={60}
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(19, 245, 132, 0.8)) drop-shadow(0 0 40px rgba(19, 245, 132, 0.4))'
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function Service() {
  return (
    <section
      className="relative w-full py-20 px-4 overflow-hidden bg-dark"
    >

      <div className="relative container mx-auto max-w-7xl z-10">
        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-gradient-radial-white leading-tight">
          <span className="block">Rebuilding today,</span>
          <span className="block">empowering tomorrow</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-white-opacity-70 max-w-4xl mx-auto mb-16">
          Security AI Platform to Protect the Entire Enterprise. Break Down
          Security. Gain Enterprise-Wide Visibility. Action Your Data In
          Real-Time.
        </p>

        {/* Central Brain with Services */}
        <div className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center py-8 md:py-12 -mt-12 md:-mt-16">
          {/* Ellipse around the brain */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <Image
              src="/landing/service/ellipse.svg"
              alt="Ellipse glow"
              width={600}
              height={600}
              className="w-full h-full max-w-[500px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[650px] object-contain"
            />
          </div>

          {/* Central Brain */}
          <div className="relative z-20 animate-float">
            <Image
              src="/landing/service/brain.svg"
              alt="AI Brain"
              width={400}
              height={400}
              className="w-full h-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] object-contain"
              priority
            />
          </div>

          {/* Service Modules - Circular Arrangement */}
          <div className="absolute inset-0 z-10 overflow-visible">
            {/* Positioning container centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-visible">
              {/* Top Left - ~120 degrees */}
              <ServiceItem
                title={
                  <>
                    End-to-End Agentic <span className="text-white-opacity-70">AI</span> Integration
                  </>
                }
                description="Integrate autonomous AI agents to streamline"
                iconPosition="right"
                positionStyle={{
                  left: 'calc(50% - 450px)',
                  top: 'calc(50% - 280px)',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Middle Left - 180 degrees */}
              <ServiceItem
                title="Enterprise Security Intelligence"
                description="Advanced threat detection and response"
                iconPosition="right"
                positionStyle={{
                  left: 'calc(50% - 500px)',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Bottom Left - ~240 degrees */}
              <ServiceItem
                title="Real-Time Data Analytics"
                description="Action insights from your enterprise data"
                iconPosition="right"
                positionStyle={{
                  left: 'calc(50% - 450px)',
                  top: 'calc(50% + 280px)',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Top Right - ~60 degrees */}
              <ServiceItem
                title="Unified Security Platform"
                description="Centralized visibility across all systems"
                iconPosition="left"
                positionStyle={{
                  left: 'calc(50% + 450px)',
                  top: 'calc(50% - 280px)',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Middle Right - 0/360 degrees */}
              <ServiceItem
                title="Automated Response Systems"
                description="AI-powered incident response and remediation"
                iconPosition="left"
                positionStyle={{
                  left: 'calc(50% + 500px)',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />

              {/* Bottom Right - ~300 degrees */}
              <ServiceItem
                title="Continuous Monitoring"
                description="24/7 surveillance and protection"
                iconPosition="left"
                positionStyle={{
                  left: 'calc(50% + 450px)',
                  top: 'calc(50% + 280px)',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floor Grid Pattern - boxes.svg */}
      <div className="absolute -bottom-24 left-0 right-0 z-0 pointer-events-none">
        <Image
          src="/landing/service/boxes.svg"
          alt="Floor grid pattern"
          width={1370}
          height={547}
          className="w-full object-cover"
        />
      </div>
    </section>
  );
}


