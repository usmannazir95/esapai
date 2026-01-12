"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Dynamically import the heavy 3D component with no SSR
const NeuralBackground = dynamic(
    () => import("./neural-canvas").then((mod) => mod.NeuralBackground),
    {
        ssr: false,
        loading: () => <div className="fixed inset-0 z-[-1] bg-[#020305]" />,
    }
);

export function BackgroundLayout() {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Delay mounting slightly to prioritize LCP
        const timer = setTimeout(() => {
            setMounted(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div
                className={`fixed inset-0 z-[-1] bg-[#020305] transition-opacity duration-1000 ${mounted ? "opacity-0" : "opacity-100"
                    }`}
            />
            {mounted && <NeuralBackground />}
        </>
    );
}
