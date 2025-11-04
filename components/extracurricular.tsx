"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, Code, Users, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const activities = [
  {
    title: "Google Cloud AI Study Jam: #GCPBoleh Season 7",
    category: "Community",
    period: "2025",
    description: "Hands-on learning program for Malaysian developers to master AI, ML, and cloud technologies using Google Cloud tools like Gemini and Vertex AI.",
    icon: Code,
  },
  {
    title: "ABU Robocon Malaysia",
    category: "Competition",
    period: "2023",
    description: "Part of the programming department. Incharge of developing a computer vision to detect the pole, and maintain a connection between raspberry pi and ESP32. Win the Best Sustainability Award.",
    icon: Award,
  },
  {
    title: "30-Hour Hackathon Challenge by MyStartup x Elevate",
    category: "Hackathon",
    period: "2023",
    description: "Me and my team designed a smart parking system prototype using AI to detect available spots and built the user interface with Figma. The goal was to improve parking efficiency through smart design and real-time detection.",
    icon: Zap,
  },
  {
    title: "UROCK Legged-Robot Challenge",
    category: "Competition",
    period: "2022",
    description: "In charge of developing an embedded website on the ESP32 to display real-time motor performance during a robotics competition. The team won first place.",
    icon: Award,
  }
]

export function Extracurricular() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      requestAnimationFrame(() => {
        const titleEl = sectionRef.current?.querySelector(".extra-title") as HTMLElement
        const gridEl = sectionRef.current?.querySelector(".extra-grid") as HTMLElement
        const cardElements = sectionRef.current?.querySelectorAll(".extra-card") as NodeListOf<HTMLElement>
        const iconElements = sectionRef.current?.querySelectorAll(".extra-icon") as NodeListOf<HTMLElement>

        let titleTrigger: ScrollTrigger | null = null
        let cardsTrigger: ScrollTrigger | null = null

        // Title animation with scale and blur
        if (titleEl) {
          gsap.set(titleEl, { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" })

          titleTrigger = ScrollTrigger.create({
            trigger: titleEl,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(titleEl, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out",
              })
            },
          })
        }

        // Activity cards animation with enhanced effects
        if (cardElements.length && gridEl) {
          cardElements.forEach((card, index) => {
            const title = card.querySelector("h3")
            const category = card.querySelector("p.text-accent")
            const period = card.querySelector("span.text-muted-foreground")
            const description = card.querySelector("p.leading-relaxed")
            const icon = card.querySelector(".extra-icon")
            const iconContainer = card.querySelector(".glass.rounded-lg.p-3")

            gsap.set(card, {
              opacity: 0,
              x: index % 2 === 0 ? -80 : 80,
              rotationY: index % 2 === 0 ? -30 : 30,
              filter: "blur(8px)",
              scale: 0.95,
            })

            if (title) gsap.set(title, { opacity: 0, y: 20 })
            if (category) gsap.set(category, { opacity: 0, y: 20 })
            if (period) gsap.set(period, { opacity: 0, x: index % 2 === 0 ? 20 : -20 })
            if (description) gsap.set(description, { opacity: 0, y: 15 })
            if (icon) gsap.set(icon, { opacity: 0, scale: 0, rotation: -180 })
            if (iconContainer) gsap.set(iconContainer, { opacity: 0, scale: 0.8 })
          })

          cardsTrigger = ScrollTrigger.create({
            trigger: gridEl,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(cardElements, {
                opacity: 1,
                x: 0,
                rotationY: 0,
                filter: "blur(0px)",
                scale: 1,
                duration: 1.1,
                stagger: 0.25,
                ease: "power3.out",
              })

              cardElements.forEach((card, index) => {
                const title = card.querySelector("h3")
                const category = card.querySelector("p.text-accent")
                const period = card.querySelector("span.text-muted-foreground")
                const description = card.querySelector("p.leading-relaxed")
                const icon = card.querySelector(".extra-icon")
                const iconContainer = card.querySelector(".glass.rounded-lg.p-3")

                const delay = index * 0.25 + 0.3

                if (iconContainer) {
                  gsap.to(iconContainer, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: delay,
                    ease: "back.out(2)",
                  })
                }

                if (icon) {
                  gsap.to(icon, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    delay: delay + 0.1,
                    ease: "back.out(2)",
                  })
                }

                if (title) {
                  gsap.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: delay + 0.15,
                    ease: "power2.out",
                  })
                }

                if (category) {
                  gsap.to(category, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: delay + 0.2,
                    ease: "power2.out",
                  })
                }

                if (period) {
                  gsap.to(period, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: delay + 0.25,
                    ease: "power2.out",
                  })
                }

                if (description) {
                  gsap.to(description, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: delay + 0.35,
                    ease: "power1.out",
                  })
                }
              })
            },
          })
        }

        // Add subtle floating animation to icons
        iconElements.forEach((icon, index) => {
          gsap.to(icon, {
            y: -8,
            duration: 2 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.1,
          })
        })

        // Enhanced parallax effect for cards with rotation
        cardElements.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress
              gsap.to(card, {
                y: -30 * progress,
                rotationX: 2 * progress,
                duration: 0.3,
                ease: "power1.out",
              })
            },
          })
        })

        // Add hover effect with GSAP for smoother interactions
        cardElements.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.02,
              y: -5,
              rotationY: 2,
              duration: 0.3,
              ease: "power2.out",
            })

            const icon = card.querySelector(".extra-icon")
            const iconContainer = card.querySelector(".glass.rounded-lg.p-3")
            if (icon) {
              gsap.to(icon, {
                scale: 1.1,
                rotation: 360,
                duration: 0.5,
                ease: "back.out(2)",
              })
            }
            if (iconContainer) {
              gsap.to(iconContainer, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
              })
            }
          })

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotationY: 0,
              duration: 0.3,
              ease: "power2.out",
            })

            const icon = card.querySelector(".extra-icon")
            const iconContainer = card.querySelector(".glass.rounded-lg.p-3")
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
              })
            }
            if (iconContainer) {
              gsap.to(iconContainer, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              })
            }
          })
        })

        ScrollTrigger.refresh()

        if (titleTrigger && titleTrigger.progress > 0) {
          gsap.set(titleEl, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" })
        }

        if (cardsTrigger && cardsTrigger.progress > 0) {
          gsap.set(cardElements, { opacity: 1, x: 0, rotationY: 0, filter: "blur(0px)", scale: 1 })

          cardElements.forEach((card) => {
            const elements = card.querySelectorAll("h3, p, span")
            elements.forEach((el) => {
              gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 })
            })
            const icon = card.querySelector(".extra-icon")
            const iconContainer = card.querySelector(".glass.rounded-lg.p-3")
            if (icon) gsap.set(icon, { opacity: 1, scale: 1, rotation: 0 })
            if (iconContainer) gsap.set(iconContainer, { opacity: 1, scale: 1 })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative" id="extracurricular">
      <div className="max-w-6xl mx-auto">
        <h2 className="extra-title text-4xl md:text-5xl font-bold text-center mb-16 text-balance opacity-0">
          Extracurricular Activities
        </h2>

        <div className="extra-grid grid md:grid-cols-2 gap-6">
          {activities.map((activity, index) => {
            const isLastItem = index === activities.length - 1
            const isOddCount = activities.length % 2 !== 0
            const isSingleItem = activities.length === 1
            const shouldSpanFull = isLastItem && (isOddCount || isSingleItem)

            return (
            <div
              key={index}
              className={`extra-card glass rounded-xl p-6 group opacity-0 ${shouldSpanFull ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="glass rounded-lg p-3 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <activity.icon className="extra-icon w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl text-primary font-semibold">{activity.title}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.period}</span>
                  </div>

                  <div className="border border-border rounded-xl px-2 py-0 w-fit">
                      <p className="text-xs text-muted-foreground font-medium">{activity.category}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}