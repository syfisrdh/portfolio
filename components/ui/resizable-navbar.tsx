"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  children: React.ReactNode
  className?: string
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface NavItemsProps {
  items: Array<{ name: string; link: string }>
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavMenuProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
}

interface MobileNavToggleProps {
  isOpen: boolean
  onClick: () => void
}

interface NavbarButtonProps {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "dark" | "gradient"
  onClick?: () => void
}

export function Navbar({ children, className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ width: "100%" }}
      animate={{
        width: isScrolled ? "calc(100% - 2rem)" : "100%",
        maxWidth: isScrolled ? "1200px" : "100%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        isScrolled ? "mt-4 rounded-2xl glass-strong shadow-lg" : "glass",
        className,
      )}
    >
      {children}
    </motion.nav>
  )
}

export function NavBody({ children, className, visible = true }: NavBodyProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn("flex items-center justify-between px-6 py-4", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function NavItems({ items, className, onItemClick }: NavItemsProps) {
  return (
    <div className={cn("hidden md:flex items-center gap-6", className)}>
      {items.map((item, index) => (
        <motion.a
          key={item.link}
          href={item.link}
          onClick={onItemClick}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="text-sm font-medium hover:text-primary transition-colors relative group"
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </motion.a>
      ))}
    </div>
  )
}

export function MobileNav({ children, className, visible = true }: MobileNavProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("md:hidden", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function MobileNavHeader({ children, className }: MobileNavHeaderProps) {
  return <div className={cn("flex items-center justify-between px-6 py-4", className)}>{children}</div>
}

export function MobileNavMenu({ children, className, isOpen, onClose }: MobileNavMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("overflow-hidden", className)}
        >
          <div className="px-6 pb-4 space-y-2">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function MobileNavToggle({ isOpen, onClick }: MobileNavToggleProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
      aria-label="Toggle mobile menu"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export function NavbarButton({
  href,
  as: Component = "a",
  children,
  className,
  variant = "primary",
  onClick,
}: NavbarButtonProps) {
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    dark: "bg-foreground text-background hover:bg-foreground/90",
    gradient: "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90",
  }

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Component>
  )
}
