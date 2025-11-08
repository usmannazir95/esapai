"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconCloud } from "@/components/ui/icon-cloud";

export function TechnologyStack() {
  const technologyIcons = [
    "https://cdn.simpleicons.org/typescript/3178C6",
    "https://cdn.simpleicons.org/javascript/F7DF1E",
    "https://cdn.simpleicons.org/python/3776AB",
    "https://cdn.simpleicons.org/react/61DAFB",
    "https://cdn.simpleicons.org/nextdotjs/000000",
    "https://cdn.simpleicons.org/nodedotjs/339933",
    "https://cdn.simpleicons.org/amazonaws/232F3E",
    "https://cdn.simpleicons.org/microsoftazure/0078D4",
    "https://cdn.simpleicons.org/docker/2496ED",
    "https://cdn.simpleicons.org/kubernetes/326CE5",
    "https://cdn.simpleicons.org/postgresql/4169E1",
    "https://cdn.simpleicons.org/mongodb/47A248",
    "https://cdn.simpleicons.org/redis/DC382D",
    "https://cdn.simpleicons.org/tensorflow/FF6F00",
    "https://cdn.simpleicons.org/pytorch/EE4C2C",
    "https://cdn.simpleicons.org/openai/412991",
    "https://cdn.simpleicons.org/googlecloud/4285F4",
    "https://cdn.simpleicons.org/vercel/000000",
    "https://cdn.simpleicons.org/git/F05032",
    "https://cdn.simpleicons.org/github/181717",
    "https://cdn.simpleicons.org/gitlab/FC6D26",
    "https://cdn.simpleicons.org/jira/0052CC",
    "https://cdn.simpleicons.org/figma/F24E1E",
    "https://cdn.simpleicons.org/visualstudiocode/007ACC",
    "https://cdn.simpleicons.org/jest/C21325",
    "https://cdn.simpleicons.org/cypress/17202C",
    "https://cdn.simpleicons.org/selenium/43B02A",
    "https://cdn.simpleicons.org/nginx/009639",
    "https://cdn.simpleicons.org/apache/D22128",
  ];

  return (
    <Section>
      <SectionHeader
        title={
          <>
            <span className="block">Built with Modern</span>
            <span className="block">Technology Stack</span>
          </>
        }
        subtitle="We leverage cutting-edge technologies and tools to deliver enterprise-grade AI solutions that scale with your business needs."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8">
        {/* Left Section - Text Content */}
        <div className="space-y-6 lg:space-y-8">

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">Frontend & Frameworks</h3>
              <p className="text-light-gray-90">
                Modern React, Next.js, and TypeScript for building responsive, performant user interfaces.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">Cloud & Infrastructure</h3>
              <p className="text-light-gray-90">
                Scalable cloud solutions on AWS, Azure, and Google Cloud with containerized deployments.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">AI & Machine Learning</h3>
              <p className="text-light-gray-90">
                Advanced AI frameworks including TensorFlow, PyTorch, and OpenAI integrations for intelligent automation.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Icon Cloud */}
        <div className="relative w-full flex items-center justify-center lg:justify-end overflow-hidden">
          <div className="relative w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Scale the canvas to make it larger */}
            <div className="scale-125 md:scale-150 lg:scale-[1.75] xl:scale-[2] origin-center">
              <IconCloud images={technologyIcons} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

