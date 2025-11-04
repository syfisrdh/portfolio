"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    title: "Full Stack Developer Intern",
    company: "Trigon Tech Sdn Bhd",
    period: "2025",
    responsibilities: [
      "Worked across two different projects which are MPOB E-licensing system, and Gyra AI Chatbot",
      "Designed high-fidelity UI/UX mock-ups in Figma, boosting workflow efficiency and usability",
      "Developed 30+ reusable React TypeScript components, improving consistency across the systems",
      "Built secure RESTful APIs with Laravel, and Node.js, ensuring scalable backend operations",
      "Improved chatbot response accuracy by 25% with a contextual memory layer in a RAG pipeline",
      "Resolved 100+ bugs by conducting QA testing, and implementing code-level fixes to ensure system stability and performance",
    ],
  },
]

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Use requestAnimationFrame to ensure DOM is fully ready
      requestAnimationFrame(() => {
        const titleEl = sectionRef.current?.querySelector(".experience-title") as HTMLElement
        const listEl = sectionRef.current?.querySelector(".experience-list") as HTMLElement
        const cardElements = sectionRef.current?.querySelectorAll(".experience-card") as NodeListOf<HTMLElement>
        const iconElements = sectionRef.current?.querySelectorAll(".experience-icon") as NodeListOf<HTMLElement>
        
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

        // Experience cards animation with enhanced effects
        if (cardElements.length && listEl) {
          // Set initial state for cards and their internal elements
          cardElements.forEach((card, index) => {
            const title = card.querySelector("h3")
            const company = card.querySelector("p.text-primary")
            const period = card.querySelector("span.text-muted-foreground") || card.querySelector(".text-muted-foreground:first-of-type")
            const bulletItems = card.querySelectorAll(".experience-bullet")
            const icon = card.querySelector(".experience-icon")
            
            gsap.set(card, { 
              opacity: 0, 
              x: 100,
              rotationY: 30,
              filter: "blur(8px)",
              scale: 0.95,
            })
            
            // Set initial states for internal elements
            if (title) gsap.set(title, { opacity: 0, y: 20 })
            if (company) gsap.set(company, { opacity: 0, y: 20 })
            if (period) gsap.set(period, { opacity: 0, x: 20 })
            if (bulletItems) {
              bulletItems.forEach((bullet) => {
                gsap.set(bullet, { opacity: 0, x: -20 })
              })
            }
            if (icon) gsap.set(icon, { opacity: 0, scale: 0, rotation: 180 })
          })
          
          cardsTrigger = ScrollTrigger.create({
            trigger: listEl,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate cards
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
              
              // Animate internal elements with staggered timing
              cardElements.forEach((card, index) => {
                const title = card.querySelector("h3")
                const company = card.querySelector("p.text-primary")
                const period = card.querySelector("span.text-muted-foreground") || card.querySelector(".text-muted-foreground:first-of-type")
                const bulletItems = card.querySelectorAll(".experience-bullet")
                const icon = card.querySelector(".experience-icon")
                
                const delay = index * 0.25 + 0.3
                
                // Icon animation with bounce
                if (icon) {
                  gsap.to(icon, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    delay: delay,
                    ease: "back.out(2)",
                  })
                }
                
                // Title and company together
                if (title) {
                  gsap.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: delay + 0.15,
                    ease: "power2.out",
                  })
                }
                
                if (company) {
                  gsap.to(company, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: delay + 0.2,
                    ease: "power2.out",
                  })
                }
                
                // Period slides in from right
                if (period) {
                  gsap.to(period, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: delay + 0.25,
                    ease: "power2.out",
                  })
                }
                
                // Bullet points animate in sequence
                bulletItems.forEach((bullet, bulletIdx) => {
                  gsap.to(bullet, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: delay + 0.35 + bulletIdx * 0.1,
                    ease: "power1.out",
                  })
                })
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

        // Enhanced parallax effect for cards
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
            
            const icon = card.querySelector(".experience-icon")
            if (icon) {
              gsap.to(icon, {
                scale: 1.1,
                rotation: 360,
                duration: 0.5,
                ease: "back.out(2)",
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
            
            const icon = card.querySelector(".experience-icon")
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
              })
            }
          })
        })

        // Refresh ScrollTrigger to ensure proper initialization
        ScrollTrigger.refresh()

        // Check if already past trigger point AFTER refresh
        if (titleTrigger && titleTrigger.progress > 0) {
          gsap.set(titleEl, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" })
        }
        
        if (cardsTrigger && cardsTrigger.progress > 0) {
          gsap.set(cardElements, { opacity: 1, x: 0, rotationY: 0, filter: "blur(0px)", scale: 1 })
          
          // Set all internal elements to visible
          cardElements.forEach((card) => {
            const elements = card.querySelectorAll("h3, p, span, li")
            elements.forEach((el) => {
              gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 })
            })
            const icon = card.querySelector(".experience-icon")
            if (icon) gsap.set(icon, { opacity: 1, scale: 1, rotation: 0 })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative" id="experience">
      <div className="max-w-4xl mx-auto">
        <h2 className="experience-title text-4xl md:text-5xl font-bold text-center mb-16 text-balance opacity-0">
          Professional Experience
        </h2>

        <div className="experience-list space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card glass rounded-xl p-4 sm:p-6 md:p-8 relative opacity-0 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="experience-icon glass rounded-lg p-2 sm:p-3 shrink-0 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-3 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold wrap-break-word">{exp.title}</h3>
                    <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap sm:ml-4">{exp.period}</span>
                  </div>
                  <p className="text-base sm:text-lg text-primary font-medium wrap-break-word">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="experience-bullet text-sm sm:text-base text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-black/80 dark:text-white/80 shrink-0">•</span>
                        <span className="wrap-break-word">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}