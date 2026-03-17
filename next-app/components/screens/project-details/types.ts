export type ProjectDetailsTab = "brief" | "files" | "ai-summary"

export type ProjectDetailsMessage = {
  id: string
  author: string
  timestamp: string
  body?: string
  bullets?: string[]
}

export type ProjectBriefSection = {
  label: string
  body: string | string[]
}
