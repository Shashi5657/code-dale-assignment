"use client"

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import VideoShowcase from './components/VideoShowcase'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F5F3EE]">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with sequence animation and trusted by logos */}
      <HeroSection />

      {/* Video Showcase with Shoji frame */}
      {/* <VideoShowcase /> */}

      {/* Additional spacing for scroll animation */}
      <div className="h-screen bg-[#E8E4DC]" />
    </main>
  )
}
