"use client"

import { Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { PROJECT_TABS } from "./data"
import { ProjectListingIcon } from "./project-listing-icons"
import type { ProjectTab } from "./types"

type ProjectListingTaskbarProps = {
  selectedTab: ProjectTab
  onTabChange: (value: ProjectTab) => void
}

const ACTIVE_TAB_ICON: Record<
  ProjectTab,
  "task-brush" | "task-printer" | "task-square-play" | "task-box" | "task-mail"
> = {
  design: "task-brush",
  print: "task-printer",
  "motion-video": "task-square-play",
  "3d": "task-box",
  email: "task-mail",
}

export function ProjectListingTaskbar({
  selectedTab,
  onTabChange,
}: ProjectListingTaskbarProps) {
  const [pendingTab, setPendingTab] = useState<ProjectTab | null>(null)
  const [isDraftsLoading, setIsDraftsLoading] = useState(false)
  const [isFilterLoading, setIsFilterLoading] = useState(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const triggerLoading = (setter: (value: boolean) => void, duration = 700) => {
    setter(true)
    const timer = window.setTimeout(() => setter(false), duration)
    timersRef.current.push(timer)
  }

  const handleTabChange = (tab: ProjectTab) => {
    if (tab === selectedTab || pendingTab) return
    setPendingTab(tab)
    onTabChange(tab)
    const timer = window.setTimeout(() => setPendingTab(null), 350)
    timersRef.current.push(timer)
  }

  const isTabLoading = pendingTab !== null

  return (
    <section className="flex min-h-[68px] flex-wrap items-center gap-3 border-b border-border px-3 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <p className="shrink-0 text-[12px] leading-4 font-normal text-muted-foreground">
          Type:
        </p>

        <div className="flex h-9 max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-[var(--pilot-sandal-200)] p-[3px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PROJECT_TABS.map((tab) => {
            const active = selectedTab === tab.value
            const activeIconName = ACTIVE_TAB_ICON[tab.value]
            return (
              <button
                key={tab.value}
                type="button"
                disabled={isTabLoading}
                onClick={() => handleTabChange(tab.value)}
                aria-busy={pendingTab === tab.value}
                className={[
                  "flex h-7 shrink-0 items-center justify-center gap-2 rounded-md px-2 py-1 text-[14px] leading-5 font-medium whitespace-nowrap text-card-foreground outline-none transition-all duration-150 ease-out focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
                  active
                    ? "border border-transparent bg-white shadow-[var(--pilot-shadow-sm)] hover:bg-white"
                    : "hover:bg-white/70",
                ].join(" ")}
              >
                {pendingTab === tab.value ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : null}
                {active && pendingTab !== tab.value ? (
                  <div className="flex size-4 items-center justify-center">
                    <ProjectListingIcon name={activeIconName} className="h-auto w-auto" />
                  </div>
                ) : null}
                {tab.label}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          disabled={isDraftsLoading}
          aria-busy={isDraftsLoading}
          onClick={() => triggerLoading(setIsDraftsLoading)}
          className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-md px-3 py-[10px] text-[14px] leading-5 font-medium whitespace-nowrap text-card-foreground outline-none transition-all duration-150 ease-out hover:bg-[var(--pilot-sandal-100)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
        >
          {isDraftsLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <div className="flex size-4 items-center justify-center">
              <ProjectListingIcon name="task-file" className="h-auto w-auto" />
            </div>
          )}
          Drafts
        </button>
      </div>

      <div className="ml-auto flex w-full min-w-0 items-center gap-3 sm:w-auto sm:flex-none sm:gap-4">
        <div className="flex h-9 min-w-0 flex-1 items-center justify-between rounded-md border border-input bg-white px-3 py-2 sm:w-[226px] sm:flex-none">
          <span className="text-[12px] leading-4 font-medium text-muted-foreground">
            Search in project
          </span>
          <div className="flex size-4 items-center justify-center">
            <ProjectListingIcon name="task-search" className="h-auto w-auto" />
          </div>
        </div>

        <button
          type="button"
          disabled={isFilterLoading}
          aria-busy={isFilterLoading}
          onClick={() => triggerLoading(setIsFilterLoading)}
          className="flex h-8 shrink-0 items-center justify-center gap-2 rounded-md border border-[var(--pilot-filter-border)] bg-[var(--pilot-sandal-100)] px-3 py-[10px] text-[12px] leading-4 font-medium whitespace-nowrap text-card-foreground outline-none transition-all duration-150 ease-out hover:bg-[var(--pilot-sandal-200)] hover:shadow-[var(--pilot-shadow-sm)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
        >
          {isFilterLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <div className="flex size-4 items-center justify-center">
              <ProjectListingIcon name="task-filter" className="h-auto w-auto" />
            </div>
          )}
          Filter
        </button>
      </div>
    </section>
  )
}
