"use client"

import { useState, useMemo } from "react"
import { ProjectCard } from "./project-card"
import { TechFilter } from "./tech-filter"
import styles from "./projects-section.module.css"

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Admin Portal Nucleus",
    description: "Admin Portal Dashboard for Nayapay for onboarding and managing consumers and merchants including KYC, Transactions, and Reports, etc.Integrated with React front-end and Laravel back-end.also supports website Content Management.",
    image: "/assets/projects/admin-portal-dashboard.png",
    technologies: ["Figma", "PHP","React", "TypeScript","Laravel","PWA","Jest","JavaScript","Redux"],
    link: "https://admin-portal.nayapay.com/",
  },
  {
    id: "2",
    title: "Nayapay Business Portal",
    description: "An interactive Merchant Portal that provides Merchants with a comprehensive dashboard to manage their business activities, track transactions, and access various financial services.",
    image: "/assets/projects/nayapay_business.png",
    technologies: ["Figma", "PHP","React", "TypeScript","Laravel","JavaScript"],
    link: "#",
  },
  {
    id: "3",
    title: "Nayapay Website",
    description: "Nayapay Website is a modern, responsive website built using Webflow that effectively showcases the company's services, features, and values to potential customers.",
    image: "/assets/projects/nayapay_website.png",
    technologies: ["Yii2", "Webflow", "PHP", "HTML", "CSS","JavaScript","JQuery"],
    link: "https://nayapay.com/",
  },
  {
    id: "4",
    title: "Abundantly Developed Roots healing Center",
    description: "Abundantly Developed Roots (ADR) is a virtual holistic center, where you are “the center”. Here our experts in various modalities assist you in promoting not only optimal health, but help you to access your innate abilities to heal yourself.",
    image: "/assets/projects/ad_roots.png",
    technologies: ["Laravel", "PHP", "HTML", "CSS","JavaScript","JQuery"],
    link: "https://abundantlydevelopedroots.com/",
  },
  {
    id: "5",
    title: "Born to Build LLC",
    description: "Born to Build LLC is a construction company that specializes in residential and commercial building projects, offering services from initial design to final construction with a focus on quality and customer satisfaction.Services Company In Massachusetts for residential properties. they offer complete construction solutions with our experienced staff of interior designers, carpenters, and electricians.",
    image: "/assets/projects/borntobuild.png",
    technologies: ["Laravel", "PHP", "HTML", "CSS","JavaScript","JQuery","WordPress"],
    link: "https://born2buildllc.com/",
  },
  {
    id: "6",
    title: "Foreverusinlove Social platform",
    description: "A video sharing social platform where users can upload, share, and chat with other users. The platform allows users to find thier partners.",
    image: "/assets/projects/foreverus_in_love.png",
    technologies: ["Laravel", "PHP", "HTML", "CSS","JavaScript","JQuery","WordPress"],
    link: "https://foreverusinlove.com/",
  },
]

export function ProjectsSection() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])

  // Get all unique technologies
  const allTechs = useMemo(() => {
    const techs = new Set<string>()
    PROJECTS.forEach((project) => {
      project.technologies.forEach((tech) => techs.add(tech))
    })
    return Array.from(techs).sort()
  }, [])

  // Filter projects based on selected technologies
  const filteredProjects = useMemo(() => {
    if (selectedTechs.length === 0) return PROJECTS
    return PROJECTS.filter((project) => selectedTechs.some((tech) => project.technologies.includes(tech)))
  }, [selectedTechs])

  const handleTechToggle = (tech: string) => {
    setSelectedTechs((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  const handleClearFilters = () => {
    setSelectedTechs([])
  }

  return (
    <section className={styles.projectsContainer}>
      <div className={styles.projectsWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className="text-6xl dark:bg-gradient-sky text-transparent bg-clip-text dark:font-bold py-4">Featured Projects</h2>
          <p className={styles.subtitle}>Explore my latest work across different technologies and platforms</p>
        </div>

        {/* Tech Filter */}
        <TechFilter
          technologies={allTechs}
          selectedTechs={selectedTechs}
          onTechToggle={handleTechToggle}
          onClearFilters={handleClearFilters}
          projectCount={filteredProjects.length}
        />

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selectedTechs={selectedTechs}
              onTechClick={handleTechToggle}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyStateTitle}>No projects found</p>
            <p className={styles.emptyStateText}>No projects found with the selected technologies</p>
            <button onClick={handleClearFilters} className={styles.resetButton}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
