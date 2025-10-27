"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

interface LogoItem {
  node?: React.ReactNode
  src?: string
  alt?: string
  title?: string
  href?: string
}

interface LogoLoopProps {
  logos: LogoItem[]
  speed?: number
  direction?: "left" | "right"
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  scaleOnHover?: boolean
  fadeOut?: boolean
  fadeOutColor?: string
  ariaLabel?: string
  className?: string
}

export const LogoLoop = ({
  logos,
  speed = 100,
  direction = "left",
  logoHeight = 48,
  gap = 32,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "#ffffff",
  ariaLabel = "Logo carousel",
  className,
}: LogoLoopProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    addAnimation()
  }, [])

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      const duration = (500 / speed) * 10
      containerRef.current.style.setProperty("--animation-duration", `${duration}s`)
    }
  }

  const maskImage = fadeOut
    ? `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)`
    : "none"

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={
        {
          maskImage,
          WebkitMaskImage: maskImage,
        } as React.CSSProperties
      }
      aria-label={ariaLabel}
    >
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - ${gap}px));
          }
        }
        
        .logo-scroller {
          animation: scroll var(--animation-duration, 40s) linear infinite var(--animation-direction, forwards);
        }
        
        .logo-scroller:hover {
          ${pauseOnHover ? "animation-play-state: paused;" : ""}
        }
        
        .logo-item {
          ${scaleOnHover ? "transition: transform 0.3s ease;" : ""}
        }
        
        .logo-scroller:hover .logo-item {
          ${scaleOnHover ? "transform: scale(1.1);" : ""}
        }
      `}</style>

      <div
        ref={scrollerRef}
        className="logo-scroller flex w-max gap-8"
        style={{
          gap: `${gap}px`,
        }}
      >
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className="logo-item flex items-center justify-center shrink-0"
            style={{
              height: `${logoHeight}px`,
              width: `${logoHeight}px`,
            }}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full hover:opacity-80 transition-opacity"
                title={logo.title || logo.alt}
              >
                {logo.node ? (
                  <div className="flex items-center justify-center w-full h-full text-white">{logo.node}</div>
                ) : logo.src ? (
                  <img
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt || "Logo"}
                    className="w-full h-full object-contain"
                  />
                ) : null}
              </a>
            ) : (
              <>
                {logo.node ? (
                  <div className="flex items-center justify-center w-full h-full text-white">{logo.node}</div>
                ) : logo.src ? (
                  <img
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt || "Logo"}
                    className="w-full h-full object-contain"
                  />
                ) : null}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
