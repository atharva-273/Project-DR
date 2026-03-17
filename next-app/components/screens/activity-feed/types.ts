export type ActivityFeedTab = "huddle-board" | "notifications"

export type ActivityMessageKind = "numbered" | "short" | "attachment"

export type ActivityMessage = {
  id: string
  kind: ActivityMessageKind
  author: string
  timestamp: string
  content?: string
  numberedParagraphs?: string[]
  attachments?: string[]
  attachmentCaption?: string
}

export type DueWeekItem = {
  id: string
  title: string
  subtitle: string
  badgeLabel: string
  detailsLabel: string
  detailsHref: string
  highlighted?: boolean
}
