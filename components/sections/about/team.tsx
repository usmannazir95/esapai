"use client";

import Image from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

interface TeamProps {
  members?: TeamMember[];
}

const defaultTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-1.jpg", // Placeholder - update with actual image path
  },
  {
    id: "2",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-2.jpg",
  },
  {
    id: "3",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-3.jpg",
  },
  {
    id: "4",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-4.jpg",
  },
  {
    id: "5",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-5.jpg",
  },
  {
    id: "6",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-6.jpg",
  },
  {
    id: "7",
    name: "Baker Abukhater",
    role: "Founder",
    description: "Meet Baker Abukhater, The visionary and dynamic Founder of ESAP AI.",
    image: "/team/baker-7.jpg",
  },
];

export function Team({ members = defaultTeamMembers }: TeamProps) {
  // Layout: 1 top, 3 middle, 3 bottom
  const topMember = members[0];
  const middleMembers = members.slice(1, 4);
  const bottomMembers = members.slice(4, 7);

  return (
    <section className="relative w-full py-20 px-4 overflow-hidden bg-dark">
      <div className="relative container mx-auto max-w-7xl z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gradient-radial-white">
            Our Team
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-light-gray-90 max-w-3xl mx-auto px-4">
            Meet the visionaries driving innovation and transforming the future 
            of AI-powered automation.
          </p>
        </div>

        {/* Team Grid */}
        <div className="relative max-w-6xl mx-auto">
          {/* Top Row - 1 large card, centered */}
          {topMember && (
            <div className="flex justify-center mb-8 md:mb-12">
              <TeamCard member={topMember} isLarge />
            </div>
          )}

          {/* Middle Row - 3 cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 mb-8 md:mb-12">
            {middleMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* Bottom Row - 3 cards */}
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
            {bottomMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TeamCardProps {
  member: TeamMember;
  isLarge?: boolean;
}

function TeamCard({ member, isLarge = false }: TeamCardProps) {
  return (
    <div
      className={`relative group ${
        isLarge ? "w-full max-w-md" : "flex-1 max-w-sm"
      }`}
    >
      <div className="relative team-card overflow-hidden rounded-[32px] p-6 md:p-8 h-full transition-all duration-300">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(19,245,132,0.15)] via-[rgba(19,245,132,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Image Container with Glow */}
        <div className="relative mb-6 flex items-center justify-center py-4">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Multi-layer Green Glow Halo - Always visible, bright */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              {/* Outer glow */}
              <div
                className="absolute rounded-full blur-3xl opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(circle, rgba(19, 245, 132, 0.8) 0%, rgba(19, 245, 132, 0.4) 40%, transparent 70%)",
                  width: "200%",
                  height: "200%",
                  transform: "translate(-25%, -25%)",
                }}
              />
              {/* Inner glow */}
              <div
                className="absolute rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(circle, rgba(19, 245, 132, 0.9) 0%, rgba(19, 245, 132, 0.5) 50%, transparent 80%)",
                  width: "150%",
                  height: "150%",
                  transform: "translate(-16.67%, -16.67%)",
                }}
              />
            </div>
            
            {/* Profile Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/40 group-hover:border-primary/70 transition-colors duration-300 z-10">
              <Image
                src={member.image}
                alt={member.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Crect fill='%23131313' width='160' height='160'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2313f584' font-size='48' font-family='Arial'%3E" +
                    encodeURIComponent(member.name.charAt(0)) + "%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>

        {/* Role Tag */}
        <div className="mb-3 flex justify-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold">
            {member.role}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white">
          {member.name}
        </h3>

        {/* Description */}
        <p className="text-base md:text-lg text-light-gray-90 text-center leading-relaxed">
          {member.description}
        </p>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div
            className="absolute inset-0 rounded-[32px]"
            style={{
              boxShadow: "0 0 30px rgba(19, 245, 132, 0.4), inset 0 0 30px rgba(19, 245, 132, 0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

