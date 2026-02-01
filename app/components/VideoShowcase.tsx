"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Frame scale animation on scroll
      if (frameRef.current) {
        gsap.from(frameRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
          scale: 0.85,
          opacity: 0.5,
        });
      }

      // Content fade in
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
          y: 50,
          opacity: 0,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Generate shoji grid cells
  const ShojiPanel = ({ side }: { side: "left" | "right" }) => (
    <div
      className={`absolute ${side}-0 top-0 bottom-0 bg-[#C9A66B] z-10`}
      style={{ width: 'var(--shoji-width)' }} 
    >
      {/* Vertical wooden bar */}
      <div
        className={`absolute ${side === "left" ? "right-0" : "left-0"} top-0 bottom-0 w-2 bg-[#A88B5A]`}
      />

      {/* Grid pattern */}
      <div className="h-full p-1 grid grid-rows-8 gap-0.5">
        {[...Array(8)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-0.5">
            {[...Array(2)].map((_, colIndex) => (
              <div
                key={colIndex}
                className="bg-[#EAE6DE]/90 rounded-[1px]"
                style={{
                  boxShadow: "inset 0 0 4px rgba(0,0,0,0.05)",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden"
    >
      {/* Background gradient simulating nature scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#B8C4B5] via-[#C8D4C5] to-[#D8E0D5]" />

      {/* Main container */}
      <div className="relative z-10 w-full h-full px-2 sm:px-3 md:px-4 lg:px-8">
        <div ref={frameRef} className="relative">
          {/* Shoji screen frame */}
          <div className="relative bg-[#C9A66B] p-2 sm:p-3 md:p-4 rounded-lg shadow-2xl">
            {/* Top wooden beam */}
            <div className="absolute left-8 sm:left-10 md:left-16 lg:left-24 right-8 sm:right-10 md:right-16 lg:right-24 top-0 h-3 sm:h-4 bg-[#B89B5A] rounded-t-lg" />

            {/* Bottom wooden beam */}
            <div className="absolute left-8 sm:left-10 md:left-16 lg:left-24 right-8 sm:right-10 md:right-16 lg:right-24 bottom-0 h-2 sm:h-3 bg-[#B89B5A] rounded-b-lg" />

            {/* Shoji panels */}
            <ShojiPanel side="left" />
            <ShojiPanel side="right" />

            {/* Inner content area with floor */}
            <div className="ml-8 sm:ml-10 md:ml-16 lg:ml-24 mr-8 sm:mr-10 md:mr-16 lg:mr-24 relative">
              {/* Wooden floor at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#D4B574] rounded-b" />

              {/* Product screenshot container */}
              <div
                ref={contentRef}
                className="relative aspect-video bg-[#F5F3EE] rounded overflow-hidden shadow-inner"
              >
                {/* Video element */}
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover ${isVideoPlaying ? "block" : "hidden"}`}
                  src="/videos/product-demo.mp4"
                  controls={isVideoPlaying}
                  playsInline
                />

                {/* Product interface mockup when video is not playing */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 flex">
                    {/* Sidebar - hidden on mobile, responsive on tablet/desktop */}
                    <div className="hidden sm:flex w-32 md:w-40 lg:w-48 xl:w-56 bg-[#FAFAF8] border-r border-[#E8E4DC] flex-col text-xs md:text-sm">
                      {/* Logo area */}
                      <div className="p-2 md:p-4 border-b border-[#E8E4DC]">
                        <div className="flex items-center gap-2">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="w-3 md:w-4"
                          >
                            <path
                              d="M8 1L1 8l7 7 7-7-7-7z"
                              stroke="#2D3E2F"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                          <span className="text-xs md:text-sm font-medium text-[#2D3E2F]">
                            Adaline
                          </span>
                        </div>
                      </div>

                      {/* Search */}
                      <div className="p-2 md:p-3">
                        <div className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 bg-white border border-[#E8E4DC] rounded-lg">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <circle
                              cx="6"
                              cy="6"
                              r="4.5"
                              stroke="#9CA3AF"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M9.5 9.5L13 13"
                              stroke="#9CA3AF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="text-xs text-[#9CA3AF]">
                            Search...
                          </span>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex-1 p-2 md:p-3 space-y-1 text-xs md:text-sm overflow-y-auto">
                        <div className="px-2 md:px-3 py-1 md:py-2 rounded-lg hover:bg-[#F0EDE8] cursor-pointer flex items-center gap-2">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M2 6l6-4 6 4v8H2V6z"
                              stroke="#5C6D5E"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                          <span className="text-[#5C6D5E] hidden md:inline">
                            Home
                          </span>
                        </div>
                        <div className="px-2 md:px-3 py-1 md:py-2 rounded-lg hover:bg-[#F0EDE8] cursor-pointer flex items-center gap-2">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3 4h10M3 8h10M3 12h6"
                              stroke="#5C6D5E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="text-[#5C6D5E] hidden md:inline">
                            Trash
                          </span>
                        </div>

                        {/* Shared section */}
                        <div className="pt-2 md:pt-4 pb-1 md:pb-2">
                          <span className="text-[9px] md:text-[10px] font-medium tracking-wider text-[#2D3E2F]/40 uppercase px-2 md:px-3">
                            Shared
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <div className="px-2 md:px-3 py-1 md:py-2 rounded-lg bg-[#F0EDE8] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#2D3E2F]" />
                            <span className="text-[#2D3E2F] font-medium text-xs md:text-sm">
                              Code Gen
                            </span>
                          </div>
                          <div className="ml-2 md:ml-4 space-y-0.5">
                            <div className="px-2 md:px-3 py-1 rounded-lg bg-[#E8E4DC] flex items-center gap-2">
                              <span className="text-[#2D3E2F] text-xs">
                                Debug
                              </span>
                            </div>
                            <div className="px-2 md:px-3 py-1 rounded-lg hover:bg-[#F0EDE8] cursor-pointer">
                              <span className="text-[#5C6D5E] text-xs">
                                Improve
                              </span>
                            </div>
                            <div className="px-2 md:px-3 py-1 rounded-lg hover:bg-[#F0EDE8] cursor-pointer">
                              <span className="text-[#5C6D5E] text-xs">
                                Test
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1 bg-white flex flex-col">
                      {/* Top bar */}
                      <div className="h-10 md:h-12 border-b border-[#E8E4DC] flex items-center justify-between px-2 md:px-4 gap-2 md:gap-4 flex-wrap">
                        <div className="flex items-center gap-2 md:gap-4 min-w-0">
                          <span className="text-xs md:text-sm text-[#5C6D5E] truncate">
                            Code Gen / Debugging
                          </span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-end">
                          <span className="text-[10px] md:text-xs text-[#5C6D5E] hidden sm:inline">
                            Iterate
                          </span>
                          <span className="text-[10px] md:text-xs text-[#5C6D5E] hidden md:inline">
                            Evaluate
                          </span>
                          <span className="text-[10px] md:text-xs text-[#5C6D5E] hidden lg:inline">
                            Deploy
                          </span>
                          <span className="text-[10px] md:text-xs text-[#5C6D5E] hidden xl:inline">
                            Monitor
                          </span>
                          <button className="px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-medium bg-[#2D3E2F] text-white rounded-lg whitespace-nowrap">
                            Deploy
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-2 md:p-4 bg-[#FAFAF8]">
                        <div className="h-full flex items-center justify-center">
                          {/* Play button */}
                          <button
                            onClick={handlePlayVideo}
                            className="group flex items-center justify-center"
                          >
                            <div className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform border-2 border-[#E8E4DC]">
                              <svg
                                className="w-6 md:w-8 h-6 md:h-8 text-[#2D3E2F] ml-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Decorative rocks on the floor */}
          <div className="absolute bottom-2 sm:bottom-4 left-4 sm:left-8 w-4 sm:w-6 h-3 sm:h-4 bg-[#8B7355] rounded-full opacity-60" />
          <div className="absolute bottom-3 sm:bottom-6 right-4 sm:right-12 w-3 sm:w-4 h-2 sm:h-3 bg-[#7A6548] rounded-full opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
