"use client"

import { useState } from "react"

import {
  DEFAULT_TAB,
  INITIAL_OPEN_SECTIONS,
  PROJECT_SECTIONS,
} from "./data"
import { ProjectListingHeader } from "./project-listing-header"
import { ProjectListingSidebar } from "./project-listing-sidebar"
import { ProjectListingTable } from "./project-listing-table"
import { ProjectListingTaskbar } from "./project-listing-taskbar"
import type { ProjectSectionId, ProjectTab } from "./types"

export function ProjectListingScreen() {
  const [selectedTab, setSelectedTab] = useState<ProjectTab>(DEFAULT_TAB)
  const [openSections, setOpenSections] = useState(INITIAL_OPEN_SECTIONS)

  const handleToggleSection = (sectionId: ProjectSectionId) => {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }))
  }

  return (
    <div className="flex min-h-svh w-full min-w-0 overflow-x-hidden bg-[var(--pilot-sandal-25)]">
      <ProjectListingSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <ProjectListingHeader title="Projects" />
        <ProjectListingTaskbar
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />

        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-4 sm:px-5 sm:py-5">
          <ProjectListingTable
            sections={PROJECT_SECTIONS}
            openSections={openSections}
            onToggleSection={handleToggleSection}
          />
        </main>
      </div>
    </div>
  )
}
