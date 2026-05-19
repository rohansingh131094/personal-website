import { useRef, useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ProgressRing } from '@/components/ui/progress-ring'
import { metrics } from '@/config/loader'
import { cn } from '@/lib/utils'

function AnimatedCounter({
  value,
  suffix,
  isVisible,
}: {
  value: number
  suffix: string
  isVisible: boolean
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    const stepDuration = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, isVisible])

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  )
}

export function LeadershipHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (metrics.length === 0) return null

  return (
    <section id="impact" className="section-padding">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brass-600 dark:text-brass-400 uppercase tracking-wider mb-3">
            Leadership Impact
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-navy-900 dark:text-slate-100 mb-4">
            Numbers That Matter
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A track record of driving measurable results through technical
            excellence and strategic leadership.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {metrics.map((metric, index) => (
            <Card
              key={metric.label}
              className={cn(
                'relative overflow-hidden border-border h-[200px] md:h-[220px]',
                isVisible && 'animate-fade-in-up'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center relative h-full flex flex-col justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <ProgressRing
                    value={metric.value}
                    max={metric.max || metric.value}
                    size={100}
                    strokeWidth={6}
                    isVisible={isVisible}
                  />
                </div>

                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 dark:bg-navy-800 text-slate-600 dark:text-slate-400 mb-4 mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>

                <p className="relative text-3xl md:text-4xl font-mono font-bold text-navy-900 dark:text-slate-100 mb-1">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    isVisible={isVisible}
                  />
                </p>

                <p className="relative text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {metric.label}
                </p>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brass-400 to-brass-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
