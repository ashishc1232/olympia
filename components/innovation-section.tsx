'use client'

import { useEffect, useRef, useState } from 'react'

type Metric = {
  value: number
  suffix?: string
  label: string
}

const metrics: Metric[] = [
  { value: 5, label: 'Platform' },
  { value: 15, label: 'Production Sites' },
  { value: 9600, suffix: '+', label: 'Invention Patents' },
  { value: 30000, suffix: '+', label: 'Staffs' },
]

function AnimatedMetric({ value, suffix = '', label, start }: Metric & { start: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let frame = 0
    const duration = 1400
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, value])

  return (
    <div className="innovation-metric">
      <p className="innovation-number" aria-label={`${value}${suffix}`}>
        {count.toLocaleString()}
        {suffix && <sup>{suffix}</sup>}
      </p>
      <p className="innovation-label">{label}</p>
    </div>
  )
}

export function InnovationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="innovation-section" aria-labelledby="innovation-title">
      <div className={`innovation-inner ${isVisible ? 'is-visible' : ''}`}>
        <div className="innovation-heading" data-aos="fade-down">
          <h2 id="innovation-title">
            Innovation
            <br />
            Creates Excellence
          </h2>
        </div>

        <div className="innovation-content" data-aos="fade-up">
          <p className="innovation-description">
            Olympia Group Co.,Ltd is among the global leading suppliers of chemical innovative
            products. Relying on the continuous innovation, commercialized facilities and efficient
            operation, the company provides customers with more competitive products and solutions
          </p>

          <div className="innovation-metrics">
            {metrics.map((metric) => (
              <AnimatedMetric key={metric.label} {...metric} start={isVisible} />
            ))}
          </div>

          <a className="innovation-link" href="#about-us">
            About Us
          </a>
        </div>
      </div>
    </section>
  )
}

export default InnovationSection