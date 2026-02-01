import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ValueProps = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        const cards = sectionRef.current.querySelectorAll('.value-card')
        
        gsap.from(cards, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const values = [
    {
      title: 'For world-class product and engineering teams',
      description: 'Adaline is the end-to-end platform for world-class product and engineering teams building AI-powered applications.',
      cta: 'Start for free',
    },
  ]

  const pillars = [
    {
      title: 'Speed',
      subtitle: 'Move fast without compromise',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Security',
      subtitle: 'Protection at every step',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Scale',
      subtitle: 'A platform that grows with you',
      gradient: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main value prop */}
        <div className="text-center mb-20 lg:mb-32">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            For world-class product and engineering teams
          </h2>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8 leading-relaxed">
            Adaline is the end-to-end platform for world-class product and engineering teams building AI-powered applications.
          </p>

          <button className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:scale-105 transition-transform shadow-2xl shadow-white/20">
            Start for free
          </button>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="value-card group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-white/60">
                  {pillar.subtitle}
                </p>
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${pillar.gradient} opacity-10 blur-2xl`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueProps