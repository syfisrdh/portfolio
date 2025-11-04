"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    degree: "Bachelor of Computer Science (Software Engineering) with Honors",
    school: "University of Malaysia Sabah",
    period: "2021 - 2025",
    description: "Learned programming, data structures, object-oriented programming, machine learning, computer architecture, mathematics, computer graphics, and more. I also explored web and mobile development, as well as AR and VR technologies. Although I studied many areas of tech, my main focus is web development where I build modern, responsive websites that deliver great user experiences.",
    gpa: "3.34/4.0",
  },
  {
    degree: "Foundation in Information Technology",
    school: "University of Malaysia Sabah",
    period: "2020 - 2021",
    description: "Completed a Foundation in Information Technology program, which provided a comprehensive introduction to the core principles of computing and digital systems. This foundational course equipped me with essential knowledge and practical skills.",
    gpa: "3.84/4.0",
  },
]

export function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Use requestAnimationFrame to ensure DOM is fully ready
      requestAnimationFrame(() => {
        const titleEl = sectionRef.current?.querySelector(".education-title") as HTMLElement
        const timelineLine = sectionRef.current?.querySelector(".timeline-line") as HTMLElement
        const listEl = sectionRef.current?.querySelector(".education-list") as HTMLElement
        const cardElements = sectionRef.current?.querySelectorAll(".education-card") as NodeListOf<HTMLElement>
        const iconElements = sectionRef.current?.querySelectorAll(".education-icon") as NodeListOf<HTMLElement>
        
        let titleTrigger: ScrollTrigger | null = null
        let timelineTrigger: ScrollTrigger | null = null
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

        // Timeline line animation with gradient fill effect
        if (timelineLine && listEl) {
          gsap.set(timelineLine, { scaleY: 0, transformOrigin: "top" })
          
          timelineTrigger = ScrollTrigger.create({
            trigger: listEl,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(timelineLine, {
                scaleY: 1,
                duration: 2,
                ease: "power2.out",
              })
            },
          })
        }

        // Education cards animation with enhanced effects
        if (cardElements.length && listEl) {
          // Set initial state for cards and their internal elements
          cardElements.forEach((card, index) => {
            const degree = card.querySelector("h3")
            const school = card.querySelector("p.text-primary")
            const period = card.querySelector("div.flex.flex-col span") || card.querySelector(".flex.flex-col span")
            const description = card.querySelector("p.leading-relaxed")
            const gpa = card.querySelector("p.text-accent")
            const icon = card.querySelector(".education-icon")
            
            gsap.set(card, { 
              opacity: 0, 
              x: -80, 
              rotationY: -30,
              filter: "blur(8px)",
              scale: 0.95,
            })
            
            // Set initial states for internal elements
            if (degree) gsap.set(degree, { opacity: 0, y: 20 })
            if (school) gsap.set(school, { opacity: 0, y: 20 })
            if (period) gsap.set(period, { opacity: 0, x: 20 })
            if (description) gsap.set(description, { opacity: 0, y: 15 })
            if (gpa) gsap.set(gpa, { opacity: 0, scale: 0.8 })
            if (icon) gsap.set(icon, { opacity: 0, scale: 0, rotation: -180 })
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
                const degree = card.querySelector("h3")
                const school = card.querySelector("p.text-primary")
                const period = card.querySelector("div.flex.flex-col span") || card.querySelector(".flex.flex-col span")
                const description = card.querySelector("p.leading-relaxed")
                const gpa = card.querySelector("p.text-accent")
                const icon = card.querySelector(".education-icon")
                
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
                
                // Degree and school together
                if (degree) {
                  gsap.to(degree, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: delay + 0.15,
                    ease: "power2.out",
                  })
                }
                
                if (school) {
                  gsap.to(school, {
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
                
                // Description fades in
                if (description) {
                  gsap.to(description, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: delay + 0.35,
                    ease: "power1.out",
                  })
                }
                
                // GPA pops in
                if (gpa) {
                  gsap.to(gpa, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    delay: delay + 0.5,
                    ease: "back.out(1.5)",
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
            
            const icon = card.querySelector(".education-icon")
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
            
            const icon = card.querySelector(".education-icon")
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
        
        if (timelineTrigger && timelineTrigger.progress > 0) {
          gsap.set(timelineLine, { scaleY: 1 })
        }
        
        if (cardsTrigger && cardsTrigger.progress > 0) {
          gsap.set(cardElements, { opacity: 1, x: 0, rotationY: 0, filter: "blur(0px)", scale: 1 })
          
          // Set all internal elements to visible
          cardElements.forEach((card) => {
            const elements = card.querySelectorAll("h3, p, span")
            elements.forEach((el) => {
              gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 })
            })
            const icon = card.querySelector(".education-icon")
            if (icon) gsap.set(icon, { opacity: 1, scale: 1, rotation: 0 })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative" id="education">
      <div className="max-w-4xl mx-auto">
        <h2 className="education-title text-4xl md:text-5xl font-bold text-center mb-16 text-balance opacity-0">Education</h2>

        <div className="education-list space-y-6 relative">
          <div className="timeline-line absolute left-[2.75rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top" />

          {education.map((edu, index) => (
            <div
              key={index}
              className="education-card glass rounded-xl p-6 md:p-8 relative opacity-0 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="education-icon glass rounded-lg p-3 shrink-0 relative z-10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="text-lg text-primary font-medium">{edu.school}</p>
                  <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                  <p className="text-sm font-bold text-primary">GPA: {edu.gpa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}