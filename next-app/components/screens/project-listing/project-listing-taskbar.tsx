import { PROJECT_TABS } from "./data"
import { ProjectListingIcon } from "./project-listing-icons"
import type { ProjectTab } from "./types"

type ProjectListingTaskbarProps = {
  selectedTab: ProjectTab
  onTabChange: (value: ProjectTab) => void
}

const tabWeight: Record<ProjectTab, "font-medium" | "font-semibold"> = {
  design: "font-medium",
  print: "font-semibold",
  "motion-video": "font-medium",
  "3d": "font-semibold",
  email: "font-medium",
}

export function ProjectListingTaskbar({
  selectedTab,
  onTabChange,
}: ProjectListingTaskbarProps) {
  return (
    <section className="flex min-h-[68px] flex-wrap items-center gap-3 border-b border-border px-3 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <p className="shrink-0 text-[12px] leading-4 font-normal text-muted-foreground">
          Type:
        </p>

        <div className="flex h-9 max-w-full items-center overflow-x-auto rounded-[10px] bg-[var(--pilot-sandal-200)] p-[3px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PROJECT_TABS.map((tab) => {
            const active = selectedTab === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onTabChange(tab.value)}
                className={[
                  "flex h-7 shrink-0 items-center justify-center gap-2 rounded-md px-2 py-1 text-[14px] leading-5 whitespace-nowrap text-card-foreground",
                  tabWeight[tab.value],
                  active
                    ? "border border-transparent bg-white shadow-[var(--pilot-shadow-sm)]"
                    : "",
                ].join(" ")}
              >
                {tab.value === "design" ? (
                  <div className="flex size-4 items-center justify-center">
                    <ProjectListingIcon
                      name="task-brush"
                      className="h-auto w-auto"
                    />
                  </div>
                ) : null}
                {tab.label}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-md px-3 py-[10px] text-[14px] leading-5 font-medium whitespace-nowrap text-card-foreground"
        >
          <div className="flex size-4 items-center justify-center">
            <ProjectListingIcon name="task-file" className="h-auto w-auto" />
          </div>
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
          className="flex h-8 shrink-0 items-center justify-center gap-2 rounded-md border border-[var(--pilot-filter-border)] bg-[var(--pilot-sandal-100)] px-3 py-[10px] text-[12px] leading-4 font-medium whitespace-nowrap text-card-foreground"
        >
          <div className="flex size-4 items-center justify-center">
            <ProjectListingIcon name="task-filter" className="h-auto w-auto" />
          </div>
          Filter
        </button>
      </div>
    </section>
  )
}
