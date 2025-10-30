"use client"
import styles from "./projects-section.module.css"

interface TechBadgeProps {
  tech: string
  isSelected: boolean
  onClick: () => void
}

export function TechBadge({ tech, isSelected, onClick }: TechBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={isSelected ? styles.techBadgeActive : styles.techBadge}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.4rem 0.8rem",
        background: isSelected ? "oklch(0.488 0.243 264.376)" : "oklch(0.269 0 0)",
        border: isSelected ? "none" : "1px solid oklch(0.488 0.243 264.376 / 0.3)",
        borderRadius: "0.5rem",
        color: "oklch(0.985 0 0)",
        fontSize: "0.8rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? "0 0 10px oklch(0.488 0.243 264.376 / 0.3)" : "none",
      }}
    >
      {tech}
    </button>
  )
}
