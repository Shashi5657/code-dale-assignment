"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Total number of frames in the sequence (002-281)
const TOTAL_FRAMES = 280;
const FRAME_START = 2;

// Generate frame path
const getFramePath = (frameNumber: number): string => {
  const paddedNumber = String(frameNumber).padStart(3, "0");
  return `/images/sequence/16x9_281/standard/graded_4K_100_gm_50_1080_3-${paddedNumber}.jpg`;
};

// Play icon for Watch Demo button
const PlayIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.5 1.5L10 6L2.5 10.5V1.5Z" fill="currentColor" />
  </svg>
);

// Company names list
const COMPANY_NAMES = [
  "Discord",
  "Reforge",
  "salesforce",
  "DoorDash",
  "Giift",
  "Daybreak",
  "Coframe",
  "McKinsey",
  "HubSpot",
  "SimpleDocs",
  "Staflo",
  "JusBrail",
  "CrushLovely",
  "FifteenFive",
  "JerichoSecurity",
];

// Randomize array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const frameRef = useRef({ current: 0 });
  const [navOpacity, setNavOpacity] = useState(1);
  const [navBlur, setNavBlur] = useState(20);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // Start with original order for SSR hydration, then randomize on client
  const [randomizedCompanies, setRandomizedCompanies] = useState(COMPANY_NAMES);


  // Handle play button click
  const handlePlayClick = useCallback(() => {
    setIsVideoPlaying(true);
    // Use setTimeout to ensure state update happens first
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => {
          console.log("Video play failed:", err);
        });
      }
    }, 100);
  }, []);

  // Randomize companies only on client side after hydration
  useEffect(() => {
    setRandomizedCompanies(shuffleArray(COMPANY_NAMES));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade out the navbar as user scrolls down (from opacity 1 to ~0.18)
      // The original uses a formula that transitions over ~600px scroll
      const newOpacity = Math.max(0, 1 - scrollY / 600);
      const newBlur = Math.max(0, 5 - (scrollY / 1300) * 5);
      setNavOpacity(newOpacity);
      setNavBlur(newBlur);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preload all images
  const preloadImages = useCallback(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = FRAME_START; i <= FRAME_START + TOTAL_FRAMES - 1; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      };
      images.push(img);
    }
  }, []);

  // Render frame to canvas
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const images = imagesRef.current;

    if (!canvas || !ctx || images.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(frameIndex, images.length - 1));
    const img = images[clampedIndex];

    if (img && img.complete) {
      // Set canvas dimensions to match window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Calculate cover dimensions
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, []);

  // Initialize canvas and scroll animation
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Marquee animation - independent of image loading
  useEffect(() => {
    let marqueeResizeHandler: (() => void) | null = null;
    let marqueeTimeout: NodeJS.Timeout | null = null;

    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current.querySelector(
        ".marquee-content",
      ) as HTMLElement;
      if (marqueeContent) {
        const updateMarquee = () => {
          // Get all logo elements
          const logoElements = marqueeContent.children;
          if (logoElements.length === 0) return;

          // Calculate width of first half (one complete set)
          let firstSetWidth = 0;
          const halfLength = logoElements.length / 2;

          // Get computed gap from CSS
          const computedStyle = window.getComputedStyle(marqueeContent);
          const gap = parseFloat(computedStyle.gap) || 32;

          for (let i = 0; i < halfLength; i++) {
            const el = logoElements[i] as HTMLElement;
            const rect = el.getBoundingClientRect();
            firstSetWidth += rect.width;
            if (i < halfLength - 1) {
              firstSetWidth += gap;
            }
          }

          // Kill any existing animation
          gsap.killTweensOf(marqueeContent);

          // Animate from right (0) to left (-firstSetWidth) for seamless loop
          gsap.fromTo(
            marqueeContent,
            { x: 0 },
            {
              x: -firstSetWidth,
              duration: firstSetWidth / 50, // Speed: 50px per second
              ease: "none",
              repeat: -1,
            },
          );
        };

        // Wait for layout, then start animation
        marqueeTimeout = setTimeout(updateMarquee, 300);

        // Update on resize
        marqueeResizeHandler = () => {
          updateMarquee();
        };
        window.addEventListener("resize", marqueeResizeHandler);
      }
    }

    return () => {
      if (marqueeResizeHandler) {
        window.removeEventListener("resize", marqueeResizeHandler);
      }
      if (marqueeTimeout) {
        clearTimeout(marqueeTimeout);
      }
      if (marqueeRef.current) {
        const marqueeContent = marqueeRef.current.querySelector(
          ".marquee-content",
        ) as HTMLElement;
        if (marqueeContent) {
          gsap.killTweensOf(marqueeContent);
        }
      }
    };
  }, [randomizedCompanies]);

  useEffect(() => {
    if (!imagesLoaded) return;

    // Render first frame
    renderFrame(0);

    // Handle window resize
    const handleResize = () => {
      renderFrame(frameRef.current.current);
    };
    window.addEventListener("resize", handleResize);

    // GSAP ScrollTrigger animation
    const ctx = gsap.context(() => {
      gsap.to(frameRef.current, {
        current: TOTAL_FRAMES - 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.5,
          pin: true,
          onUpdate: (self) => {
            const frameIndex = Math.round(self.progress * (TOTAL_FRAMES - 1));
            frameRef.current.current = frameIndex;
            renderFrame(frameIndex);

            // Fade in and zoom out video container based on scroll progress
            // Start at 50% progress, fully visible at 100%
            if (videoContainerRef.current) {
              // Opacity: 0 at 50% progress, 1 at 100%
              const videoOpacity = Math.min(
                1,
                Math.max(0, (self.progress - 0.5) / 0.5),
              );

              // Scale: starts at 2.5 (zoomed in), ends at 1 (normal)
              // Inverse of opacity progression
              const videoScale = 2.5 - 1.5 * videoOpacity; // 2.5 -> 1

              videoContainerRef.current.style.opacity = String(videoOpacity);
              videoContainerRef.current.style.transform = `scale(${videoScale})`;
            }
          },
        },
      });
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [imagesLoaded, renderFrame]);

  const effectiveOpacity = navOpacity;
  const effectiveBlur = navBlur;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Canvas for sequence animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          opacity: imagesLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Loading placeholder */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-[#E8E4DC] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#2D3E2F]/20 border-t-[#2D3E2F] rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-[#2D3E2F]/60 text-sm">
              Loading... {loadingProgress}%
            </p>
          </div>
        </div>
      )}

      {/* Video container - fades in and zooms out on scroll */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0, transform: "scale(2.5)" }}
      >
        <div className="relative w-[85%] sm:w-[90%] md:w-[50%] max-w-6xl rounded-lg overflow-hidden shadow-2xl pointer-events-auto">
          {/* Hero product shot image - always rendered to maintain dimensions */}
          <img
            src="/images/hero/hero-product-shot.png"
            alt="Adaline Product Interface"
            style={{
              filter: `blur(${effectiveBlur}px)`,
              transition: "filter 0.1s ease-out",
            }}
            className={`w-full h-auto ${isVideoPlaying ? "invisible" : "visible"}`}
          />

          {/* Video element - positioned absolutely to match image dimensions */}
          <video
            ref={videoRef}
            style={{
              filter: `blur(${effectiveBlur}px)`,
              transition: "filter 0.1s ease-out",
            }}
            className={`absolute inset-0 w-full h-full object-cover ${isVideoPlaying ? "visible" : "invisible"}`}
            src="/videos/productDemo.mp4"
            controls
            playsInline
            onEnded={() => setIsVideoPlaying(false)}
          />

          {/* Play button overlay - shown when video is not playing */}
          {!isVideoPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={handlePlayClick}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 5.14v14.72a1 1 0 001.55.83l11-7.36a1 1 0 000-1.66l-11-7.36A1 1 0 008 5.14z"
                    fill="#2D3E2F"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content overlay */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center"
        style={{
          opacity: effectiveOpacity,
          fontFamily: "var(--font-work-sans)",
        }}
      >
        {/* Spacer to position content - smaller gap from nav */}
        <div style={{ height: "calc(var(--nav-height, 56px) + 40px)" }} />

        {/* Hero headline - positioned in upper portion */}
        <h1 className="text-[1.375rem] sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] xl:text-[3rem] font-medium text-[#0a1d08] tracking-[-0.015em] max-w-4xl text-center leading-[1.1] px-4 sm:px-6 md:px-8">
          The single platform to iterate,
          <br />
          evaluate, deploy, and monitor AI agents
        </h1>

        {/* Trusted By section - positioned below hero text */}
        <div
          className="mt-6 sm:mt-8 md:mt-10 text-center w-full px-4 sm:px-6"
          style={{ paddingInline: "max(16px, var(--grid-margin, 24px))" }}
        >
          <p className="text-[9px] sm:text-[10px] font-medium tracking-[0.25em] uppercase text-[#2D3E2F]/40 mb-3 sm:mb-4">
            TRUSTED BY
          </p>
          {/* Scrolling marquee container */}
          <div
            ref={marqueeRef}
            className="relative overflow-hidden mx-auto"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              maxWidth: "900px",
              width: "100%",
            }}
          >
            <div
              className="marquee-content flex items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16"
              style={{ width: "fit-content" }}
            >
              {/* First set of logos */}
              {randomizedCompanies.map((name: string, index: number) => (
                <div key={`first-${index}`} className="flex-shrink-0">
                  <CompanyLogo name={name} />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {randomizedCompanies.map((name: string, index: number) => (
                <div key={`second-${index}`} className="flex-shrink-0">
                  <CompanyLogo name={name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Company logo component
const CompanyLogo = ({ name }: { name: string }) => {
  // Render text-based logos with appropriate styling - responsive SVGs
  const logos: { [key: string]: React.ReactNode } = {
    salesforce: (
      <div className="flex items-center gap-1 w-20 sm:w-24 md:w-32">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122 25"
          fill="currentColor"
          className="w-full h-auto"
        >
          <path
            fillRule="evenodd"
            d="M38.867 16.463c-.068.178.024.215.046.247.204.147.411.254.619.374 1.109.587 2.154.759 3.248.759 2.226 0 3.61-1.186 3.61-3.093v-.037c0-1.764-1.564-2.406-3.024-2.865l-.191-.062c-1.105-.358-2.059-.67-2.059-1.396v-.038c0-.622.559-1.08 1.42-1.08.958 0 2.1.318 2.83.721 0 0 .216.14.294-.069.043-.113.415-1.109.455-1.22.042-.118-.032-.206-.108-.251-.838-.51-1.995-.858-3.192-.858h-.222c-2.04 0-3.464 1.234-3.464 2.997v.038c0 1.86 1.573 2.466 3.04 2.885l.237.073c1.07.33 1.995.615 1.995 1.365v.038c0 .69-.603 1.204-1.568 1.204a5.26 5.26 0 0 1-2.869-.825c-.157-.092-.246-.158-.367-.231-.064-.04-.223-.109-.293.1l-.439 1.221m32.599 0c-.069.178.024.215.047.247.203.147.41.254.618.374 1.11.587 2.155.758 3.248.758 2.226 0 3.61-1.185 3.61-3.092v-.037c0-1.764-1.56-2.406-3.023-2.865l-.192-.062c-1.105-.358-2.058-.67-2.058-1.397v-.037c0-.622.558-1.081 1.42-1.081.958 0 2.095.319 2.829.722 0 0 .216.14.295-.069.043-.113.415-1.11.451-1.22.043-.118-.032-.206-.108-.251-.838-.511-1.995-.858-3.192-.858h-.222c-2.04 0-3.464 1.234-3.464 2.997v.038c0 1.86 1.572 2.466 3.04 2.885l.236.073c1.074.329 1.996.615 1.996 1.365v.037c0 .69-.603 1.205-1.569 1.205a5.25 5.25 0 0 1-2.868-.826c-.157-.091-.249-.154-.368-.23-.04-.026-.228-.1-.292.1l-.44 1.22m22.265-3.734c0 1.077-.201 1.927-.594 2.53-.393.594-.986.886-1.812.886s-1.416-.29-1.803-.882c-.39-.599-.587-1.453-.587-2.53s.198-1.923.587-2.518c.386-.59.973-.873 1.803-.873s1.42.286 1.812.873c.395.595.594 1.44.594 2.518m1.86-1.999a4.5 4.5 0 0 0-.846-1.616 4.05 4.05 0 0 0-1.429-1.085c-.567-.265-1.237-.4-1.995-.4q-1.138.001-1.995.4c-.567.265-1.05.63-1.428 1.085a4.5 4.5 0 0 0-.846 1.616 7 7 0 0 0-.274 2c0 .713.092 1.384.274 1.998.182.619.467 1.161.846 1.616.38.455.861.818 1.428 1.077.57.259 1.24.39 1.995.39.754 0 1.424-.131 1.991-.39a4 4 0 0 0 1.428-1.077c.38-.455.663-.997.846-1.616a7 7 0 0 0 .274-1.999c0-.71-.093-1.384-.274-1.999m15.282 5.107c-.061-.18-.237-.112-.237-.112-.27.103-.559.199-.866.247-.31.048-.655.073-1.018.073-.897 0-1.616-.268-2.126-.798-.515-.53-.802-1.385-.798-2.542.003-1.053.257-1.843.714-2.45.451-.598 1.145-.91 2.063-.91.766 0 1.352.09 1.967.282 0 0 .145.063.215-.129.163-.45.284-.774.459-1.268.05-.142-.072-.202-.116-.219a7 7 0 0 0-1.241-.314 9.4 9.4 0 0 0-1.396-.093c-.782 0-1.477.134-2.071.399a4.3 4.3 0 0 0-1.496 1.085 4.6 4.6 0 0 0-.906 1.616 6.4 6.4 0 0 0-.303 2.003c0 1.54.415 2.789 1.237 3.703.821.917 2.058 1.38 3.67 1.38.954 0 1.931-.193 2.634-.47 0 0 .134-.065.076-.222l-.459-1.26m3.252-4.15c.088-.599.252-1.098.51-1.485.386-.59.974-.913 1.8-.913s1.372.325 1.763.913c.26.39.373.906.415 1.485l-4.508-.001zm6.264-1.317a4 4 0 0 0-.806-1.472c-.407-.435-.802-.742-1.197-.91a4.6 4.6 0 0 0-1.804-.366c-.786 0-1.5.133-2.078.403a4.14 4.14 0 0 0-1.449 1.105 4.6 4.6 0 0 0-.854 1.636 7 7 0 0 0-.276 2.007c0 .726.096 1.4.286 2.011.191.615.498 1.153.913 1.6.415.451.946.802 1.584 1.05.635.245 1.405.372 2.287.37 1.819-.007 2.777-.412 3.168-.631.069-.04.135-.107.053-.3l-.411-1.154c-.063-.172-.237-.11-.237-.11-.451.169-1.089.471-2.585.467-.978-.002-1.7-.29-2.155-.742-.463-.463-.694-1.137-.73-2.095l6.304.005s.166-.002.183-.164c.007-.067.216-1.292-.188-2.709zM63.72 11.685c.089-.599.253-1.098.51-1.485.387-.59.974-.913 1.8-.913s1.373.325 1.764.913c.258.39.372.906.415 1.485l-4.51-.001zm6.264-1.317a3.9 3.9 0 0 0-.806-1.472c-.407-.435-.802-.742-1.197-.91a4.6 4.6 0 0 0-1.803-.366c-.786 0-1.5.133-2.08.403a4.14 4.14 0 0 0-1.447 1.105 4.6 4.6 0 0 0-.854 1.636 7 7 0 0 0-.276 2.007c0 .726.096 1.4.286 2.011.19.615.499 1.153.91 1.6q.624.677 1.584 1.05c.634.245 1.4.372 2.286.37 1.82-.007 2.777-.412 3.168-.631.07-.04.136-.107.053-.3l-.41-1.154c-.064-.172-.238-.11-.238-.11-.451.169-1.09.471-2.586.467-.973-.002-1.7-.29-2.154-.742-.463-.463-.695-1.137-.73-2.095l6.304.005s.166-.002.183-.164c.007-.067.216-1.292-.189-2.709zm-19.87 5.426c-.247-.197-.281-.245-.363-.373q-.188-.29-.189-.818c0-.55.184-.95.563-1.217-.004 0 .542-.47 1.827-.455q.859.016 1.708.146v2.86s-.797.173-1.7.227c-1.28.077-1.846-.369-1.843-.368zm2.506-4.428a14 14 0 0 0-.982-.028c-.539 0-1.061.067-1.548.198-.49.133-.934.338-1.313.61-.38.272-.693.627-.913 1.038q-.336.625-.337 1.453c0 .558.097 1.04.288 1.436.188.392.47.73.822.985.35.255.782.443 1.281.555q.744.17 1.668.17c.646 0 1.289-.054 1.911-.16q.795-.136 1.584-.307c.21-.049.443-.112.443-.112.156-.04.144-.206.144-.206l-.004-5.745c0-1.261-.337-2.199-1.001-2.777s-1.632-.87-2.89-.87c-.47 0-1.232.064-1.687.155 0 0-1.373.267-1.94.71 0 0-.124.077-.056.25l.447 1.197c.056.156.207.103.207.103s.047-.02.103-.052c1.21-.659 2.741-.639 2.741-.639.678 0 1.205.138 1.556.407.344.264.519.663.519 1.5v.267a22 22 0 0 0-1.037-.124zm50.673-3.244a.17.17 0 0 0 0-.133.17.17 0 0 0-.095-.093c-.107-.042-.642-.155-1.053-.18-.79-.05-1.229.084-1.624.26-.39.177-.822.46-1.062.787v-.766c0-.106-.075-.19-.181-.19h-1.612c-.105 0-.18.084-.18.19v9.376a.19.19 0 0 0 .19.191h1.653a.19.19 0 0 0 .19-.19v-4.709c0-.63.07-1.257.208-1.652.137-.39.322-.702.551-.925.218-.216.485-.376.778-.467.275-.08.56-.12.846-.12.329 0 .69.085.69.085.121.014.189-.06.23-.17.108-.287.415-1.149.475-1.32"
            clipRule="evenodd"
          ></path>
          <path
            fillRule="evenodd"
            d="M87.865 3.794a4.875 4.875 0 0 0-1.477-.214c-1.14 0-2.037.322-2.667.957-.625.63-1.05 1.59-1.264 2.854l-.077.427h-1.43s-.174-.007-.21.183l-.235 1.309c-.016.125.038.203.205.203h1.391L80.69 17.39c-.11.634-.237 1.156-.377 1.552-.138.39-.273.682-.44.895-.16.205-.312.356-.575.445a2.3 2.3 0 0 1-.74.106c-.153 0-.356-.025-.506-.055s-.227-.063-.34-.11c0 0-.162-.063-.227.1a116 116 0 0 0-.466 1.28c-.045.125.018.223.097.251.185.066.322.109.575.168a3.8 3.8 0 0 0 .922.088c.579 0 1.107-.082 1.545-.24.44-.159.823-.436 1.163-.812.366-.404.597-.829.818-1.407.218-.574.404-1.285.553-2.115l1.418-8.023h2.073s.175.006.21-.184l.236-1.308c.016-.126-.038-.204-.206-.203h-2.012c.01-.045.101-.753.332-1.42.099-.284.284-.514.442-.671.146-.15.327-.263.527-.328.218-.068.446-.1.675-.097.19 0 .376.022.517.052.195.041.271.063.322.078.205.063.233.002.273-.097l.481-1.321c.05-.142-.07-.202-.115-.22m-28.12 13.613c0 .105-.075.19-.18.19h-1.669c-.106 0-.18-.085-.18-.19V3.973c0-.105.074-.19.18-.19h1.67c.104 0 .18.085.18.19zM14.459 4.675a5.08 5.08 0 0 1 3.685-1.594c1.923 0 3.59 1.077 4.486 2.681a6.15 6.15 0 0 1 2.532-.544c3.46 0 6.27 2.854 6.27 6.376s-2.81 6.376-6.27 6.376a6.3 6.3 0 0 1-1.24-.124c-.784 1.411-2.285 2.37-3.994 2.37a4.5 4.5 0 0 1-2.008-.466c-.796 1.885-2.65 3.21-4.807 3.21-2.254 0-4.166-1.433-4.903-3.447a4.8 4.8 0 0 1-.998.105c-2.681 0-4.85-2.218-4.85-4.943 0-1.831.977-3.425 2.425-4.287a5.7 5.7 0 0 1-.465-2.261c0-3.145 2.532-5.687 5.651-5.687a5.61 5.61 0 0 1 4.487 2.24"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    ),
    Discord: (
      <div className="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="107"
          height="20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.573 3.025q.244-.566.544-1.1l.004.007c1.46.246 2.885.684 4.23 1.301 2.32 3.392 3.475 7.222 3.049 11.64a17 17 0 0 1-5.192 2.603 12.5 12.5 0 0 1-1.113-1.792c.61-.23 1.195-.507 1.755-.839a5 5 0 0 1-.43-.323 12.2 12.2 0 0 1-10.38 0l-.048.037q-.186.144-.381.286c.56.327 1.145.61 1.75.835-.318.626-.69 1.227-1.112 1.792a17 17 0 0 1-5.192-2.606c-.36-3.81.364-7.672 3.04-11.637a17 17 0 0 1 4.235-1.305c.2.356.384.724.544 1.1a15.9 15.9 0 0 1 4.697 0M6.97 10.47c0 1.134.838 2.05 1.85 2.05 1.03 0 1.828-.92 1.844-2.05s-.81-2.054-1.849-2.054c-1.04 0-1.845.921-1.845 2.054m6.82 0c0 1.134.83 2.05 1.846 2.05 1.03 0 1.829-.92 1.845-2.05s-.806-2.054-1.845-2.054c-1.04 0-1.846.921-1.846 2.054M39.165 4.77q-1.527-.69-3.736-.689h-6.106v10.963h5.668q2.396.003 4.015-.736a5.36 5.36 0 0 0 2.414-1.995c.527-.843.8-1.82.79-2.814a5.2 5.2 0 0 0-.761-2.81 5.03 5.03 0 0 0-2.284-1.919m-1.95 6.742q-.8.743-2.287.743h-1.69V6.868h1.91q1.438.003 2.154.714c.487.51.714 1.181.711 1.901.004.778-.252 1.5-.798 2.029"
            clipRule="evenodd"
          ></path>
          <path d="M49.068 14.071c.71.431 1.48.753 2.286.955.852.22 1.728.33 2.608.329q2.296.003 3.532-.828a2.6 2.6 0 0 0 1.246-2.263q-.002-1.293-.751-1.964-.75-.671-2.275-.94l-1.566-.282a3.6 3.6 0 0 1-.837-.241.38.38 0 0 1-.223-.354q0-.5 1.471-.5c.669-.002 1.335.086 1.98.259a6.7 6.7 0 0 1 1.7.695v-2.46a6.8 6.8 0 0 0-1.816-.72 9.7 9.7 0 0 0-2.412-.282 8 8 0 0 0-2.568.369 3.83 3.83 0 0 0-1.69 1.04 2.32 2.32 0 0 0-.596 1.581c-.03.651.213 1.285.671 1.747q.678.665 2.293 1.04l1.88.423c.221.038.431.13.61.266a.53.53 0 0 1 .157.392c0 .13-.097.255-.289.353-.27.113-.562.164-.855.148a8.8 8.8 0 0 1-2.498-.383 6.2 6.2 0 0 1-2.058-.98zM60.411 12.908a4.7 4.7 0 0 0 2.03 1.79 7.4 7.4 0 0 0 3.258.662c1.401.03 2.783-.328 3.993-1.034v-2.774c-.41.24-.85.426-1.306.557-.501.15-1.021.225-1.544.224q-1.518 0-2.317-.54a1.599 1.599 0 0 1 .022-2.78q.823-.532 2.28-.532a5.07 5.07 0 0 1 2.84.846v-2.87q-1.55-.987-3.898-.987a7.7 7.7 0 0 0-3.257.635 4.73 4.73 0 0 0-2.067 1.745 4.6 4.6 0 0 0-.705 2.521 4.83 4.83 0 0 0 .671 2.537"></path>
          <path
            fillRule="evenodd"
            d="M71.497 12.908a4.87 4.87 0 0 0 2.07 1.79v-.005a8.12 8.12 0 0 0 6.404 0 4.8 4.8 0 0 0 2.058-1.79 4.76 4.76 0 0 0 .704-2.552 4.57 4.57 0 0 0-.704-2.52 4.75 4.75 0 0 0-2.052-1.723 8.54 8.54 0 0 0-6.42 0 4.8 4.8 0 0 0-2.06 1.731 4.53 4.53 0 0 0-.711 2.516 4.73 4.73 0 0 0 .711 2.553m7.4-2.501a2.04 2.04 0 0 1-.573 1.512 2.1 2.1 0 0 1-1.565.57 2.13 2.13 0 0 1-1.566-.57 2.05 2.05 0 0 1-.57-1.512 2 2 0 0 1 .57-1.494c.427-.387.99-.588 1.566-.557a2.13 2.13 0 0 1 1.565.557c.392.395.6.938.573 1.494"
            clipRule="evenodd"
          ></path>
          <path d="M90.594 9.045a2.8 2.8 0 0 1 1.55.391V6.05a2.75 2.75 0 0 0-1.425-.375 2.38 2.38 0 0 0-1.79.76q-.698.758-1.01 2.356V5.882H84.16v9.16h3.837V12.16q0-1.597.67-2.356.673-.759 1.927-.76"></path>
          <path
            fillRule="evenodd"
            d="M99.573 14.747a3.64 3.64 0 0 0 1.481-1.763v2.058h3.836V3.768h-3.837V7.85q-.94-2.38-3.68-2.38A4.44 4.44 0 0 0 95 6.112a4.35 4.35 0 0 0-1.612 1.79c-.39.804-.58 1.69-.555 2.583a5.8 5.8 0 0 0 .523 2.499 4.16 4.16 0 0 0 1.508 1.738 4.05 4.05 0 0 0 2.27.633 4.66 4.66 0 0 0 2.439-.609m1.505-4.362a1.97 1.97 0 0 1-.588 1.48 2.14 2.14 0 0 1-1.566.562 2.1 2.1 0 0 1-1.535-.562 1.94 1.94 0 0 1-.586-1.46 1.91 1.91 0 0 1 .58-1.448 2.46 2.46 0 0 1 3.107 0c.391.37.605.89.588 1.428"
            clipRule="evenodd"
          ></path>
          <path d="M47.357 5.14c0-.95-.857-1.719-1.913-1.719s-1.913.77-1.913 1.718c0 .949.857 1.718 1.913 1.718s1.913-.77 1.913-1.718M47.357 8.04a4.94 4.94 0 0 1-3.828 0v7.051h3.828z"></path>
        </svg>
      </div>
    ),
    Reforge: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="104"
        height="26"
        fill="currentColor"
      >
        <path d="M94.3 13.876h5.72c-.161-1.583-1.08-2.638-2.802-2.638-1.608 0-2.619 1.032-2.917 2.638m2.918 6.811c-3.491 0-5.283-2.568-5.283-5.71s2.067-5.711 5.328-5.711 5.076 2.523 5.076 5.412c0 .344-.022.826-.068 1.032h-8.039c.115 1.766 1.103 3.005 2.87 3.005 1.448 0 2.32-.665 2.688-1.95h2.343c-.528 2.317-2.09 3.922-4.915 3.922m-17.73-5.802c0-3.303 2.02-5.62 5.006-5.62 2.044 0 3.376 1.193 3.881 2.799.023.069.092.069.092 0V9.449h2.16v9.679c0 3.44-1.907 5.756-5.697 5.756-2.94 0-4.8-1.49-5.075-3.692h2.342c.184.917.873 1.72 2.78 1.72 2.411 0 3.444-1.514 3.49-3.715l.023-1.4c0-.068-.069-.068-.092 0-.528 1.675-2.02 2.707-3.904 2.707-2.986 0-5.007-2.317-5.007-5.62m8.703 0c0-2.11-1.262-3.647-3.215-3.647-2.182 0-3.192 1.537-3.192 3.647s1.01 3.646 3.192 3.646c1.953 0 3.215-1.56 3.215-3.646M73.08 9.449h2.044l-.023 2.615c0 .069.07.069.092 0 .575-1.652 1.31-2.798 3.881-2.798v2.178c-2.916-.091-3.789 1.537-3.789 3.83v5.253H73.08zm-9.876 5.528c0 2.11 1.034 3.738 3.078 3.738s3.078-1.628 3.078-3.738-1.034-3.739-3.078-3.739-3.078 1.629-3.078 3.739m8.498 0c0 3.165-2.044 5.71-5.42 5.71s-5.42-2.546-5.42-5.71 2.044-5.711 5.42-5.711 5.42 2.546 5.42 5.71m-16.49 5.55v-9.174h-1.7V9.449h1.746v-.275c0-2.66 1.47-4.243 5.236-4.06v2.088c-2.342-.23-3.077.596-3.077 2.247h3.077v1.904h-3.077v9.174zm-10.357-6.651h5.719c-.16-1.583-1.08-2.638-2.802-2.638-1.608 0-2.618 1.032-2.917 2.638m2.917 6.811c-3.491 0-5.282-2.568-5.282-5.71s2.067-5.711 5.328-5.711 5.076 2.523 5.076 5.412c0 .344-.023.826-.07 1.032h-8.038c.115 1.766 1.103 3.005 2.871 3.005 1.447 0 2.32-.665 2.687-1.95h2.343c-.528 2.317-2.09 3.922-4.915 3.922M32.314 12.89h3.17c2.25 0 3.514-.963 3.514-2.82 0-1.675-.92-2.638-3.354-2.638h-3.33zm-2.366 7.638V5.413h5.627c4.066 0 5.788 1.743 5.788 4.426 0 1.995-1.263 3.899-4.387 4.037-.069 0-.069.091 0 .091 3.239.367 4.938 3.142 4.938 6.56h-2.48c0-3.028-1.332-5.62-4.57-5.62h-2.55v5.62zM4.94 5.244c-.059-.024-.044-.11.019-.113 1.53-.09 3.071.024 3.984.223 1.62.353 3.078.984 4.083 2.527.432.663.746 1.394.845 2.144a.08.08 0 0 1-.08.092H8.316a.08.08 0 0 1-.08-.075C8.118 8.286 7.167 6.174 4.94 5.244M19.253 20.38c.058.024.044.109-.019.112-1.53.09-3.072-.024-3.984-.223-1.62-.353-3.078-.984-4.083-2.527-.432-.663-.746-1.393-.845-2.144a.08.08 0 0 1 .08-.092h5.475a.08.08 0 0 1 .081.076c.117 1.755 1.068 3.867 3.295 4.797M7.879 10.634c.034-.049-.016-.111-.07-.09-1.32.536-7.058 3.254-5.884 6.946 1.032 3.216 6.514 3.08 7.78 3.006.062-.004.076-.09.018-.113-2.263-.943-3.21-3.104-3.303-4.864-.067-1.274.265-3.223 1.459-4.885M16.327 14.989c-.035.048.015.111.07.089 1.319-.535 7.057-3.253 5.884-6.945-1.032-3.216-6.515-3.081-7.78-3.006-.062.004-.077.088-.019.113 2.264.942 3.21 3.104 3.304 4.863.067 1.274-.265 3.224-1.46 4.886"></path>
      </svg>
    ),
    Daybreak: (
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="113"
          height="29"
          fill="currentColor"
        >
          <path d="m99.273 11.22 2.977 3.072h8.463v-1.724h-8.306l7.157-4.313-.836-1.509-7.157 4.312 4.127-7.438-1.41-.863-4.18 7.439v-8.57h-1.671v8.57L94.31 2.757l-1.463.863 4.127 7.438-7.157-4.312-.836 1.51 7.157 4.312h-8.306v1.724h8.463zM79.683 17.528l3.343-4.312-1.358-1.078-3.396 4.527h-1.567V8.472h-1.776v14.123h1.776V18.39h1.567l3.187 4.205h2.194z"></path>
          <path
            fillRule="evenodd"
            d="M37.191 14.02c.888-1.078 2.142-1.67 3.657-1.67 1.358 0 2.507.484 3.5 1.508.94.97 1.41 2.264 1.41 3.72 0 1.509-.47 2.749-1.41 3.773s-2.09 1.51-3.5 1.51c-1.567 0-2.769-.54-3.657-1.672v1.456h-1.776V8.522h1.776zm0 3.612c0 1.024.313 1.832.94 2.48.627.646 1.41.97 2.403.97s1.776-.324 2.404-.97c.626-.648.94-1.456.94-2.48s-.314-1.833-.94-2.48c-.628-.7-1.463-1.024-2.404-1.024-.992 0-1.724.323-2.403 1.024-.626.647-.94 1.456-.94 2.48M11.509 10.95c-1.254-1.239-2.874-1.886-4.754-1.886H1.688v13.53h5.067c1.88 0 3.5-.647 4.754-1.94q1.88-1.94 1.88-4.852 0-2.91-1.88-4.851m-1.359 8.356c-.888.916-2.037 1.401-3.395 1.401H3.568v-9.81h3.187c1.358 0 2.455.485 3.395 1.401.889.917 1.359 2.102 1.359 3.504 0 1.401-.47 2.587-1.359 3.504M17.935 22.81c1.201 0 2.298-.485 2.925-1.348v1.132h2.873v-1.671H22.48v-8.409h-7.47v1.779h5.694v1.779h-2.768q-1.567 0-2.508.97c-.68.647-.992 1.455-.992 2.372 0 .97.313 1.778.992 2.425q1.02.97 2.508.97m.209-1.671c-1.097 0-1.933-.701-1.933-1.725 0-.97.836-1.671 1.933-1.671h2.56v1.51c0 1.131-1.046 1.886-2.56 1.886M53.875 13.807c.993-1.024 2.247-1.509 3.71-1.509 1.462 0 2.664.54 3.708 1.563.94.97 1.463 2.21 1.463 3.72 0 .075-.011.173-.023.278-.014.122-.03.253-.03.368v.054l-.051.054h-8.307c.157.809.523 1.51 1.098 1.995a3.26 3.26 0 0 0 2.194.808c1.358 0 2.507-.7 3.03-1.833v-.053h1.932l-.052.107c-.679 2.103-2.664 3.45-4.963 3.45a5.17 5.17 0 0 1-3.709-1.509c-.992-1.024-1.462-2.264-1.462-3.773 0-1.456.47-2.695 1.462-3.72m7 2.911c-.365-1.617-1.671-2.695-3.29-2.695-1.672 0-2.926 1.024-3.24 2.695zM67.562 22.81c1.202 0 2.299-.485 2.926-1.348v1.132h2.873v-1.671h-1.254v-8.409h-7.47v1.779h5.694v1.779h-2.769q-1.566 0-2.507.97c-.68.647-.993 1.455-.993 2.372 0 .97.314 1.778.993 2.425q1.019.97 2.507.97m.21-1.671c-1.098 0-1.934-.701-1.934-1.725 0-.97.836-1.671 1.933-1.671h2.56v1.51c0 1.131-1.045 1.886-2.56 1.886"
            clipRule="evenodd"
          ></path>
          <path d="m25.822 12.514 3.186 7.762 3.187-7.762h1.985l-2.037 4.798-4.232 9.864-1.619-.755 1.724-3.935-4.18-9.972zM47.188 22.594h1.776v-8.247H52.1v-1.833h-4.91z"></path>
        </svg>
      </div>
    ),
    DoorDash: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="147"
        height="21"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M51.375 10.7c0-3.29-2.555-5.906-5.932-5.906l-3.996.011a.29.29 0 0 0-.287.295v11.227a.29.29 0 0 0 .287.294h3.996c3.377 0 5.932-2.631 5.932-5.92m-4.59 3.347a3.5 3.5 0 0 1-1.342.293h-1.812V7.072h1.8119999999999998a3.4 3.4 0 0 1 2.478 1.062 3.58 3.58 0 0 1 .98 2.566 3.64 3.64 0 0 1-.994 2.555 3.5 3.5 0 0 1-1.122.792M66.353 10.7c0-3.373-2.717-6.174-6.272-6.174-3.531 0-6.25 2.788-6.25 6.174s2.695 6.174 6.25 6.174 6.272-2.801 6.272-6.174m-2.763 1.503c-.59 1.451-1.976 2.395-3.51 2.39-2.09-.01-3.778-1.75-3.778-3.893.003-1.573.929-2.99 2.346-3.588a3.72 3.72 0 0 1 4.13.852 3.96 3.96 0 0 1 .812 4.239M81.248 10.7c0-3.386-2.717-6.174-6.26-6.174-3.555 0-6.273 2.788-6.273 6.174s2.74 6.174 6.272 6.174 6.261-2.787 6.261-6.174m-2.479.003c.002 2.144-1.69 3.884-3.781 3.89a3.75 3.75 0 0 1-2.686-1.14 3.94 3.94 0 0 1-1.113-2.753c.003-2.145 1.7-3.88 3.792-3.88 2.09 0 3.785 1.737 3.788 3.883M84.797 4.805a.29.29 0 0 0-.287.295l.014 11.218a.29.29 0 0 0 .286.295h1.876a.29.29 0 0 0 .286-.295v-3.822h2.143l2.138 3.98a.29.29 0 0 0 .26.16h1.948a.28.28 0 0 0 .271-.144.3.3 0 0 0-.01-.315l-2.22-4.022c1.277-.655 2.076-2 2.058-3.463 0-2.164-1.66-3.887-3.953-3.887zm5.332 5.3q-.287.108-.593.095h-2.555V7.072h2.555v.003a1.5 1.5 0 0 1 1.122.454 1.57 1.57 0 0 1 .444 1.151 1.55 1.55 0 0 1-.468 1.102 1.5 1.5 0 0 1-.505.323M107.746 10.762c0-3.296-2.555-5.915-5.932-5.915l-3.985.013a.29.29 0 0 0-.286.296v11.227a.29.29 0 0 0 .175.27.3.3 0 0 0 .111.024h3.985c3.377 0 5.932-2.62 5.932-5.915m-4.59 3.343c-.424.186-.88.285-1.342.291h-1.811V7.128h1.812a3.4 3.4 0 0 1 2.482 1.063 3.567 3.567 0 0 1 .977 2.57 3.64 3.64 0 0 1-.995 2.554c-.318.336-.7.604-1.123.79M112.14 16.407l.918-2.588h4.44l.917 2.587a.285.285 0 0 0 .287.203h1.989a.28.28 0 0 0 .261-.123.3.3 0 0 0 .026-.294l-4.3-11.216a.285.285 0 0 0-.287-.194h-2.227a.286.286 0 0 0-.287.194l-4.3 11.216a.297.297 0 0 0 .139.392q.07.032.147.026h1.991a.29.29 0 0 0 .286-.203m1.74-4.784 1.402-3.886 1.399 3.886z"
          clipRule="evenodd"
        ></path>
        <path d="M127.322 4.526c-2.471 0-4.037 1.606-4.037 3.463l-.001.018c0 2.455 1.971 3.056 3.623 3.559 1.191.362 2.216.675 2.216 1.595 0 .847-.814 1.523-2.049 1.523a3.64 3.64 0 0 1-2.52-1.053.284.284 0 0 0-.416 0l-1.066 1.094a.3.3 0 0 0-.093.216.3.3 0 0 0 .093.216 5.78 5.78 0 0 0 4.168 1.717c2.789 0 4.366-1.62 4.369-3.76 0-2.455-1.973-3.056-3.626-3.56-1.191-.362-2.217-.674-2.217-1.594 0-.679.731-1.267 1.72-1.267a2.86 2.86 0 0 1 1.913.773.28.28 0 0 0 .203.086.28.28 0 0 0 .203-.086l1.103-1.123a.3.3 0 0 0 0-.432 5.05 5.05 0 0 0-3.586-1.385M137.238 4.974a.3.3 0 0 1 .02.11v4.44h4.945v-4.44a.29.29 0 0 1 .283-.293h1.876a.29.29 0 0 1 .266.183.3.3 0 0 1 .02.11V16.3a.29.29 0 0 1-.286.295h-1.876a.29.29 0 0 1-.286-.295V11.79h-4.942v4.51a.29.29 0 0 1-.286.294h-1.876a.29.29 0 0 1-.286-.295V5.085a.28.28 0 0 1 .082-.206.3.3 0 0 1 .204-.088h1.876a.29.29 0 0 1 .266.183M24.017 2.384c2.768-.01 5.313 1.492 6.614 3.904v-.003c3.347 6.274-1.182 12.594-7.173 12.594h-4.604c-.57.001-1.117-.224-1.523-.624l-4.565-4.532a.705.705 0 0 1 .111-1.094.7.7 0 0 1 .398-.12h10.18c1.052-.01 1.896-.86 1.885-1.898a1.89 1.89 0 0 0-1.924-1.86H8.65c-.57 0-1.12-.224-1.522-.625L2.565 3.598a.705.705 0 0 1 .109-1.093.7.7 0 0 1 .397-.12z"></path>
      </svg>
    ),
    SimpleDocs: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="102"
        height="24"
        fill="currentColor"
      >
        <path d="M25.143 16.912q.025-.276.192-.544.176-.276.377-.427c.504.345 1.05.626 1.622.837a5.1 5.1 0 0 0 1.724.319q1.196 0 1.907-.494.72-.503.719-1.382 0-.795-.535-1.314a4.1 4.1 0 0 0-1.288-.845l-2.024-.853q-1.063-.453-1.657-1.13-.585-.68-.585-1.666 0-.829.435-1.532t1.238-1.121q.811-.427 1.924-.427.953 0 1.798.242.772.216 1.497.561 0 .26-.134.544c-.08.179-.2.336-.35.46a7.4 7.4 0 0 0-1.398-.552 4.8 4.8 0 0 0-1.363-.217q-1.061 0-1.748.536a1.7 1.7 0 0 0-.678 1.405q0 .704.494 1.121a4.7 4.7 0 0 0 1.162.687l1.958.82q.652.268 1.22.679c.37.264.684.6.921.987q.351.577.351 1.348 0 .928-.426 1.657-.42.72-1.288 1.138-.87.418-2.2.418a6.5 6.5 0 0 1-2.075-.343 7 7 0 0 1-1.79-.912m10.551 1.055a2.7 2.7 0 0 1-.569.05 2.8 2.8 0 0 1-.585-.05v-6.512q0-.469-.15-.636-.144-.168-.536-.167h-.15a2 2 0 0 1-.043-.645q.017-.1.042-.226.276-.041.477-.05.2-.017.326-.017h.134q.502 0 .778.31.276.3.276.845zM34.02 7.605q0-.369.117-.603a1 1 0 0 1 .327-.117q.21-.05.393-.05.166 0 .394.05a.8.8 0 0 1 .325.117q.05.101.084.276.033.177.033.327 0 .369-.117.602-.084.075-.317.126-.235.042-.402.042-.184 0-.394-.042a1.1 1.1 0 0 1-.325-.126 1.35 1.35 0 0 1-.118-.602m25.585 9.458q.101.251.101.636v.125a.3.3 0 0 1-.017.11 14 14 0 0 1-.585.066 7 7 0 0 1-.603.034q-.602 0-.986-.343-.386-.344-.386-.996V5.763l.101-.1h.418q.402 0 .51.21.11.2.109.594v9.893q0 .351.16.527.157.176.46.176zm17.536-4.813q0 .979-.134 1.883a5.3 5.3 0 0 1-.519 1.674q-.384.78-1.154 1.398a3.2 3.2 0 0 1-.903.494 6 6 0 0 1-1.08.268 6.6 6.6 0 0 1-.995.083q-1.272 0-2.543-.033l-1.346-.033-.11-.11V6.626l.11-.11q.72-.024 1.338-.04.618-.017 1.238-.017h1.313a6.7 6.7 0 0 1 2.083.352q.527.183.895.485.761.619 1.146 1.406.393.779.527 1.682.134.896.134 1.866m-2.2 0q0-.711-.092-1.431a4.5 4.5 0 0 0-.352-1.322 2.3 2.3 0 0 0-.786-.98q-.51-.368-1.364-.368-.475 0-.911-.008a50 50 0 0 0-.954-.009v8.228q.528-.008.954 0h.911q.855 0 1.364-.368c.345-.25.617-.588.787-.98a4.6 4.6 0 0 0 .35-1.33q.093-.729.093-1.432m10.184 1.566q0 1.305-.418 2.293-.419.987-1.247 1.54-.827.544-2.049.544-1.22 0-2.05-.553-.82-.552-1.237-1.54-.418-.987-.418-2.284 0-1.306.418-2.286.427-.987 1.246-1.54.829-.552 2.041-.552 1.23 0 2.058.56.828.553 1.238 1.54.418.98.418 2.278m-5.278 0q0 .744.126 1.389.125.636.468 1.029.343.385.978.385.645 0 .98-.385.334-.394.46-1.03.132-.644.133-1.388 0-.738-.134-1.382-.126-.644-.46-1.037-.334-.394-.979-.394-.635 0-.978.393-.344.395-.468 1.038-.126.645-.126 1.382m10.732-.754a4.4 4.4 0 0 0-.084-1.046q-.091-.47-.376-.736-.276-.269-.82-.268-.711 0-1.07.702-.352.695-.352 2.143 0 1.431.443 2.06.453.618 1.28.618.536 0 1.029-.242.485-.233.92-.553.269.16.51.52.251.36.318.686a4.1 4.1 0 0 1-1.38.904 4.4 4.4 0 0 1-1.723.343q-.904-.001-1.573-.326a3 3 0 0 1-1.095-.913 4.2 4.2 0 0 1-.653-1.381 6.7 6.7 0 0 1-.209-1.716q0-1.581.527-2.553.527-.97 1.347-1.414a3.55 3.55 0 0 1 1.723-.452q.745 0 1.322.218.585.217.986.585.403.37.603.845.209.47.209.98 0 .519-.268.804-.267.276-.77.276-.25 0-.451-.017a5 5 0 0 1-.393-.066m2.37 4.31q.016-.35.2-.77.184-.426.435-.661.536.286 1.13.502c.386.143.793.216 1.204.218q.603 0 .937-.243.343-.242.351-.62a.8.8 0 0 0-.234-.56q-.226-.251-.703-.426l-.953-.352a5 5 0 0 1-1.063-.527 2.7 2.7 0 0 1-.77-.787q-.284-.47-.284-1.122 0-.795.394-1.372.393-.586 1.087-.896.694-.318 1.598-.318.72 0 1.53.193.812.192 1.33.451.018.37-.15.82-.168.452-.435.662a9 9 0 0 0-1.07-.394 4 4 0 0 0-1.205-.184q-.46 0-.736.226a.7.7 0 0 0-.268.569q0 .302.218.503.217.192.668.36l1.03.384q.945.336 1.555.955.612.62.611 1.623 0 1.207-.929 1.9-.92.687-2.484.687a5.6 5.6 0 0 1-1.665-.243 6.2 6.2 0 0 1-1.33-.578"></path>
        <path
          fillRule="evenodd"
          d="M61.488 14.217q.024.766.196 1.381.21.72.686 1.13.476.402 1.305.402a4 4 0 0 0 1.28-.2 7 7 0 0 0 1.162-.52q.167.15.285.393.124.236.15.427a5.4 5.4 0 0 1-1.38.67 5.1 5.1 0 0 1-1.648.268q-.928 0-1.564-.343a2.75 2.75 0 0 1-1.004-.955 4.3 4.3 0 0 1-.544-1.38 7.8 7.8 0 0 1-.167-1.642q0-1.237.393-2.2.394-.971 1.138-1.524.744-.56 1.798-.56 1.071 0 1.782.485c.476.319.848.77 1.07 1.297q.36.812.36 1.8 0 .301-.017.536-.01.269-.05.536zm3.91-2.444q.2.594.2 1.306v.234h-4.11q.048-1.213.53-1.984.544-.861 1.556-.862.728 0 1.171.36.453.352.653.946"
          clipRule="evenodd"
        ></path>
        <path d="M38.712 9.923q-.109-.21-.51-.209h-.435l-.1.117v8.136q.225.05.585.05.342 0 .569-.05v-5.96q.146-.195.317-.367.46-.469.97-.72.52-.251.97-.251.644 0 .896.452.26.45.26 1.473v5.373q.225.05.585.05.343 0 .568-.05v-5.775q.001-.1-.004-.198.163-.215.348-.396.468-.46.978-.695t.954-.234q.644 0 .895.444.26.443.26 1.464v4.72q0 .386.133.578.142.193.468.193.201 0 .402-.076a.95.95 0 0 0 .334-.175 2.5 2.5 0 0 1-.15-.636 9 9 0 0 1-.034-.77v-4.219a3.6 3.6 0 0 0-.225-1.289 2.04 2.04 0 0 0-.678-.937q-.46-.352-1.187-.352-.536 0-1.047.193a4 4 0 0 0-.986.527 6 6 0 0 0-.682.558 2 2 0 0 0-.682-.926q-.46-.352-1.187-.352-.536 0-1.071.218a3.6 3.6 0 0 0-1.405 1.001v-.315q0-.393-.11-.595"></path>
        <path
          fillRule="evenodd"
          d="M50.574 9.923q-.11-.21-.51-.209h-.419l-.1.1v11.651l.1.101h.418q.402 0 .51-.21.11-.209.11-.593V17.38q.357.23.735.411c.446.206.931.312 1.422.31q.72 0 1.439-.444.72-.452 1.196-1.406.477-.954.477-2.486 0-1.246-.318-2.193-.318-.945-.945-1.473-.62-.536-1.53-.536-.762 0-1.38.31a3.6 3.6 0 0 0-1.097.843v-.198q0-.393-.108-.595m.108 2.025v4.337q.297.2.645.41.652.385 1.413.385.51 0 .979-.335.468-.343.76-1.072.302-.728.302-1.908 0-1.139-.26-1.833-.258-.704-.685-1.021a1.43 1.43 0 0 0-.895-.327q-.519 0-1.054.268a3.1 3.1 0 0 0-.954.762 3 3 0 0 0-.25.334M4.608 3.184c0-.513.413-.929.923-.929h9.638A2.41 2.41 0 0 1 17.57 4.67v14.86a2.41 2.41 0 0 1-2.4 2.415H3.35a.926.926 0 0 1-.925-.93c0-.512.413-.928.924-.928h11.82c.306 0 .554-.25.554-.558V4.671a.555.555 0 0 0-.554-.558H5.531a.926.926 0 0 1-.923-.928z"
          clipRule="evenodd"
        ></path>
        <path
          fillRule="evenodd"
          d="M7.596 7.642c0-.513.414-.93.924-.93h4.802c.51 0 .923.417.923.93a.926.926 0 0 1-.923.929H8.52a.927.927 0 0 1-.924-.93zM3.533 12.1c0-.513.413-.929.924-.929h8.865c.51 0 .923.416.923.929a.926.926 0 0 1-.923.928H4.457a.926.926 0 0 1-.924-.928m2.217 4.457c0-.512.413-.928.923-.928h6.65c.51 0 .922.416.922.929a.926.926 0 0 1-.923.928h-6.65a.926.926 0 0 1-.922-.929"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    HubSpot: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="84"
        height="26"
        fill="currentColor"
      >
        <path d="M10.345 5.1v6.441H4.428v-6.44H1.62v15.375h2.808v-6.232h5.916v6.232h2.81V5.1zm11.797 10.406a2.323 2.323 0 1 1-4.648 0V8.92H14.83v6.586a4.983 4.983 0 0 0 9.966 0V8.92h-2.654zM41.88 9.6c0-1.35.893-1.779 1.87-1.779.79 0 1.83.6 2.513 1.329l1.744-2.057C47.136 5.914 45.37 5.1 43.923 5.1c-2.89 0-4.98 1.693-4.98 4.499 0 5.206 6.363 3.553 6.363 6.467 0 .899-.873 1.692-1.871 1.692-1.576 0-2.087-.77-2.81-1.584l-1.937 2.013c1.24 1.52 2.767 2.292 4.596 2.292 2.746 0 4.955-1.713 4.955-4.391 0-5.78-6.364-3.984-6.364-6.49m39.368 8.422c-1.574 0-2.022-.681-2.022-1.724v-4.617h2.448v-2.34H79.22V6.254l-2.7 1.212v9.405c0 2.405 1.66 3.617 3.935 3.617q.537.01 1.065-.085l.66-2.426c-.298.02-.64.041-.938.041m-48.961-9.02c-1.32 0-2.24.383-3.132 1.256v-5.06h-2.667v9.38c0 3.511 2.538 5.917 5.391 5.917 3.165 0 5.949-2.448 5.949-5.745 0-3.256-2.562-5.746-5.541-5.746m-.017 8.806a3.028 3.028 0 1 1 0-6.056 3.028 3.028 0 0 1 0 6.056m28.988-3.2c0-3.303-2.778-5.746-5.949-5.746-2.852 0-5.391 2.406-5.391 5.918v9.386h2.667v-5.068c.89.872 1.812 1.256 3.13 1.256 2.98 0 5.543-2.49 5.543-5.746m-2.526-.034a3.027 3.027 0 1 1-6.055 0 3.027 3.027 0 0 1 6.055 0"></path>
        <path d="M69.873 8.73V6.05a2.06 2.06 0 0 0 1.19-1.86v-.062c0-1.14-.924-2.065-2.064-2.065h-.062a2.064 2.064 0 0 0-2.064 2.065v.061a2.06 2.06 0 0 0 1.19 1.86V8.73a5.85 5.85 0 0 0-2.78 1.224l-7.35-5.726q.079-.286.082-.58a2.324 2.324 0 1 0-2.328 2.322 2.3 2.3 0 0 0 1.145-.312l7.239 5.633a5.86 5.86 0 0 0 .09 6.605l-2.202 2.202a1.9 1.9 0 0 0-.55-.09 1.91 1.91 0 1 0 1.91 1.912 1.9 1.9 0 0 0-.089-.55l2.178-2.18a5.873 5.873 0 1 0 4.465-10.46m-.903 8.816a3.013 3.013 0 1 1 0-6.024 3.014 3.014 0 0 1 .003 6.023"></path>
      </svg>
    ),
    Staflo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="94"
        height="27"
        fill="currentColor"
      >
        <path d="M16.878 18.118c-.18-.143-.25-.25-.09-.537l.645-1.11a.413.413 0 0 1 .608-.124c.735.555 1.54 1.11 2.703 1.11.93 0 1.628-.609 1.628-1.378 0-.912-.769-1.54-2.273-2.148-1.68-.682-3.365-1.754-3.365-3.866 0-1.594 1.18-3.436 4.027-3.436 1.825 0 3.222.932 3.58 1.2.18.107.233.41.106.591l-.681 1.02c-.144.213-.411.357-.625.213-.769-.484-1.504-.985-2.487-.985s-1.574.571-1.574 1.253c0 .842.662 1.414 2.112 2.005 1.738.698 3.74 1.735 3.74 4.044 0 1.844-1.594 3.542-4.117 3.542-2.256 0-3.419-.949-3.937-1.396M30.068 8.955h-2.737a.34.34 0 0 1-.34-.34V7.146c0-.18.143-.34.34-.34h7.82c.197 0 .34.16.34.34v1.467a.34.34 0 0 1-.34.341h-2.737v10.039c0 .18-.16.34-.34.34h-1.665c-.18 0-.34-.16-.34-.34zM36.1 18.87l5.567-12.044c.054-.107.144-.197.304-.197h.178c.18 0 .25.09.304.197l5.514 12.044c.107.234-.037.465-.304.465h-1.558c-.267 0-.394-.107-.518-.358l-.876-1.932h-5.35l-.876 1.932a.54.54 0 0 1-.518.358H36.41c-.268 0-.411-.234-.304-.465m7.727-3.813-1.788-3.936h-.054l-1.754 3.936zM51.653 8.955h-2.737a.34.34 0 0 1-.341-.34V7.146c0-.18.143-.34.34-.34h7.82c.198 0 .341.16.341.34v1.467a.34.34 0 0 1-.34.341h-2.738v10.039c0 .18-.16.34-.34.34h-1.665c-.18 0-.34-.16-.34-.34zM59.96 7.147c0-.177.144-.34.34-.34h7.286c.197 0 .34.16.34.34v1.467c0 .178-.143.341-.34.341h-5.297v3.365h4.421c.18 0 .34.16.34.34v1.468c0 .18-.16.34-.34.34h-4.421v4.529c0 .177-.16.34-.34.34H60.3a.34.34 0 0 1-.341-.34zM70.824 7.147c0-.177.144-.34.34-.34h1.648c.178 0 .34.16.34.34v10.04h4.566c.197 0 .34.16.34.34v1.467c0 .177-.143.34-.34.34h-6.55a.34.34 0 0 1-.341-.34V7.147zM86.126 6.626c3.58 0 6.443 2.88 6.443 6.46s-2.864 6.426-6.443 6.426a6.39 6.39 0 0 1-6.426-6.426c0-3.58 2.844-6.46 6.426-6.46m0 10.56c2.256 0 4.117-1.844 4.117-4.097s-1.861-4.134-4.117-4.134c-2.255 0-4.097 1.878-4.097 4.134a4.11 4.11 0 0 0 4.097 4.097"></path>
        <path
          fillOpacity="0.3"
          d="M5.715 1.473 1.773 5.415l3.942 3.942 3.942-3.942z"
        ></path>
        <path fillOpacity="0.6" d="m1.774 13.3 3.942-3.942-3.942-3.943z"></path>
        <path d="M5.716 9.359 1.774 13.3l3.942 3.942L9.658 13.3z"></path>
        <path fillOpacity="0.6" d="m5.716 17.242 3.943 3.943V13.3z"></path>
        <path
          fillOpacity="0.3"
          d="m5.717 17.244-3.942 3.942 3.942 3.942 3.942-3.942z"
        ></path>
      </svg>
    ),
    Coframe: (
      <div className="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="106"
          height="28"
          fill="currentColor"
        >
          <path d="M104.266 16.2H97.27c.14 1.621 1.233 2.414 2.396 2.414.758 0 1.498-.264 1.992-1.092h2.502c-.511 1.41-1.885 2.978-4.476 2.978-3.049 0-4.828-2.273-4.828-5.005 0-2.82 1.956-4.916 4.758-4.916 2.925 0 4.74 2.273 4.652 5.621m-4.67-3.842c-.916 0-2.097.564-2.29 2.168h4.493c-.053-1.604-1.181-2.168-2.203-2.168M90.999 20.271v-5.516c0-1.04-.089-2.22-1.516-2.22-1.621 0-1.886 1.357-1.886 2.802v4.934h-2.431v-5.516c0-1.04-.088-2.22-1.516-2.22-1.621 0-1.886 1.357-1.886 2.802v4.934h-2.431v-9.48h2.431v1.25c.547-.934 1.498-1.462 2.644-1.462 1.603 0 2.326.863 2.696 1.55.758-1.057 1.692-1.55 3.12-1.55 2.378 0 3.206 1.48 3.206 3.718v5.974zM74.943 16.642v-.705c-2.731.282-3.806.6-3.806 1.656 0 .688.528 1.252 1.639 1.252 1.533 0 2.167-.81 2.167-2.203m.212 2.45c-.687.986-1.674 1.41-3.102 1.41-1.815 0-3.418-1.058-3.418-2.785 0-2.238 2.502-2.908 6.238-3.33v-.16c0-1.462-.793-1.973-1.78-1.973-.934 0-1.71.476-1.762 1.533h-2.273c.193-1.868 1.709-3.242 4.158-3.242 2.238 0 4.089.987 4.089 4.176 0 .282-.036 1.569-.036 2.414 0 1.498.088 2.344.282 3.137h-2.238c-.07-.3-.105-.705-.158-1.18M68.12 10.843v2.291c-.352-.053-.652-.053-1.004-.053-1.198 0-1.991.441-1.991 2.22v4.97h-2.432v-9.48h2.396v1.656c.547-1.18 1.393-1.639 2.503-1.639.158 0 .37.018.529.035M57.119 10.79v-.528c0-2.397 1.127-2.767 3.507-2.767h.828v1.798h-.476c-1.198 0-1.427.14-1.427 1.04v.458h1.903v1.674H59.55v7.806h-2.432v-7.806h-1.34V10.79zM50.326 12.482c-1.34 0-2.291 1.075-2.291 3.066 0 1.992.952 3.049 2.29 3.049 1.34 0 2.292-1.058 2.292-3.049s-.952-3.066-2.291-3.066m0 8.018c-2.397 0-4.758-1.639-4.758-4.952 0-3.33 2.361-4.97 4.758-4.97s4.758 1.64 4.758 4.97c0 3.313-2.361 4.952-4.758 4.952M42.003 16.078H44.4c-.335 2.59-2.485 4.423-5.533 4.423-3.807 0-5.974-2.59-5.974-6.68 0-4.035 2.326-6.555 6.044-6.555 2.996 0 5.04 1.71 5.463 4.37h-2.397c-.475-1.78-1.674-2.36-3.083-2.36-1.921 0-3.42 1.585-3.42 4.546 0 3.048 1.499 4.67 3.331 4.67 1.516 0 2.75-.67 3.172-2.415"></path>
          <path
            fillOpacity="0.4"
            d="M12.158 3.346 3.739 8.957c-1.162.775-2.104 2.535-2.104 3.932v7.387c0 1.396.942 1.9 2.104 1.126l8.419-5.611c1.162-.775 2.104-2.535 2.104-3.932V4.472c0-1.396-.942-1.9-2.104-1.126"
          ></path>
          <path d="m21.01 6.797-8.418 5.612c-1.162.774-2.104 2.534-2.104 3.931v7.387c0 1.397.942 1.901 2.104 1.127l8.419-5.612c1.162-.774 2.104-2.535 2.104-3.931V7.924c0-1.397-.942-1.901-2.104-1.127"></path>
        </svg>
      </div>
    ),
    JusBrail: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="103"
        height="21"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M56.743 14.98q.01 1.92 2.893 1.92a4 4 0 0 0 1.101-.139q.491-.139 1.02-.543.53-.405.823-1.334.293-.93.293-2.305 0-2.124-.811-3.084-.813-.96-2.628-.96a7.1 7.1 0 0 0-2.691.545v5.902zm-1.585-.09V3.061h1.584V7.49a8.4 8.4 0 0 1 2.692-.445q.75 0 1.408.128.658.129 1.338.504c.449.245.846.573 1.173.965q.493.588.796 1.603.307 1.012.306 2.331 0 1.443-.337 2.525-.338 1.083-.83 1.682c-.328.398-.73.729-1.184.973q-.69.373-1.275.48-.584.107-1.194.108-1.19 0-2.067-.295-.879-.296-1.318-.678a3.1 3.1 0 0 1-.713-.92q-.273-.535-.326-.883a4.4 4.4 0 0 1-.054-.68zm-30.96 1.046q1.251.877 2.696.877c.963 0 1.706-.243 2.144-.733q.659-.735.658-2.401V3.557h1.584v10.25q0 1.337-.374 2.284-.375.946-1.022 1.407a4.3 4.3 0 0 1-1.327.652q-.68.194-1.46.194a5.74 5.74 0 0 1-2.9-.76zM34.44 13.57V7.238h1.584v6.404q0 1.665.726 2.44.727.774 2.275.774c1.032 0 1.772-.258 2.263-.774q.737-.775.737-2.44V7.238h1.582v6.333q0 2.278-1.197 3.526t-3.387 1.247q-2.189 0-3.387-1.247-1.197-1.245-1.197-3.526zm12.322-5.6q-.957.927-.956 2.236 0 1.05.603 1.7.605.648 1.472.921.86.271 1.733.504.867.23 1.465.692.599.46.599 1.277.001 1.513-2.494 1.512-1.67 0-3.242-.966v1.671q1.487.825 3.306.824c1.211 0 2.238-.27 2.947-.81q1.065-.807 1.065-2.233 0-1.19-.605-1.958a3.3 3.3 0 0 0-1.472-1.088 19 19 0 0 0-1.733-.551q-.867-.23-1.465-.58-.599-.349-.599-.917 0-1.673 2.471-1.673 1.38 0 2.633.751V7.71q-1.401-.663-2.804-.664-1.97.001-2.925.926zM66.88 8.1v10.07h1.584V9.123a15.7 15.7 0 0 1 3.724-.57V7.066q-2.835 0-5.306 1.035zm7.765 6.713q0 2.043 2.97 2.043h.032q2.904 0 2.905-1.98V12.78q-.728-.128-1.944-.128-3.962 0-3.962 2.16zm-1.584 0q0-.738.272-1.321.273-.586.669-.948.395-.364 1.006-.62a8 8 0 0 1 1.08-.379q.47-.121 1.118-.184.647-.063.92-.074.323-.012.648-.011l1.755.104q0-1.489-.806-2.124-.807-.635-2.387-.635-1.775 0-3.198.524v-1.53a9.9 9.9 0 0 1 3.282-.567q2.298 0 3.505 1.161 1.209 1.162 1.21 3.396v3.284q0 1.048-.487 1.793a2.83 2.83 0 0 1-1.25 1.076q-.765.33-1.432.459a7 7 0 0 1-1.32.128q-.503.001-1.034-.065a6 6 0 0 1-1.199-.294 4.4 4.4 0 0 1-1.162-.591q-.492-.36-.842-1.03-.346-.67-.348-1.55zm11.913-6.841q-.957.925-.957 2.235 0 1.05.604 1.7.603.648 1.472.921.86.271 1.732.504.867.23 1.466.692.598.46.598 1.277 0 1.513-2.493 1.512-1.669 0-3.242-.966v1.671q1.487.825 3.306.824c1.211 0 2.238-.27 2.947-.81q1.065-.807 1.065-2.233 0-1.19-.605-1.958a3.3 3.3 0 0 0-1.472-1.088 19 19 0 0 0-1.733-.551q-.867-.23-1.465-.58-.6-.349-.599-.917 0-1.673 2.471-1.673 1.38 0 2.633.751V7.71q-1.403-.663-2.804-.664-1.967.001-2.925.926zm8.644 10.2h1.584V7.239h-1.584zm-.085-12.86h1.755V3.557h-1.755zm6.418 12.86h-1.584V3.077h1.584z"
          clipRule="evenodd"
        ></path>
        <path
          fillOpacity="0.8"
          d="m11.162 10.248 3.903 6.735a2.664 2.664 0 0 0 3.632.97 2.643 2.643 0 0 0 .972-3.62L13.51 3.702c.417.78.432 1.75-.044 2.571z"
        ></path>
        <path
          fillOpacity="0.3"
          d="M2.657 14.333a2.644 2.644 0 0 0 .973 3.62l-.002-.002a2.665 2.665 0 0 0 3.634-.97l3.9-6.733L8.86 6.275a2.64 2.64 0 0 1-.015-2.624z"
        ></path>
        <path
          fillOpacity="0.55"
          d="M13.51 3.702c.416.78.431 1.75-.045 2.571l-2.303 3.975L8.86 6.275a2.64 2.64 0 0 1-.015-2.624l.015-.026a2.66 2.66 0 0 1 4.605 0z"
        ></path>
      </svg>
    ),
    McKinsey: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="125"
        height="42"
        fill="currentColor"
      >
        <path d="M14.97 2.3h3.694v.696h-.696q-.182 0-.64.418c-.305.278-.458.496-.458.64v10.608q0 .218.458.64.458.42.64.42h.696v.693h-5.45v-.699h.695q.182 0 .624-.421.44-.42.44-.64V4.385L9.85 16.667 4.733 4.172v10.486q.001.22.437.64c.29.28.502.421.624.421h.692v.693H2.1v-.696h.695q.22 0 .659-.421.438-.42.436-.64V4.053q0-.216-.436-.64-.437-.419-.659-.417H2.1V2.3h4.093l4.243 10.567h.11zm8.776 12.686a3.33 3.33 0 0 0 1.791-.4 3.5 3.5 0 0 0 1.095-1.207h.587a5.3 5.3 0 0 1-1.445 2.375 3.85 3.85 0 0 1-2.686.88 3.72 3.72 0 0 1-3.036-1.392 5.1 5.1 0 0 1-1.133-3.326 4.87 4.87 0 0 1 1.277-3.548 4.13 4.13 0 0 1 3.07-1.316 4.6 4.6 0 0 1 1.828.33c.527.225 1.01.542 1.426.937l-1.332 2.093-.55.034a3.7 3.7 0 0 0-.109-1.872 1.36 1.36 0 0 0-1.463-.823 2.26 2.26 0 0 0-2.012.986 4.63 4.63 0 0 0-.659 2.599 3.9 3.9 0 0 0 .896 2.595 3.07 3.07 0 0 0 2.455 1.055m9.067 1.426H27.29v-.696h.706q.219 0 .658-.421.438-.42.437-.64V4.053q.001-.216-.437-.64c-.293-.28-.521-.417-.658-.417h-.705V2.3h5.522v.696h-.696q-.219 0-.658.418c-.293.278-.437.496-.437.64v5.778L36.067 4.2c.097-.122 0-.352-.256-.693s-.465-.511-.586-.511h-.677V2.3h5.116v.696h-.695c-.344.118-.66.306-.927.552-.49.378-.78.624-.88.715l-3.432 3.69 4.936 6.552c.24.28.516.525.82.73.246.226.54.39.862.478h1.023c.242-.05.462-.178.624-.365q.402-.369.403-.624V8.955q0-.22-.403-.587a1.13 1.13 0 0 0-.624-.365h-.552v-.695h3.254v7.422q0 .256.421.624c.162.177.37.304.602.365h1.136c.122 0 .312-.121.584-.365q.404-.365.402-.624V8.955q0-.22-.403-.587-.401-.365-.583-.365h-.587v-.695h2.89l.365 1.856a16 16 0 0 1 1.59-1.463 3.12 3.12 0 0 1 1.991-.624 2.5 2.5 0 0 1 1.813.733 2.54 2.54 0 0 1 .749 1.9v5.02q0 .256.402.624c.269.247.462.365.584.365h.586v.693h-4.789v-.696h.506a1.14 1.14 0 0 0 .624-.365c.268-.247.402-.452.402-.624V9.832a1.7 1.7 0 0 0-.368-1.133 1.34 1.34 0 0 0-1.095-.44 3.43 3.43 0 0 0-1.994.715q-1.002.711-1.001 1.188v4.568q0 .256.402.624c.163.187.382.315.624.365h.512v.693H37.356l-4.908-7.055-1.426 1.536v3.765q-.001.22.437.64.44.42.658.421h.696zm4.898 15.912-.043-.044q.698.585 1.41 1.17.712.584 1.516 1.136h.84v.73h-1.536c-.625.01-1.245-.1-1.828-.328a5.9 5.9 0 0 1-1.682-1.135 5.45 5.45 0 0 1-1.956 1.263 7.6 7.6 0 0 1-2.649.418 4.74 4.74 0 0 1-3.12-1.151 3.75 3.75 0 0 1-1.391-3.017 4.9 4.9 0 0 1 .624-2.45 5.3 5.3 0 0 1 1.66-1.79 6.6 6.6 0 0 1-.824-1.354 3.9 3.9 0 0 1-.312-1.607 2.96 2.96 0 0 1 .911-2.321 3.58 3.58 0 0 1 2.493-.824 4.5 4.5 0 0 1 1.538.218c.325.134.672.21 1.023.222q.204.004.403-.038a.44.44 0 0 0 .256-.218h.624v3.326h-.624a3.02 3.02 0 0 0-.936-1.79 2.97 2.97 0 0 0-2.322-1.062 2.8 2.8 0 0 0-1.794.53 1.8 1.8 0 0 0-.658 1.48c-.004.55.191 1.083.55 1.5.393.46.896.811 1.462 1.024q1.352 1.466 2.924 2.942a205 205 0 0 0 2.998 2.761c.26-.417.452-.873.568-1.35.114-.513.17-1.036.166-1.56a2 2 0 0 0-.606-1.52 2.27 2.27 0 0 0-1.625-.565v-.708h5.017v.658h-.546q-.184-.002-.715.624a1.83 1.83 0 0 0-.53.914v.038a7.5 7.5 0 0 1-.365 2.065 6.5 6.5 0 0 1-.92 1.807zm-4.789 2.121a5.3 5.3 0 0 0 1.7-.255 5.4 5.4 0 0 0 1.37-.69l-.109-.072a104 104 0 0 1-3.07-2.851 52 52 0 0 1-2.927-3.074 4.4 4.4 0 0 0-.839 1.248 4.3 4.3 0 0 0-.293 1.754 3.65 3.65 0 0 0 1.335 2.724 4.14 4.14 0 0 0 2.833 1.207zM43.012 5.08a1.16 1.16 0 0 1-.82-.33 1.06 1.06 0 0 1-.35-.806V3.91a1.09 1.09 0 0 1 .35-.861 1.345 1.345 0 0 1 1.716 0 1.09 1.09 0 0 1 .35.861h-.038c.025 0 .037 0 .037.034a1.06 1.06 0 0 1-.35.805c-.207.21-.49.33-.786.331zm9.32 29.284c1.003.058 2-.197 2.851-.73a5.6 5.6 0 0 0 1.716-2.121h.737a6.24 6.24 0 0 1-2.16 2.98 5.8 5.8 0 0 1-3.544 1.079 6.03 6.03 0 0 1-4.864-2.184 7.83 7.83 0 0 1-1.828-5.21 8 8 0 0 1 1.681-5.12 5.62 5.62 0 0 1 4.643-2.12c.66-.014 1.318.092 1.94.313a4.5 4.5 0 0 0 1.645.312c.175.009.35-.023.512-.094q.205-.106.365-.271h.511v4.976h-.624a5.24 5.24 0 0 0-1.132-2.742 3.61 3.61 0 0 0-3.145-1.644 3.86 3.86 0 0 0-2.89 1.08A5.4 5.4 0 0 0 47.5 26.32v-.072q-.038.402-.056.805c0 .268-.02.546-.02.84 0 .34 0 .689.038 1.042.038.352.05.677.072.97a5.17 5.17 0 0 0 1.426 3.16 4.43 4.43 0 0 0 3.373 1.298m11.544-20.51a2.6 2.6 0 0 1-.824 2.046 3.04 3.04 0 0 1-2.103.733 3.5 3.5 0 0 1-1.463-.274 2.7 2.7 0 0 0-1.17-.275.65.65 0 0 0-.4.09l-.293.238H57.2v-3.217h.549a2.96 2.96 0 0 0 .858 1.647 2.93 2.93 0 0 0 2.359 1.024c.457.024.912-.078 1.316-.293a1.03 1.03 0 0 0 .474-.937 1.2 1.2 0 0 0-.564-1.113 10 10 0 0 0-1.152-.606c-.343-.143-.651-.277-.936-.399a46 46 0 0 0-.97-.402 4.8 4.8 0 0 1-1.388-.97 2.1 2.1 0 0 1-.55-1.517 2.36 2.36 0 0 1 .734-1.872 3.47 3.47 0 0 1 3.27-.403c.313.156.658.238 1.007.24a.8.8 0 0 0 .312-.055.4.4 0 0 0 .203-.203h.475v2.808h-.55a2.66 2.66 0 0 0-.748-1.464 2.5 2.5 0 0 0-2.029-.914 1.8 1.8 0 0 0-1.188.331 1.05 1.05 0 0 0-.384.84 1.01 1.01 0 0 0 .403.876q.519.36 1.095.624.513.216.97.4l1.005.402c.524.22 1.006.53 1.425.914a2.18 2.18 0 0 1 .696 1.691zm2.393 13.381a4.57 4.57 0 0 1 1.372 3.51 4.63 4.63 0 0 1-1.372 3.529 4.47 4.47 0 0 1-3.16 1.298 4.51 4.51 0 0 1-3.202-1.298 4.63 4.63 0 0 1-1.37-3.529 4.534 4.534 0 0 1 4.571-4.79 4.5 4.5 0 0 1 3.176 1.28zm-.44 5.017v.072q.036-.403.053-.805t.018-.805c0-.268 0-.527-.018-.783-.019-.256-.028-.496-.053-.715a3.03 3.03 0 0 0-.786-1.79 2.56 2.56 0 0 0-1.92-.659 2.5 2.5 0 0 0-1.871.658 3 3 0 0 0-.787 1.754v-.047q-.072.38-.09.768c0 .268-.019.536-.019.801 0 .266 0 .53.019.787q.016.36.09.714c.073.652.348 1.266.787 1.754a2.43 2.43 0 0 0 1.872.695 2.5 2.5 0 0 0 1.937-.677 3.1 3.1 0 0 0 .768-1.722m2.998-15.6a3.78 3.78 0 0 1-3.017-1.407 5.03 5.03 0 0 1-1.189-3.348 5.05 5.05 0 0 1 1.208-3.432 3.7 3.7 0 0 1 2.998-1.354 3.1 3.1 0 0 1 2.393.936c.573.613.905 1.412.936 2.25l.037.658-6.071.487a3.9 3.9 0 0 0 .874 2.402 2.86 2.86 0 0 0 2.411 1.151 3.43 3.43 0 0 0 1.81-.399 3.23 3.23 0 0 0 1.08-1.173h.549a4.94 4.94 0 0 1-1.392 2.359 3.77 3.77 0 0 1-2.627.851zm-.037-8.848a2.29 2.29 0 0 0-2.066.967 3.9 3.9 0 0 0-.677 2.031l4.57-.39a3.86 3.86 0 0 0-.202-1.813q-.3-.81-1.625-.814zM79.83 34.636q.22 0 .602-.384.384-.384.384-.602v-4.992a1.64 1.64 0 0 0-.346-1.08 1.36 1.36 0 0 0-1.114-.42 3 3 0 0 0-1.775.657q-.896.661-.896 1.099v4.751q0 .22.384.603.385.383.568.383h.55v.696h-4.68v-.696h.51q.22 0 .603-.383.384-.383.384-.603v-4.992c.02-.404-.11-.802-.365-1.117a1.37 1.37 0 0 0-1.099-.42 2.96 2.96 0 0 0-1.81.695q-.895.693-.895 1.17v4.68q0 .22.384.602.385.384.605.384h.512v.696h-4.68v-.696h.55c.12 0 .311-.128.564-.384s.384-.455.384-.602v-5.825q0-.217-.384-.584-.383-.364-.565-.364h-.549v-.696h2.808l.365 1.756a21 21 0 0 1 1.463-1.41c.535-.409 1.2-.61 1.872-.565a2.7 2.7 0 0 1 1.607.493 2.06 2.06 0 0 1 .843 1.445 22 22 0 0 1 1.535-1.354 2.87 2.87 0 0 1 1.828-.55 2.54 2.54 0 0 1 1.79.678 2.5 2.5 0 0 1 .734 1.922v4.992q0 .219.384.602.383.384.565.384H84v.695h-4.68v-.695zM73.725 9.052a2.5 2.5 0 0 0-.567-.624q-.466-.403-.624-.403h-.403v-.717h4.936v.695h-.583q-.184 0-.475.365c-.163.17-.266.39-.293.624l2.184 4.496 2.012-4.461a.9.9 0 0 0-.274-.659q-.312-.365-.496-.365h-.602v-.695h3.694v.695h-.403q-.183 0-.568.384c-.2.183-.367.4-.493.64l-3.12 6.617-2.683 5.158-.795-.406 2.776-5.01zM90.29 25.98a3.1 3.1 0 0 1 2.63 1.279c.668.99.996 2.17.936 3.363a5.6 5.6 0 0 1-1.061 3.51 3.26 3.26 0 0 1-2.705 1.392 3.5 3.5 0 0 1-1.919-.459 3.8 3.8 0 0 1-1.226-1.37v4.387q0 .256.402.624c.269.247.465.365.587.365h.59v.668h-4.818v-.696h.587c.236-.05.449-.178.602-.365a.98.98 0 0 0 .384-.624V27.856q0-.217-.384-.584a1.06 1.06 0 0 0-.602-.364h-.587v-.734h2.961l.293 1.904a4.5 4.5 0 0 1 1.408-1.61 3.45 3.45 0 0 1 1.922-.512zm1.828 6.177.072-.73a7 7 0 0 0 .037-.73q0-.32-.037-.64-.038-.31-.072-.605a3.1 3.1 0 0 0-.733-1.734 2.02 2.02 0 0 0-1.56-.624 2.44 2.44 0 0 0-1.829.711 4.4 4.4 0 0 0-1.023 1.772v2.378a2.5 2.5 0 0 0 .767 1.828 2.54 2.54 0 0 0 1.873.767h.037a2.18 2.18 0 0 0 1.753-.677 3.3 3.3 0 0 0 .715-1.775zm20.657 1.501q0 .22.403.602.402.384.583.384h.549v.696h-4.789v-.696h.531c.124 0 .312-.128.586-.384.275-.256.403-.455.403-.602V28.7c.012-.4-.11-.793-.347-1.115a1.28 1.28 0 0 0-1.079-.458 3.4 3.4 0 0 0-1.994.73q-1.008.735-1.004 1.17v4.608q0 .256.402.624c.163.187.382.315.624.365h.537v.696h-7.763l-.256-1.9q-.577.759-1.279 1.407a2.5 2.5 0 0 1-1.757.677 2.25 2.25 0 0 1-1.644-.696 2.42 2.42 0 0 1-.695-1.79 2.06 2.06 0 0 1 1.004-1.957 7.4 7.4 0 0 1 1.956-.786l2.378-.477.037-1.096a2.18 2.18 0 0 0-.511-1.516 2.29 2.29 0 0 0-1.757-.568 1.68 1.68 0 0 0-1.591.73 2.09 2.09 0 0 0 .093 1.904h-.658l-1.248-1.829a5.11 5.11 0 0 1 3.803-1.463c.896-.03 1.778.22 2.524.715a2.36 2.36 0 0 1 1.024 2.065v4.898q0 .22.402.584.402.366.584.368h1.098c.243-.05.462-.18.624-.368q.402-.365.402-.584v-5.781q0-.217-.402-.584a1.14 1.14 0 0 0-.624-.364h-.549v-.734h2.889l.365 1.904q.734-.782 1.56-1.464a3.1 3.1 0 0 1 2.009-.624 2.5 2.5 0 0 1 1.81.73 2.54 2.54 0 0 1 .752 1.904zm-12.614-3.241-2.184.549a2.03 2.03 0 0 0-1.207.674 1.87 1.87 0 0 0-.33 1.117v.034a1.4 1.4 0 0 0 .401 1.008 1.31 1.31 0 0 0 .99.418h.053c.49-.02.956-.214 1.316-.546.371-.297.688-.656.936-1.061zm23.254-4.206v.695h-.44q-.146 0-.531.384a4.6 4.6 0 0 0-.53.602l-3.07 6.655-2.743 5.12-.767-.402 2.742-5.01-3.216-6.325a2.6 2.6 0 0 0-.568-.624c-.312-.268-.506-.403-.602-.403h-.44v-.692h4.935v.695h-.549q-.183 0-.493.366a1.07 1.07 0 0 0-.312.624l2.184 4.499 2.022-4.512a.85.85 0 0 0-.274-.624q-.31-.365-.493-.365h-.584v-.683z"></path>
      </svg>
    ),
    CrushLovely: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="114"
        height="20"
        fill="currentColor"
      >
        <path d="M18.994 1.188H1.8a.07.07 0 0 0-.053.022.07.07 0 0 0-.021.053v17.195c0 .02.007.04.021.052a.07.07 0 0 0 .053.022h9.106a.07.07 0 0 0 .042-.012.07.07 0 0 0 .027-.035.07.07 0 0 0 .004-.044.1.1 0 0 0-.02-.038l-8.302-8.301a.07.07 0 0 1-.022-.053q0-.03.022-.053l7.848-7.849a.07.07 0 0 1 .052-.022q.031 0 .053.022l8.329 8.33q.015.018.038.02c.015.004.029 0 .044-.003a.1.1 0 0 0 .034-.027.07.07 0 0 0 .013-.042V1.263a.07.07 0 0 0-.022-.053.07.07 0 0 0-.053-.022zM38.925 9.283a.07.07 0 0 0-.044-.004.1.1 0 0 0-.038.02l-8.302 8.302s-.014.012-.023.016a.1.1 0 0 1-.03.005.1.1 0 0 1-.028-.005.1.1 0 0 1-.024-.017L22.59 9.752a.07.07 0 0 1-.022-.052q0-.031.022-.053l8.327-8.329a.07.07 0 0 0 .02-.038q.003-.021-.004-.044a.07.07 0 0 0-.07-.047h-9.158a.07.07 0 0 0-.053.022.07.07 0 0 0-.021.053v17.195c0 .02.007.04.021.052a.07.07 0 0 0 .053.022h17.193a.07.07 0 0 0 .053-.022.07.07 0 0 0 .022-.052V9.352a.1.1 0 0 0-.013-.042.1.1 0 0 0-.034-.027M49.606 12.198c-1.2 0-1.92-.994-1.92-2.648s.728-2.648 1.92-2.648c.915 0 1.485.57 1.672 1.643l.994-.167c-.187-1.465-1.23-2.42-2.666-2.42-1.77 0-2.933 1.427-2.933 3.592s1.151 3.592 2.933 3.592c1.525 0 2.548-.993 2.686-2.588l-1.014-.147c-.138 1.18-.708 1.79-1.672 1.79M54.172 8.211h-.02V7.78h-.904v5.216h.964V9.964c0-.916.305-1.319.904-1.319.178 0 .335.03.542.09l.187-.965a2.2 2.2 0 0 0-.581-.078c-.492 0-.887.196-1.092.521zM59.868 10.997c0 .757-.463 1.25-1.19 1.25-.79 0-1.172-.404-1.172-1.25V7.779h-.965v3.394c0 1.25.68 1.969 1.851 1.969.61 0 1.172-.236 1.496-.61h.02v.463h.925V7.779h-.965zM64.15 9.884c-.945-.296-1.192-.443-1.192-.758 0-.345.354-.639.875-.639.64 0 1.043.314 1.22.925l.907-.237c-.216-.935-1.033-1.545-2.125-1.545-1.091 0-1.84.668-1.84 1.515 0 .757.483 1.151 1.751 1.534 1.082.334 1.379.532 1.379.896 0 .414-.394.708-1.014.708-.886 0-1.299-.363-1.465-1.24l-.905.196c.158 1.21 1.005 1.9 2.372 1.9 1.18 0 1.989-.65 1.989-1.564 0-.827-.55-1.25-1.949-1.693zM69.392 7.632c-.55 0-1.111.245-1.407.61h-.02v-2.43H67v7.183h.964V9.777c0-.748.492-1.25 1.24-1.25.749 0 1.192.473 1.192 1.25v3.218h.964V9.601c0-1.192-.777-1.969-1.969-1.969M79.845 8.989h-.915v1.276L76.98 8.551c-.38-.33-.584-.643-.584-.944 0-.467.35-.809.906-.809s.866.313.973.887l.935-.146c-.136-.984-.877-1.598-1.928-1.598-1.052 0-1.87.701-1.87 1.646 0 .477.271.955.778 1.47-.828.556-1.186 1.266-1.186 2.008 0 1.236.914 2.097 2.394 2.097 1.08 0 1.744-.481 2.143-1.162l.69.6.574-.68-.963-.855V8.989zm-2.435 3.276c-.915 0-1.45-.529-1.45-1.24 0-.498.182-.985.845-1.413l2.045 1.783c-.223.527-.744.87-1.44.87M85.178 6.106h-1.013v6.889h4.045v-.946h-3.032zM91.153 7.632c-1.496 0-2.49 1.111-2.49 2.755s.994 2.755 2.49 2.755 2.49-1.111 2.49-2.755-1.004-2.755-2.49-2.755m0 4.615c-.945 0-1.525-.72-1.525-1.86s.58-1.86 1.525-1.86 1.525.72 1.525 1.86-.58 1.86-1.525 1.86M96.456 11.694h-.018L94.853 7.78h-1.034l2.196 5.216h.865l2.195-5.216h-1.033zM101.541 7.632c-1.437 0-2.421 1.122-2.421 2.755s.974 2.755 2.43 2.755c.994 0 1.762-.443 2.225-1.31l-.748-.5c-.433.698-.827.955-1.486.955-.867 0-1.417-.709-1.447-1.615h3.808v-.403c0-1.575-.936-2.637-2.361-2.637m-1.428 2.303c.02-.787.631-1.448 1.428-1.448.837 0 1.367.61 1.407 1.448zM105.869 5.81h-.964v7.183h.964zM110.537 7.779l-1.477 3.71h-.019l-1.486-3.71h-1.024l2.027 4.85-1.101 2.58h.993l3.1-7.43z"></path>
      </svg>
    ),
    FifteenFive: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="82"
        height="25"
        fill="currentColor"
      >
        <path d="M12.825 22.405a1.36 1.36 0 0 1-1.364-1.354c0-.742.616-1.354 1.364-1.354.747 0 1.363.611 1.363 1.354 0 .742-.616 1.354-1.364 1.354M5.979 22.763v-.105c0-3.747 3.07-6.795 6.846-6.795h.096v2.707h-.096c-2.27 0-4.11 1.835-4.11 4.08v.096H5.98zM19.987 17.234q-.211-.002-.422-.07a1.363 1.363 0 0 1-.88-1.712 1.36 1.36 0 0 1 1.724-.865c.713.228 1.109.996.88 1.712a1.36 1.36 0 0 1-1.302.935M19.424 22.833a6.76 6.76 0 0 1-3.977-3.38 6.72 6.72 0 0 1-.414-5.18l.027-.096 2.595.838-.026.096c-.704 2.14.484 4.446 2.64 5.145l.096.026-.844 2.577zM17.25 8.866a1.33 1.33 0 0 1-.8-.262 1.3 1.3 0 0 1-.546-.882 1.35 1.35 0 0 1 .247-1.013c.255-.35.668-.56 1.108-.56.29 0 .563.088.801.263.3.21.493.524.546.882.052.358-.027.716-.247 1.013-.255.35-.669.56-1.109.56M18.2 12.998a6.8 6.8 0 0 1-4.012-1.293l-.079-.061L15.71 9.45l.08.062a4.1 4.1 0 0 0 3.062.725 4.1 4.1 0 0 0 2.683-1.634l.062-.078 2.208 1.59-.061.078a6.88 6.88 0 0 1-5.543 2.804M8.39 8.866c-.44 0-.854-.21-1.109-.559a1.4 1.4 0 0 1-.246-1.013c.053-.358.255-.673.545-.882.238-.166.51-.262.801-.262.44 0 .854.21 1.109.559.211.297.299.655.246 1.013a1.33 1.33 0 0 1-.545.882c-.238.175-.51.262-.801.262M9.771 9.565l.08-.061a4.07 4.07 0 0 0 1.645-2.664 4.03 4.03 0 0 0-.73-3.04l-.062-.078 2.209-1.59.061.078a6.74 6.74 0 0 1 1.223 5.058c-.281 1.79-1.258 3.363-2.736 4.437l-.08.061zM5.654 17.234a1.37 1.37 0 0 1-1.303-.935 1.363 1.363 0 0 1 .88-1.712c.141-.043.282-.07.423-.07.59 0 1.117.376 1.302.935a1.363 1.363 0 0 1-.88 1.712c-.14.044-.282.07-.422.07M8.012 15.111a4.08 4.08 0 0 0-2.042-2.375 4.1 4.1 0 0 0-1.865-.446c-.431 0-.862.07-1.276.201l-.088.035-.845-2.585.097-.027a6.8 6.8 0 0 1 2.12-.332c1.083 0 2.121.254 3.098.743a6.78 6.78 0 0 1 3.405 3.957l.027.096-2.596.838zM66.48 13.068c-.237.69-.422 1.52-.537 2.14h-.202a19 19 0 0 0-.537-2.158l-1.619-4.752H60.92v.184l3.476 8.76h2.886l3.475-8.76v-.184H68.09zM77.523 14.16v.235c0 .516-.405 1.206-1.786 1.206-1.347 0-2.095-.751-2.095-2.525h6.344c.053-.419.114-1.056.114-1.52 0-2.008-1.566-3.45-4.32-3.45-3.273 0-4.707 2.044-4.707 4.656 0 2.961 1.584 4.656 4.655 4.656 3.713 0 4.302-1.861 4.302-2.883 0-.087-.017-.218-.035-.332zm-1.725-4.324c1.012 0 1.874.515 1.874 1.52 0 .052 0 .148-.017.236H73.72c.106-1.232.898-1.756 2.077-1.756M50.008 8.299h-1.803v2.078h1.803v6.866h2.649v-6.866h4.373v6.866h2.648V8.299h-7.021v-.472c0-1.153.22-1.765 1.953-1.765h5.068V3.914h-5.332c-3.246 0-4.338 1.04-4.338 4.385M31.945 8.298c-.44.97-1.285 1.477-2.596 1.477h-1.003v2.052h3.088v3.267h-3.088v2.149h8.904v-2.158h-3.088V8.298zM43.982 12.535c-1.197 0-2.191.419-2.684.82h-.15l.238-2.978h5.666V8.298H39.09l-.66 6.9h2.517c.352-.488 1.065-.951 1.97-.951 1.47 0 2.394.768 2.394 2.375 0 1.354-.845 2.359-2.261 2.359-1.654 0-2.209-1.022-2.209-1.992 0-.052 0-.113.018-.218l-2.701.052c-.018.053-.035.201-.035.332 0 2.044 1.53 3.922 5.006 3.922 2.921 0 5.06-1.72 5.06-4.49-.01-2.515-1.576-4.052-4.207-4.052"></path>
      </svg>
    ),
    JerichoSecurity: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="129"
        height="20"
        fill="currentColor"
      >
        <path d="M10.381 8.062a6.715 6.715 0 0 1 6.716-6.716v10.392a6.715 6.715 0 0 1-6.716 6.716zM8.89 12.039v6.415h-.301a6.415 6.415 0 0 1-6.415-6.415zM28.001 15.024c2.034 0 3.438-1.205 3.438-2.93V5.239H29.72v6.83c0 .862-.716 1.464-1.747 1.464-1.06 0-1.791-.548-1.791-1.341V10.85h-1.705v1.354c0 1.656 1.447 2.82 3.524 2.82M36.194 15.024c1.79 0 3.065-.945 3.452-2.505H38c-.258.726-.917 1.136-1.791 1.136-1.29 0-2.12-.862-2.235-2.135h5.702v-.383c-.043-2.354-1.476-3.791-3.625-3.791-2.12 0-3.767 1.478-3.767 3.873 0 2.217 1.59 3.805 3.91 3.805m-2.15-4.64c.259-1.04 1.004-1.67 2.006-1.67.989 0 1.662.63 1.877 1.67zM42.112 14.818v-3.585c0-1.369.93-2.176 2.507-2.176h.286V7.483h-.286c-1.261 0-2.15.52-2.636 1.505l-.2-1.423H40.42v7.253zM46.29 6.593c.63 0 1.088-.465 1.088-1.054 0-.588-.459-1.04-1.089-1.04-.616 0-1.089.452-1.089 1.04s.473 1.054 1.09 1.054m.844 8.225V7.565h-1.69v7.253zM51.809 15.024c2.02 0 3.38-1.177 3.581-3.052h-1.662c-.172 1.04-.888 1.67-1.92 1.67-1.26 0-2.206-.918-2.206-2.505 0-1.478.86-2.409 2.15-2.409 1.074 0 1.819.643 1.976 1.643h1.662c-.143-1.807-1.547-3.025-3.624-3.025-2.206 0-3.883 1.41-3.883 3.79 0 2.19 1.447 3.888 3.926 3.888M57.853 14.818v-4.393c.014-.944.759-1.67 1.905-1.67.902 0 1.461.534 1.461 1.342v4.721h1.69v-4.803c0-1.629-1.06-2.67-2.678-2.67-.989 0-1.863.398-2.378 1V4.554h-1.69v10.264zM67.45 15.024c2.264 0 3.883-1.451 3.883-3.9 0-2.136-1.433-3.778-3.883-3.778-2.22 0-3.896 1.41-3.896 3.777 0 2.245 1.432 3.9 3.896 3.9m0-1.383c-1.246 0-2.177-.93-2.177-2.518 0-1.437.86-2.395 2.177-2.395s2.163.958 2.163 2.395c0 1.45-.802 2.518-2.163 2.518M78.914 15.024c2.292 0 3.739-1.095 3.739-2.833 0-1.807-1.49-2.3-2.908-2.724l-1.519-.452c-.974-.3-1.848-.506-1.848-1.34 0-.74.716-1.178 1.82-1.178 1.504 0 2.335.726 2.406 1.807h1.748c-.13-2.026-1.676-3.271-4.097-3.271-2.22 0-3.582 1.15-3.582 2.723 0 1.875 1.834 2.368 3.008 2.71l1.634.466c.974.287 1.59.588 1.59 1.34 0 .808-.687 1.287-1.991 1.287-1.605 0-2.608-.657-2.765-1.697h-1.762c.129 1.902 1.891 3.162 4.527 3.162M86.94 15.024c1.791 0 3.067-.945 3.453-2.505h-1.647c-.258.726-.917 1.136-1.791 1.136-1.29 0-2.12-.862-2.235-2.135h5.702v-.383c-.043-2.354-1.476-3.791-3.624-3.791-2.121 0-3.768 1.478-3.768 3.873 0 2.217 1.59 3.805 3.91 3.805m-2.148-4.64c.258-1.04 1.003-1.67 2.005-1.67.99 0 1.662.63 1.877 1.67zM94.692 15.024c2.02 0 3.381-1.177 3.581-3.052h-1.661c-.173 1.04-.889 1.67-1.92 1.67-1.26 0-2.207-.918-2.207-2.505 0-1.478.86-2.409 2.15-2.409 1.074 0 1.819.643 1.977 1.643h1.661c-.143-1.807-1.547-3.025-3.624-3.025-2.206 0-3.883 1.41-3.883 3.79 0 2.19 1.447 3.888 3.925 3.888M101.738 15.024c1.061 0 1.963-.48 2.408-1.26l.129 1.054h1.36V7.565h-1.69v4.38c-.015.93-.702 1.655-1.862 1.655-.903 0-1.505-.479-1.505-1.3V7.565h-1.69v4.803c0 1.574 1.046 2.656 2.85 2.656M108.472 14.818v-3.585c0-1.369.932-2.176 2.507-2.176h.287V7.483h-.287c-1.26 0-2.148.52-2.636 1.505l-.2-1.423h-1.361v7.253zM112.65 6.593c.631 0 1.089-.465 1.089-1.054 0-.588-.458-1.04-1.089-1.04-.616 0-1.088.452-1.088 1.04s.472 1.054 1.088 1.054m.845 8.225V7.565h-1.69v7.253zM119 14.818V13.45h-.859c-.63 0-.96-.342-.96-.958V8.933h1.963V7.565h-1.963V5.088h-1.69v2.477h-1.333v1.368h1.333v3.668c0 1.437.888 2.217 2.536 2.217zM121.125 17.555c1.489 0 2.292-.52 2.678-1.491l3.31-8.5h-1.762l-2.135 5.502-2.178-5.501h-1.819l3.008 7.253h.316l-.301.767c-.143.383-.487.602-1.117.602h-1.375v1.368z"></path>
      </svg>
    ),
  };
  return (
    <div className="logo-item opacity-100 hover:opacity-100 transition-opacity">
      {logos[name] || (
        <span className="text-sm font-medium text-[#2D3E2F]">{name}</span>
      )}
    </div>
  );
};

export default HeroSection;
