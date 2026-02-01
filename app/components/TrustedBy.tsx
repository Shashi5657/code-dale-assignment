"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Company logos as SVG components
const DoorDashLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#2D3E2F"/>
      <path d="M7 12h10" stroke="#2D3E2F" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    <span className="text-base font-semibold tracking-tight text-[#2D3E2F]">DOORDASH</span>
  </div>
)

const DaybreakLogo = () => (
  <div className="flex items-center gap-1.5">
    <span className="text-base font-medium text-[#2D3E2F]">Daybreak</span>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3l2 4 4 .5-3 3 .5 4.5L10 13l-3.5 2 .5-4.5-3-3 4-.5 2-4z" fill="#2D3E2F"/>
    </svg>
  </div>
)

const CoframeLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="3" stroke="#2D3E2F" strokeWidth="2" fill="none"/>
    </svg>
    <span className="text-base font-medium text-[#2D3E2F]">Coframe</span>
  </div>
)

const SalesforceLogo = () => (
  <div className="flex items-center gap-1.5">
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
      <ellipse cx="12" cy="9" rx="10" ry="7" fill="#2D3E2F"/>
    </svg>
    <span className="text-base font-medium text-[#2D3E2F]">salesforce</span>
  </div>
)

const DiscordLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <path d="M18.54 1.34A17.79 17.79 0 0014.2.5a.07.07 0 00-.07.03 12.4 12.4 0 00-.55 1.13 16.4 16.4 0 00-4.93 0 11.3 11.3 0 00-.56-1.13.07.07 0 00-.07-.03c-1.55.27-3.05.73-4.44 1.46a.06.06 0 00-.03.02C.77 6.39-.1 11.18.45 15.91a.07.07 0 00.03.05 17.9 17.9 0 005.4 2.73.07.07 0 00.08-.03c.42-.57.79-1.17 1.1-1.8a.07.07 0 00-.04-.1 11.8 11.8 0 01-1.69-.8.07.07 0 01-.01-.11c.11-.09.23-.17.34-.26a.07.07 0 01.07-.01c3.54 1.62 7.38 1.62 10.88 0a.07.07 0 01.07.01c.11.09.23.18.34.27a.07.07 0 01-.01.1c-.54.32-1.1.58-1.69.8a.07.07 0 00-.04.1c.33.62.7 1.22 1.11 1.8a.07.07 0 00.07.02 17.85 17.85 0 005.41-2.73.07.07 0 00.03-.05c.66-6.81-1.1-12.73-4.67-17.98a.06.06 0 00-.03-.02zM7.35 13.13c-1.26 0-2.28-1.15-2.28-2.56 0-1.42 1-2.56 2.28-2.56 1.28 0 2.3 1.15 2.28 2.56 0 1.41-1.01 2.56-2.28 2.56zm8.44 0c-1.26 0-2.29-1.15-2.29-2.56 0-1.42 1.01-2.56 2.29-2.56 1.27 0 2.28 1.15 2.28 2.56 0 1.41-1.01 2.56-2.28 2.56z" fill="#2D3E2F"/>
    </svg>
    <span className="text-base font-bold text-[#2D3E2F]">Discord</span>
  </div>
)

const HubSpotLogo = () => (
  <span className="text-base font-semibold text-[#2D3E2F]">HubSpot</span>
)

const McKinseyLogo = () => (
  <div className="text-center">
    <span className="text-base font-medium text-[#2D3E2F]">McKinsey</span>
    <span className="block text-[10px] tracking-wider text-[#2D3E2F]/80">& Company</span>
  </div>
)

const SymbolicAILogo = () => (
  <span className="text-base font-medium text-[#2D3E2F]">Symbolic.ai</span>
)

const companies = [
  { name: 'Symbolic.ai', Logo: SymbolicAILogo },
  { name: 'Daybreak', Logo: DaybreakLogo },
  { name: 'Discord', Logo: DiscordLogo },
  { name: 'HubSpot', Logo: HubSpotLogo },
  { name: 'McKinsey', Logo: McKinseyLogo },
  { name: 'Coframe', Logo: CoframeLogo },
]

const TrustedBy = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logosRef.current) {
        gsap.from(logosRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Title */}
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#2D3E2F]/40 mb-8">
            TRUSTED BY
          </p>

          {/* Logo Grid */}
          <div
            ref={logosRef}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
          >
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <company.Logo />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
