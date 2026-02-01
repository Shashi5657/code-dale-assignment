import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const stats = [
    {
      value: '200',
      suffix: 'M+',
      label: 'API calls per day',
      sublabel: 'Handles massive scale effortlessly',
    },
    {
      value: '5',
      suffix: 'B+',
      label: 'Tokens per day',
      sublabel: 'Built for limitless processing power',
    },
    {
      value: '300',
      suffix: '+',
      label: 'Number of AI models',
      sublabel: 'Flexibility for every application',
    },
    {
      value: '99.998',
      suffix: '%',
      label: 'Historical uptime',
      sublabel: 'Always on, always reliable',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            if (!hasAnimated) {
              setHasAnimated(true)
              animateNumbers()
            }
          },
        })
      }
    })

    return () => ctx.revert()
  }, [hasAnimated])

  const animateNumbers = () => {
    const statElements = document.querySelectorAll('.stat-number')
    statElements.forEach((element, index) => {
      const target = parseFloat(stats[index].value)
      const duration = 2
      
      gsap.from(element, {
        textContent: 0,
        duration: duration,
        ease: 'power2.out',
        snap: { textContent: target > 100 ? 1 : 0.001 },
        onUpdate: function() {
          const current = parseFloat(this.targets()[0].textContent)
          element.textContent = current.toLocaleString('en-US', {
            minimumFractionDigits: target > 100 ? 0 : 3,
            maximumFractionDigits: target > 100 ? 0 : 3,
          })
        },
      })
    })
  }

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Precisely engineered for unparalleled reliability
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Adaline powers the workflows of world-class product and engineering teams with unmatched performance and reliability.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Number with rolling animation */}
                <div className="mb-4 font-mono">
                  <span className="stat-number text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-4xl lg:text-5xl font-bold text-blue-400">
                    {stat.suffix}
                  </span>
                </div>

                {/* Labels */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-white/50">
                  {stat.sublabel}
                </p>
              </div>

              {/* Corner decoration */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection