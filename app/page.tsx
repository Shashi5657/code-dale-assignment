"use client"

import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PageLoader from './components/PageLoader'
import VideoShowcase from './components/VideoShowcase'

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingProgress = (progress: number) => {
    setLoadingProgress(progress)
  }

  const handleLoadingComplete = () => {
    // Trigger loader fade-out
    setIsLoading(false)
    // Show content after a brief delay to allow loader animation to start
    setTimeout(() => {
      setShowContent(true)
    }, 200)
  }

  const handleLoaderComplete = () => {
    // Cleanup - loader will remove itself from DOM
  }

  return (
    <>
      {/* Page Loader - shows during initial load */}
      <PageLoader
        progress={loadingProgress}
        isComplete={!isLoading}
        onComplete={handleLoaderComplete}
      />

      {/* Main Content - hidden during loading, shown after fade-out */}
      <main
        className={`relative min-h-screen bg-[#F5F3EE] ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transition-opacity duration-500`}
        aria-hidden={!showContent}
      >
        {/* Navigation */}
        <Navbar />

        {/* Hero Section with sequence animation and trusted by logos */}
        {/* Start loading images immediately, even if not visible */}
        <HeroSection
          onLoadingProgress={handleLoadingProgress}
          onLoadingComplete={handleLoadingComplete}
        />

        {/* Video Showcase with Shoji frame */}
        {/* <VideoShowcase /> */}

        {/* Additional spacing for scroll animation */}
        <div className="h-screen bg-[#E8E4DC]" />
      </main>
    </>
  )
}
