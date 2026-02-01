import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const filesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (filesRef.current) {
        const files = filesRef.current.querySelectorAll('.file-card')
        
        gsap.from(files, {
          scrollTrigger: {
            trigger: filesRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const files = [
    { icon: '📁', name: 'Customer Service', color: 'from-blue-500 to-cyan-500' },
    { icon: '📝', name: 'AI representative', color: 'from-purple-500 to-pink-500' },
    { icon: '📝', name: 'Test Cases', color: 'from-orange-500 to-red-500' },
    { icon: '📊', name: 'May Production Logs', color: 'from-green-500 to-emerald-500' },
    { icon: '📊', name: 'June Production Logs', color: 'from-teal-500 to-blue-500' },
    { icon: '✈️', name: 'Home', color: 'from-indigo-500 to-purple-500' },
  ]

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-white/60 border border-white/10 rounded-full bg-white/5">
            Shared
          </div>
        </div>

        <div
          ref={filesRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6"
        >
          {files.map((file, index) => (
            <div
              key={index}
              className="file-card group cursor-pointer"
            >
              <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 hover:bg-zinc-900/80 transition-all duration-300 hover:scale-105">
                {/* Icon */}
                <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${file.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {file.icon}
                </div>

                {/* File name */}
                <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors line-clamp-2">
                  {file.name}
                </p>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase