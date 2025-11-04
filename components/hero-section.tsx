"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin, Mail, Twitter, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMagnetic } from "@/lib/use-magnetic"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Muhammad Syufi Saridih"

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      requestAnimationFrame(() => {
        const titleEl = heroRef.current?.querySelector(".hero-title") as HTMLElement
        const subtitleEl = heroRef.current?.querySelector(".hero-subtitle") as HTMLElement
        const descriptionEl = heroRef.current?.querySelector(".hero-description") as HTMLElement
        const socialElements = heroRef.current?.querySelectorAll(".hero-social") as NodeListOf<HTMLElement>

        // Check if section is in viewport (handles refresh case)
        const isInViewport = () => {
          if (!heroRef.current) return false
          const rect = heroRef.current.getBoundingClientRect()
          return rect.top < window.innerHeight && rect.bottom > 0
        }

        const shouldAnimateImmediately = isInViewport()

        // Set initial states
        if (subtitleEl) {
          gsap.set(subtitleEl, { opacity: 0, y: 30 })
        }
        if (descriptionEl) {
          gsap.set(descriptionEl, { opacity: 0, y: 30 })
        }
        if (socialElements.length) {
          gsap.set(socialElements, { opacity: 0, scale: 0 })
        }

        // Title floating animation
        if (titleEl) {
          gsap.to(titleEl, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          })
        }

        // Subtitle animation
        if (subtitleEl) {
          if (shouldAnimateImmediately) {
            // If already in view, animate immediately with shorter delay
            gsap.to(subtitleEl, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
              ease: "power3.out",
            })
          } else {
            gsap.to(subtitleEl, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 1.5,
              ease: "power3.out",
            })
          }
        }

        // Description animation
        if (descriptionEl) {
          if (shouldAnimateImmediately) {
            gsap.to(descriptionEl, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.5,
              ease: "power3.out",
            })
          } else {
            gsap.to(descriptionEl, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 1.8,
              ease: "power3.out",
            })
          }
        }

        // Social buttons animation
        if (socialElements.length) {
          if (shouldAnimateImmediately) {
            // If already in view, animate immediately with shorter delay
            gsap.to(socialElements, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: 0.7,
              stagger: 0.1,
              ease: "back.out(1.7)",
            })
          } else {
            gsap.to(socialElements, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: 2.1,
              stagger: 0.1,
              ease: "back.out(1.7)",
            })
          }
        }

        // Fallback: Ensure elements are visible after animation should complete
        // This handles edge cases where animations might not trigger
        const maxAnimationTime = shouldAnimateImmediately ? 1500 : 3000
        setTimeout(() => {
          if (subtitleEl) {
            const opacity = gsap.getProperty(subtitleEl, "opacity") as number
            if (opacity === 0) {
              gsap.set(subtitleEl, { opacity: 1, y: 0 })
            }
          }
          if (descriptionEl) {
            const opacity = gsap.getProperty(descriptionEl, "opacity") as number
            if (opacity === 0) {
              gsap.set(descriptionEl, { opacity: 1, y: 0 })
            }
          }
          if (socialElements.length) {
            socialElements.forEach((el) => {
              const opacity = gsap.getProperty(el, "opacity") as number
              if (opacity === 0) {
                gsap.set(el, { opacity: 1, scale: 1 })
              }
            })
          }
        }, maxAnimationTime)
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 relative" id="about">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight text-balance">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground opacity-0">
            Full Stack Developer & UI/UX Enthusiast
          </p>
        </div>

        <p className="hero-description text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0">
          I craft beautiful, accessible, and performant web experiences that blend thoughtful design with robust
          engineering. Passionate about creating digital products that make a difference.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap *:opacity-0">
          <MagneticButton href="https://github.com/syfisrdh" icon={Github} label="GitHub" />
          <MagneticButton href="https://www.linkedin.com/in/syufisaridih/" icon={Linkedin} label="LinkedIn" />
          <EmailDropdown />
        </div>
      </div>
    </section>
  )
}

function MagneticButton({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  const magneticRef = useMagnetic(0.4)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hero-social glass hover:scale-110 transition-all hover:shadow-lg hover:shadow-primary/50 text-foreground"
      asChild
      ref={magneticRef as any}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <Icon className="h-5 w-5 text-foreground" />
      </a>
    </Button>
  )
}

function EmailDropdown() {
  const magneticRef = useMagnetic(0.4)
  const { toast } = useToast()
  const email = "syufishi@gmail.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    toast({
      title: "Email copied!",
      description: email,
      duration: 2000,
    })
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hero-social glass hover:scale-110 transition-all hover:shadow-lg hover:shadow-primary/50 text-foreground"
          ref={magneticRef as any}
          aria-label="Email"
        >
          <Mail className="h-5 w-5 text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyEmail} className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Copy Email
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={`mailto:${email}`} className="flex items-center cursor-pointer">
            <Mail className="mr-2 h-4 w-4" />
            Open Mail Client
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}