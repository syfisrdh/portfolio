"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        className="relative flex items-center justify-center px-3 py-2 rounded-lg bg-black hover:bg-white text-black dark:text-white font-medium text-sm transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
        aria-label="Toggle theme"
      >
        <Moon className="h-4 w-4 shrink-0 text-white" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center px-3 py-2 rounded-lg font-medium text-sm bg-black dark:bg-white hover:bg-black/90 dark:hover:bg-white/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4 shrink-0 text-black" /> : <Moon className="h-4 w-4 shrink-0 text-white" />}
    </button>
  )
}