"use client";
import { AnimatedBackground } from "@/components/animated-background"
import { useState } from "react";
import { ScrollProgress } from "@/components/scroll-progress"
import { HeroSection } from "@/components/hero-section"
import { TechStack } from "@/components/tech-stack"
import { Education } from "@/components/education"
import { Extracurricular } from "@/components/extracurricular"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/resizable-navigation"

  const navItems = [
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Tech Stack",
      link: "#tech-stack",
    },
    {
      name: "Education",
      link: "#education",
    },
    {
      name: "Activities",
      link: "#extracurricular",
    },
    {
      name: "Experience",
      link: "#experience",
    },
    {
      name: "Projects",
      link: "#projects",
    },
  ];

export default function Home() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <ScrollProgress />

      <Navbar>
          <NavBody>
            <NavbarLogo />
            <NavItems />
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:translate-x-1 dark:hover:bg-primary/20"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

      <HeroSection />
      <TechStack />
      <Education />
      <Extracurricular />
      <Experience />
      <Projects />

      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>© 2025 Syufi Saridih. Built with Next.js, TypeScript, and Tailwind CSS.</p>
      </footer>
    </main>
  )
}
