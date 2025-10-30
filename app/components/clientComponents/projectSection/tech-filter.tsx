"use client"
import styles from "./projects-section.module.css"

interface TechFilterProps {
  technologies: string[]
  selectedTechs: string[]
  onTechToggle: (tech: string) => void
  onClearFilters: () => void
  projectCount: number
}

export function TechFilter({
  technologies,
  selectedTechs,
  onTechToggle,
  onClearFilters,
  projectCount,
}: TechFilterProps) {
  return (
    <div className={styles.filterSection}>
      {/* Filter Header */}
      <div style={{ width: "100%", marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <div>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "oklch(0.985 0 0)", marginBottom: "0.25rem" }}>
              Filter by Technology
            </h3>
            <p style={{ fontSize: "0.75rem", color: "oklch(0.708 0 0)" }}>
              {projectCount} project{projectCount !== 1 ? "s" : ""} found
            </p>
          </div>
          {selectedTechs.length > 0 && (
            <button
              onClick={onClearFilters}
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "oklch(0.488 0.243 264.376)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => onTechToggle(tech)}
            className={selectedTechs.includes(tech) ? styles.filterBadgeActive : styles.filterBadge}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              border: selectedTechs.includes(tech) ? "none" : "1px solid oklch(0.269 0 0)",
              background: selectedTechs.includes(tech) ? "oklch(0.488 0.243 264.376)" : "transparent",
              color: "oklch(0.985 0 0)",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
              transition: "all 0.3s ease",
              boxShadow: selectedTechs.includes(tech) ? "0 0 20px oklch(0.488 0.243 264.376 / 0.5)" : "none",
            }}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  )
}
