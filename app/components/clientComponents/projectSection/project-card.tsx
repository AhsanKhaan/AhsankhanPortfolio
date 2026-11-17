"use client"
import type { Project } from "./projects-section"
import { TechBadge } from "./tech-badge"
import styles from "./projects-section.module.css"
import Img from "next/image"
import ProjectCover from "../../ui/ProjectCover"

interface ProjectCardProps {
  project: Project
  selectedTechs: string[]
  onTechClick: (tech: string) => void
}

export function ProjectCard({ project, selectedTechs, onTechClick }: ProjectCardProps) {
  return (
    <div className={styles.projectCard} style={{ position: "relative" }}>
      {/* Image Container */}
      <div className={styles.projectImage}>
        {project.image ? (
          <Img src={project.image} alt={project.title} width={640} height={400} sizes="(min-width: 1024px) 380px, 100vw" className="w-full h-full object-cover" />
        ) : (
          <ProjectCover title={project.title} kicker={project.kicker} />
        )}
      </div>

      {/* Content */}
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>

        {/* Tech Badges */}
        <div className={styles.techStack}>
          {project.technologies.map((tech) => (
            <TechBadge
              key={tech}
              tech={tech}
              isSelected={selectedTechs.includes(tech)}
              onClick={() => onTechClick(tech)}
            />
          ))}
        </div>
      </div>

      {/* Hover Link */}
      {project.link && (
        <div className={styles.hoverOverlay}>
          <a href={project.link} className={styles.viewButton} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      )}
    </div>
  )
}
