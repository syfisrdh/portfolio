"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Home, X, Menu, Download } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import React, { useRef, useState } from "react";
import { useTheme } from 'next-themes';
import { gsap } from "gsap";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items?: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible }
          )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(2px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-xl px-4 py-2 lg:flex gap-4 overflow-visible",
        visible && "bg-white/80 dark:bg-background/40",
        className
      )}
    >
      {children}
      <div className="shrink-0">
        <AuthNav />
      </div>
    </motion.div>
  );
};

export const NavItems = ({
  className,
  onItemClick,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

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


  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 bg-transparent hidden flex-1 flex-row items-center justify-center space-x-1 sm:space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-1 lg:sm:space-x-2 rounded-xl",
        className
      )}
    >
      {navItems.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(2px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden rounded-xl",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between rounded-xl",
        className
      )}
    >
      {children}
      <AuthNav />
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-4 shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] dark:bg-neutral-950",
            className
          )}
        >
          {children}
          <MobileAuthMenuItems />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <X className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <Menu className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <Home className="h-6 w-6 text-black/80 dark:text-white/80" />
    </a>
  );
};

// Helper function to convert hex to rgba (for tooltip styling)
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const DownloadResumeButton = ({
  isMobile = false
}: {
  isMobile?: boolean
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsAnimating(true);

    // Show toast notification
    toast({
      title: "Resume Downloaded!",
      duration: 2000,
    });

    if (buttonRef.current) {
      // Click animation - scale down then up with bounce animation
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(2)",
            onComplete: () => {
              // Reset transform to ensure proper alignment
              if (buttonRef.current) {
                gsap.set(buttonRef.current, { clearProps: "transform" });
              }
            },
          });
        },
      });

      // Ripple effect
      const ripple = document.createElement("div");
      ripple.className = "absolute inset-0 rounded-lg pointer-events-none";
      ripple.style.background = "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)";
      ripple.style.transform = "scale(0)";
      ripple.style.borderRadius = "inherit";
      ripple.style.zIndex = "1";
      buttonRef.current.appendChild(ripple);

      gsap.to(ripple, {
        scale: 2.5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          if (ripple.parentNode) {
            ripple.remove();
          }
          setIsAnimating(false);
        },
      });
    }
  };

  if (isMobile) {
    return (
      <a
        ref={buttonRef}
        href="/resume.pdf"
        download="Syufi_Resume.pdf"
        onClick={handleClick}
        className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors duration-200 overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
      >
        <Download className="h-4 w-4" />
        <span>Download Resume</span>
      </a>
    );
  }

  return (
    <div className="relative group">
      <a
        ref={buttonRef}
        href="/resume.pdf"
        download="Syufi_Resume.pdf"
        onClick={handleClick}
        className="relative flex items-center justify-center px-3 py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors duration-200 overflow-visible shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
      >
        <Download className="h-4 w-4 shrink-0" />
      </a>

      {/* Tooltip below the download button */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-100">
        <div className="relative">
          {/* Tooltip content */}
          <span
            className="bg-white dark:bg-neutral-900 inline-block px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 shadow-lg border text-primary"
            style={{
              borderColor: "hsl(var(--primary) / 0.25)",
              boxShadow: "0 4px 12px hsl(var(--primary) / 0.25), 0 0 0 1px hsl(var(--primary) / 0.1), 0 0 20px hsl(var(--primary) / 0.1)",
            }}
          >
            Download Resume
          </span>

          {/* Tooltip arrow pointing up */}
          <div 
            className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-primary/80"
            style={{
              filter: "drop-shadow(0 2px 4px hsl(var(--primary) / 0.25))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const MobileAuthMenuItems = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4 w-full pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-center">
          <span className="flex flex-row text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {theme === 'dark'
              ? <>
                <Moon className="h-4 w-4 mr-4" /> <span>Dark Mode</span>
              </>
              : <>
                <Sun className="h-4 w-4 mr-4" /> <span>Light Mode</span>
              </>
            }
          </span>
          <label htmlFor="dark-mode-switch-mobile">
            <Switch
              id="dark-mode-switch-mobile"
              checked={theme === 'dark'}
              onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="cursor-pointer"
            />
          </label>
        </div>
        <DownloadResumeButton isMobile={true} />
      </div>
    </div>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-4 py-2 rounded-xl bg-white button bg-white text-black text-sm font-medium relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center hover:bg-primary/90 hover:text-white";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary:
      "bg-transparent shadow-none dark:text-white border bg-background",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

const AuthNav = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="hidden lg:flex items-center gap-2">
      <ThemeToggle />
      <DownloadResumeButton />
    </div>
  );
};