"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  href?: string
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
}

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
}

export function Logo({ className, showText = true, size = "md", href = "/" }: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Diamond Logo SVG */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size], "flex-shrink-0")}
      >
        {/* Diamond Shape */}
        <path d="M24 4L44 20L24 44L4 20L24 4Z" className="fill-primary" />
        {/* Inner Diamond Facets */}
        <path d="M24 4L34 20L24 44L14 20L24 4Z" className="fill-primary/80" />
        <path d="M14 20L24 12L34 20L24 28L14 20Z" className="fill-white/30" />
        {/* Shine Effect */}
        <path d="M24 4L29 14L24 12L19 14L24 4Z" className="fill-white/50" />
        {/* V for Visa */}
        <path d="M18 22L24 34L30 22L27 22L24 29L21 22Z" className="fill-white" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold tracking-tight leading-none text-foreground", textSizeClasses[size])}>
            Diamond<span className="text-primary">Visa</span>
          </span>
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Global Seyahat Cozumleri</span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-80">
        {content}
      </Link>
    )
  }

  return content
}

// Favicon Component for dynamic favicon
export function Favicon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L30 14L16 30L2 14L16 2Z" fill="#0984E3" />
      <path d="M16 2L22 14L16 30L10 14L16 2Z" fill="#0773C5" />
      <path d="M10 14L16 8L22 14L16 20L10 14Z" fill="rgba(255,255,255,0.3)" />
      <path d="M12 15L16 24L20 15L18 15L16 20L14 15Z" fill="white" />
    </svg>
  )
}
