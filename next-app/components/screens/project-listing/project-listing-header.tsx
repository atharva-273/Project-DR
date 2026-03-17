"use client"

import { Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { ProjectListingIcon } from "./project-listing-icons"

type ProjectListingHeaderProps = {
  title: string
}

export function ProjectListingHeader({ title }: ProjectListingHeaderProps) {
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleCreateProject = () => {
    if (isCreatingProject) return
    setIsCreatingProject(true)
    timerRef.current = window.setTimeout(() => {
      setIsCreatingProject(false)
      timerRef.current = null
    }, 850)
  }

  return (
    <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 bg-[var(--pilot-sandal-50)] px-3 py-2.5 sm:px-5">
      <h1 className="w-full text-[16px] leading-none font-medium text-card-foreground sm:w-auto">
        {title}
      </h1>

      <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto sm:flex-none sm:justify-end sm:gap-3">
        <div className="flex h-9 min-w-0 flex-1 items-center justify-between rounded-md border border-input bg-white px-3 py-1 sm:w-[502px] sm:flex-none">
          <span className="text-[12px] leading-4 font-medium text-muted-foreground">
            Search DarkRoast
          </span>
          <div className="flex size-4 items-center justify-center">
            <ProjectListingIcon
              name="header-search"
              className="h-auto w-auto"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={isCreatingProject}
          aria-busy={isCreatingProject}
          onClick={handleCreateProject}
          className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-md bg-[var(--pilot-green-400)] py-[6px] pl-[14px] pr-4 text-[14px] leading-5 font-medium whitespace-nowrap text-[var(--pilot-priority-top-fg)] outline-none transition-all duration-150 ease-out hover:brightness-95 hover:shadow-[var(--pilot-shadow-sm)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
        >
          {isCreatingProject ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <div className="flex size-4 items-center justify-center">
              <ProjectListingIcon name="header-plus" className="h-auto w-auto" />
            </div>
          )}
          {isCreatingProject ? "Creating..." : "New Project"}
        </button>
      </div>
    </header>
  )
}
