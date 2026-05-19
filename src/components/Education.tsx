import { useRef, useState, useEffect } from 'react'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { education, educationSection } from '@/config/loader'
import { cn } from '@/lib/utils'

export function Education() {
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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  if (education.length === 0) return null

  return (
    <section id="education" className="section-padding">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-brass-600 dark:text-brass-400 uppercase tracking-wider mb-3">
            {educationSection.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-navy-900 dark:text-slate-100 mb-4">
            {educationSection.headline}
          </h2>
          {educationSection.description && (
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {educationSection.description}
            </p>
          )}
        </div>

        <div ref={sectionRef} className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-navy-700 md:-translate-x-px" />

          {education.map((edu, index) => (
            <div
              key={edu.institution}
              className={cn(
                'relative mb-12 last:mb-0',
                isVisible && 'animate-fade-in-up'
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 bg-white dark:bg-navy-900 border-4 border-brass-500 rounded-full z-10" />

              <div
                className={cn(
                  'ml-16 md:ml-0 md:w-[calc(50%-2rem)]',
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                )}
              >
                <Card className="overflow-hidden border-border transition-shadow">
                  <CardHeader className="pb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-brass-500 shrink-0" />
                      <h3 className="text-xl font-display font-semibold text-navy-900 dark:text-slate-100">
                        {edu.institution}
                      </h3>
                    </div>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                      {edu.degree}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mt-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </span>
                      {edu.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
