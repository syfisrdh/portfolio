"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Artisan Alley: Artisan E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management",
    longDescription: "Built a comprehensive e-commerce platform equipped with 12 CRUD modules. Features include real-time inventory tracking, payment processing, order management, and analytics dashboard.",
    tech: ["Blade", "HTML", "Javascript", "TailwindCSS", "Laravel", "PHP", "PostgreSQL"],
    image: "/artisan_alley_1.png",
    github: "",
    live: "",
    sourceActive: false,
    liveActive: false,
    outcomes: [
      "Streamlined buyer-seller interactions in the handcraft industry",
      "Digitized traditional artisan commerce",
      "Secure and scalable architecture",
      "Self-hosted solution with optimized performance and security",
      "Demonstrated ability to manage infrastructure independently"
    ],
  },
  {
    title: "Event Management System",
    description: "Streamlining event planning and reducing manual paperwork",
    longDescription:
      "The Faculty Event Management System was a full-stack web application designed to digitize and simplify the process of organizing academic events. The system enabled faculty members to create, manage, and track events efficiently. As team lead, I coordinated a group of four developers, overseeing task distribution, feature integration, and milestone tracking. I also managed Git version control, ensuring seamless collaboration and conflict-free code merges throughout development cycles. The system replaced traditional paper-based workflows with a centralized digital platform, significantly improving accessibility and reducing administrative overhead.",
    tech: ["HTML", "Javascript", "CSS", "PHP", "MySQL"],
    image: "/event_management_1.png",
    github: "https://github.com/syfisrdh/EventManagementSystem",
    live: "",
    sourceActive: true,
    liveActive: false,
    outcomes: [
      "Reduced paperwork by 80% through digital automation",
      "Led a team of 4 developers with successful project delivery",
      "Ensured smooth code integration using Git version control",
      "Improved event tracking and reporting for faculty operations"
    ],
  },
]

type Project = {
  title: string
  description: string
  longDescription: string
  tech: string[]
  image: string
  github?: string | null
  live?: string | null
  sourceActive?: boolean
  liveActive?: boolean
  outcomes: string[]
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 80%",
        },
      })

      gsap.from(".project-card", {
        opacity: 0,
        rotationY: 90,
        scale: 0.8,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={sectionRef} className="py-20 px-4 relative" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="projects-title text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
            Featured Projects
          </h2>

          <div className="projects-grid grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const isLastItem = index === projects.length - 1
              const isOddCount = projects.length % 2 !== 0
              const isSingleItem = projects.length === 1
              const shouldSpanFull = isLastItem && (isOddCount || isSingleItem)

              return (
                <div
                  key={index}
                  className={shouldSpanFull ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}
                >
                  <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-foreground/80 [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="sr-only">Project details for {selectedProject?.title}</DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover border border-border"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Outcomes</h3>
                  <ul className="space-y-2">
                    {selectedProject.outcomes.map((outcome, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-start gap-2">
                        <span className="text-black/80 dark:text-white/80">•</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  {selectedProject.sourceActive ? (
                    <Button asChild className="flex-1">
                      <a href={selectedProject.github || "#"} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="flex-1 opacity-50 cursor-not-allowed">
                      <Github className="w-4 h-4 mr-2" />
                      Not Available
                    </Button>
                  )}
                  {selectedProject.liveActive ? (
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <a href={selectedProject.live || "#"} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  ) : (
                    <Button disabled variant="outline" className="flex-1 bg-transparent opacity-50 cursor-not-allowed">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Not Available
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setTilt({ x: y * 10, y: -x * 10 })
    setImageOffset({ x: x * 10, y: y * 10 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setImageOffset({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="project-card glass rounded-xl overflow-hidden cursor-pointer group relative rounded-xl"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.3s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x rounded-xl" />
      <div className="absolute inset-[2px] bg-background rounded-xl" />

      <div className="relative z-10 rounded-xl">
        <div className="aspect-video relative overflow-hidden bg-muted rounded-t-xl">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(1.1)`,
            }}
          />
        </div>
        <div className="p-6 space-y-3 rouded-xl">
          <h3 className="text-xl font-semibold group-hover:text-black/90 dark:text-white/90 transition-colors">{project.title}</h3>
          <p className="text-muted-foreground leading-relaxed group-hover:text-black/90 dark:group-hover:text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.tech.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}