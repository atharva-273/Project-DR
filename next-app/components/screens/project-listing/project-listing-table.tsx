import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { ProjectListingIcon } from "./project-listing-icons"
import type {
  PriorityLevel,
  ProjectRow,
  ProjectSection,
  ProjectSectionId,
  StatusKind,
} from "./types"

type ProjectListingTableProps = {
  sections: ProjectSection[]
  openSections: Record<ProjectSectionId, boolean>
  onToggleSection: (sectionId: ProjectSectionId) => void
}

const STATUS_STYLES: Record<
  StatusKind,
  {
    label: string
    labelClass: string
    trackClass: string
    progress: string
  }
> = {
  "in-progress": {
    label: "In progress",
    labelClass: "text-[var(--pilot-status-blue)]",
    trackClass: "bg-[var(--pilot-status-blue-track)]",
    progress: "75%",
  },
  "ready-for-review": {
    label: "Ready for review",
    labelClass: "text-[var(--pilot-status-green)]",
    trackClass: "bg-[var(--pilot-status-green)]",
    progress: "100%",
  },
  "needs-attention": {
    label: "Needs attention",
    labelClass: "text-[var(--pilot-status-red)]",
    trackClass: "bg-[var(--pilot-status-red)]",
    progress: "100%",
  },
}

const PRIORITY_STYLES: Record<
  PriorityLevel,
  {
    label: string
    className: string
    iconName:
      | "table-chevron-down-top"
      | "table-chevron-down-high"
      | "table-chevron-down-low"
      | "table-chevron-down-medium"
    showStar?: boolean
  }
> = {
  top: {
    label: "Top",
    className:
      "bg-[var(--pilot-priority-top-bg)] text-[var(--pilot-priority-top-fg)] border-transparent",
    iconName: "table-chevron-down-top",
    showStar: true,
  },
  high: {
    label: "High",
    className:
      "bg-[var(--pilot-priority-high-bg)] text-[var(--pilot-priority-high-fg)] border-[var(--pilot-priority-high-border)]",
    iconName: "table-chevron-down-high",
  },
  low: {
    label: "Low",
    className:
      "bg-[var(--pilot-priority-low-bg)] text-[var(--pilot-priority-low-fg)] border-[var(--pilot-priority-low-border)]",
    iconName: "table-chevron-down-low",
  },
  medium: {
    label: "Medium",
    className:
      "bg-[var(--pilot-priority-medium-bg)] text-[var(--pilot-priority-medium-fg)] border-[var(--pilot-priority-medium-border)]",
    iconName: "table-chevron-down-medium",
  },
}

function PriorityBadge({ priority }: { priority: PriorityLevel }) {
  const style = PRIORITY_STYLES[priority]

  return (
    <div
      className={cn(
        "inline-flex h-7 items-center justify-center gap-1 rounded-md border px-3 py-1.5 text-[12px] leading-4",
        priority === "top" ? "font-semibold" : "font-medium",
        style.className
      )}
    >
      {style.showStar ? (
        <div className="flex size-3 items-center justify-center">
          <ProjectListingIcon name="table-star" className="h-auto w-auto" />
        </div>
      ) : null}
      <span>{style.label}</span>
      <div className="flex size-3 items-center justify-center">
        <ProjectListingIcon name={style.iconName} className="h-auto w-auto" />
      </div>
    </div>
  )
}

function StatusProgressBar({
  status,
  statusDate,
}: {
  status: StatusKind
  statusDate: string
}) {
  const style = STATUS_STYLES[status]

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between text-[12px] leading-4">
        <span className={cn("font-medium", style.labelClass)}>{style.label}</span>
        <span className="text-muted-foreground">{statusDate}</span>
      </div>
      <div className="h-1 w-full rounded-full bg-[var(--pilot-sandal-200)]">
        <div
          className={cn("h-1 rounded-full", style.trackClass)}
          style={{ width: style.progress }}
        />
      </div>
    </div>
  )
}

function DesignerStack() {
  return (
    <div className="flex items-center justify-center pl-3 pr-5">
      <div className="flex">
        <div className="relative mr-[-8px] size-6 overflow-hidden rounded-full border-2 border-white bg-muted">
          <Image
            src="/pilot/project-listing/table-avatar-1.png"
            alt="Designer 1"
            width={24}
            height={24}
            className="size-full object-cover"
          />
        </div>
        <div className="relative mr-[-8px] size-6 overflow-hidden rounded-full border-2 border-white bg-muted">
          <Image
            src="/pilot/project-listing/table-avatar-2.png"
            alt="Designer 2"
            width={24}
            height={24}
            className="size-full object-cover"
          />
        </div>
        <div className="mr-[-8px] flex size-6 items-center justify-center rounded-full border-2 border-white bg-[var(--pilot-sandal-100)] text-[18px] leading-7 text-muted-foreground">
          +
        </div>
      </div>
    </div>
  )
}

function SectionToggleRow({
  section,
  isOpen,
  onToggle,
}: {
  section: ProjectSection
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-md px-1 py-2 text-left outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-[var(--pilot-neutral-alpha)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-[var(--pilot-focus-ring)]"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={`${section.label} section`}
    >
      <div className="flex size-4 items-center justify-center">
        <ProjectListingIcon
          name={isOpen ? "table-chevron-up" : "table-chevron-right"}
          className="h-auto w-auto"
        />
      </div>
      <span className="text-base leading-none font-medium text-card-foreground">
        {section.label}
      </span>
      <span className="text-[12px] leading-4 text-muted-foreground">
        {section.projectCount} projects
      </span>
      <div className="flex size-3 items-center justify-center">
        <ProjectListingIcon name="table-info" className="h-auto w-auto" />
      </div>
    </button>
  )
}

function HeaderCell({
  align = "left",
  children,
}: {
  align?: "left" | "center"
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex h-10 items-center border-b border-border bg-[var(--pilot-neutral-alpha)] px-3 text-[14px] leading-5 font-medium text-muted-foreground",
        align === "center" ? "justify-center text-center" : ""
      )}
    >
      {children}
    </div>
  )
}

function ActiveProjectsTable({ rows }: { rows: ProjectRow[] }) {
  const columnTemplate = {
    gridTemplateColumns: "2.2273fr 1fr 2.6364fr 1.5909fr 0.9697fr",
  } as const

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-full min-w-[1144px] items-stretch gap-2">
        <Image
          src="/pilot/project-listing/left-gutter.svg"
          alt=""
          aria-hidden="true"
          width={24}
          height={296}
          unoptimized
          className="h-[296px] w-6 shrink-0"
        />
        <div className="min-w-[1112px] flex-1 overflow-hidden rounded-[6px]">
          <div className="grid w-full" style={columnTemplate}>
            <HeaderCell>Project Name</HeaderCell>
            <HeaderCell>Priority</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell align="center">
              Final Date
            </HeaderCell>
            <HeaderCell align="center">
              Designer
            </HeaderCell>
          </div>

          {rows.map((row) => (
            <div
              key={row.id}
              className={cn(
                "grid h-16 border-b border-border",
                row.highlighted ? "bg-[var(--pilot-row-highlight)]" : ""
              )}
              style={columnTemplate}
            >
              <div className="flex min-w-0 items-center px-3 py-3">
                {row.href ? (
                  <Link
                    href={row.href}
                    className="group block min-w-0 rounded-sm outline-none transition-opacity duration-150 ease-out hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[var(--pilot-focus-ring)]"
                    aria-label={`Open ${row.name}`}
                  >
                    <p className="truncate text-[14px] leading-none font-semibold text-card-foreground">
                      {row.name}
                    </p>
                    <p className="truncate pt-1 text-[12px] leading-4 text-muted-foreground">
                      {row.subtitle}
                    </p>
                  </Link>
                ) : (
                  <div className="min-w-0">
                    <p className="truncate text-[14px] leading-none font-semibold text-card-foreground">
                      {row.name}
                    </p>
                    <p className="truncate pt-1 text-[12px] leading-4 text-muted-foreground">
                      {row.subtitle}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center px-3 py-2">
                <PriorityBadge priority={row.priority} />
              </div>

              <div className="flex items-center px-3 py-[6px]">
                <StatusProgressBar status={row.status} statusDate={row.statusDate} />
              </div>

              <div className="flex items-center justify-center px-6 py-2 text-[12px] leading-4 font-medium whitespace-nowrap text-card-foreground">
                {row.finalDate}
              </div>

              <div className="flex items-center justify-center px-6 py-2">
                <DesignerStack />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectListingTable({
  sections,
  openSections,
  onToggleSection,
}: ProjectListingTableProps) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-2">
      {sections.map((section) => {
        const isOpen = openSections[section.id]

        return (
          <div key={section.id} className="flex flex-col gap-2 rounded-md">
            <SectionToggleRow
              section={section}
              isOpen={isOpen}
              onToggle={() => onToggleSection(section.id)}
            />
            {section.id === "active" && isOpen ? (
              <ActiveProjectsTable rows={section.rows} />
            ) : null}
          </div>
        )
      })}
    </section>
  )
}
