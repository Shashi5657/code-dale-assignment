"use client";

import { useEffect, useState } from "react";

interface PageLoaderProps {
    progress: number;
    isComplete: boolean;
    onComplete: () => void;
}

export default function PageLoader({
    progress,
    isComplete,
    onComplete,
}: PageLoaderProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        if (isComplete && !isAnimating) {
            // Start fade-out animation
            setIsAnimating(true);
            // Wait for animation to complete, then remove from DOM
            const timer = setTimeout(() => {
                setShouldRender(false);
                onComplete();
            }, 700); // Match animation duration (700ms)

            return () => clearTimeout(timer);
        }
    }, [isComplete, isAnimating, onComplete]);

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[#F5F3EE] transition-all duration-700 ease-out ${isAnimating
                    ? "opacity-0 translate-y-[-100%]"
                    : "opacity-100 translate-y-0"
                }`}
            style={{
                willChange: isAnimating ? "transform, opacity" : "auto",
            }}
        >
            {/* Loading percentage - bottom-left */}
            <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12">
                <div
                    className="text-[#2D3E2F] font-medium tracking-tight"
                    style={{
                        fontSize: "clamp(2rem, 8vw, 6rem)",
                        lineHeight: "1",
                        fontFamily: "var(--font-fragment-mono)",
                        transition: "opacity 0.2s ease",
                    }}
                >
                    {progress}%
                </div>
            </div>
        </div>
    );
}

