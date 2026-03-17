export type ProjectTab = "design" | "print" | "motion-video" | "3d" | "email"

export type ProjectSectionId = "active" | "on-hold" | "completed"

export type PriorityLevel = "top" | "high" | "low" | "medium"

export type StatusKind = "in-progress" | "ready-for-review" | "needs-attention"

export type ProjectRow = {
  id: string
  name: string
  subtitle: string
  href?: string
  priority: PriorityLevel
  status: StatusKind
  statusDate: string
  finalDate: string
  highlighted?: boolean
}

export type ProjectSection = {
  id: ProjectSectionId
  label: string
  projectCount: number
  rows: ProjectRow[]
}
