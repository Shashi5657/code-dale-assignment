import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Feature {
  number: string
  title: string
  description: string
  items: {
    icon: string
    title: string
    description: string
  }[]
}

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (featuresRef.current) {
        const features = featuresRef.current.querySelectorAll('.feature-card')
        
        features.forEach((feature) => {
          gsap.from(feature, {
            scrollTrigger: {
              trigger: feature,
              start: 'top 85%',
              end: 'bottom 60%',
              toggleActions: 'play none none reverse',
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const features: Feature[] = [
    {
      number: '01',
      title: 'Iterate',
      description: 'Sketch, test and refine',
      items: [
        {
          icon: 'Editor',
          title: 'Prompt management across providers',
          description: 'Centralize your prompts for all LLM providers in one intuitive workspace, eliminating fragmentation and ensuring consistency across your AI applications.',
        },
        {
          icon: 'Variables',
          title: 'Multi-modal and dynamic variables',
          description: 'Test how your prompts perform with different inputs, images, and dynamic RAG context in real-time, identifying the optimal configurations for your specific use cases.',
        },
        {
          icon: 'History',
          title: 'Automatic version history',
          description: 'Never lose your work with comprehensive version tracking that captures every change, allowing you to compare iterations and revert to previous versions instantly.',
        },
      ],
    },
    {
      number: '02',
      title: 'Evaluate',
      description: 'Reflect and measure',
      items: [
        {
          icon: 'Test',
          title: 'Magical test set up',
          description: 'Create robust test suites in seconds with AI-assisted generation that identifies edge cases and potential failure modes you might have missed.',
        },
        {
          icon: 'Trends',
          title: 'Historical performance trends',
          description: 'Track how your AI\'s performance evolves over time with intuitive visualizations that highlight improvements and regressions across all key metrics.',
        },
        {
          icon: 'Rollback',
          title: 'Rollback to any prompt version',
          description: 'Instantly revert to previous versions when issues arise, with the ability to compare performance metrics between any two points in your evaluation history.',
        },
      ],
    },
    {
      number: '03',
      title: 'Deploy',
      description: 'From draft to live',
      items: [
        {
          icon: 'Environment',
          title: 'Multi-environment deployments',
          description: 'Manage the entire lifecycle from development to production with environment-specific configurations that ensure smooth transitions between stages.',
        },
        {
          icon: 'Diff',
          title: 'Smart diffing across versions',
          description: 'Understand exactly what changed between deployments with intelligent diffing that highlights modifications to prompts, models, and configuration settings.',
        },
        {
          icon: 'Quick',
          title: 'Instant rollbacks',
          description: 'Recover from issues in seconds with one-click rollbacks that restore previous configurations, keeping your AI services reliable and your users happy.',
        },
      ],
    },
    {
      number: '04',
      title: 'Monitor',
      description: 'Insights in real time',
      items: [
        {
          icon: 'Traces',
          title: 'Full traces and spans',
          description: 'Understand the complete journey of each request through your AI system with detailed visualization of execution paths, helping you identify bottlenecks and optimization opportunities.',
        },
        {
          icon: 'Continuous',
          title: 'Continuous evaluations',
          description: 'Automatically test your production AI against benchmark datasets and real-time inputs, ensuring performance remains consistent as user patterns and data distributions evolve.',
        },
        {
          icon: 'Annotations',
          title: 'Human annotations',
          description: 'Enrich your training and evaluation datasets with human feedback collected directly from your monitoring interface, creating a virtuous cycle of continuous improvement.',
        },
      ],
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={featuresRef} className="space-y-32 lg:space-y-40">
          {features.map((feature, featureIndex) => (
            <div key={featureIndex} className="feature-card">
              {/* Section number and title */}
              <div className="flex items-center gap-6 mb-12">
                <div className="flex items-center gap-4">
                  <span className="text-6xl lg:text-7xl font-bold text-white/5">
                    {feature.number}
                  </span>
                  <div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                      {feature.title}
                    </h2>
                    <p className="text-lg text-white/40">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Learn more link */}
              <div className="mb-12">
                <button className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Feature items grid */}
              <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                {feature.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg" />
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="text-white/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection