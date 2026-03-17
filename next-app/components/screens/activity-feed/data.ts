import type { ActivityFeedTab, ActivityMessage, DueWeekItem } from "./types"

export const ACTIVITY_TABS: { value: ActivityFeedTab; label: string }[] = [
  { value: "huddle-board", label: "Huddle Board" },
  { value: "notifications", label: "Notifications" },
]

export const DEFAULT_ACTIVITY_TAB: ActivityFeedTab = "huddle-board"

export const ACTIVITY_MESSAGES: ActivityMessage[] = [
  {
    id: "message-1",
    kind: "numbered",
    author: "Natalie",
    timestamp: "12:35 PM | Today",
    numberedParagraphs: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. This is a long test message.",
      "Lorem Ipsum is simply dummy text.",
    ],
  },
  {
    id: "message-2",
    kind: "short",
    author: "Natalie",
    timestamp: "12:35 PM | Today",
    content: "This is a short message",
  },
  {
    id: "message-3",
    kind: "numbered",
    author: "Natalie",
    timestamp: "12:35 PM | Today",
    numberedParagraphs: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. This is a long test message.",
      "Lorem Ipsum is simply dummy text.",
    ],
  },
  {
    id: "message-4",
    kind: "attachment",
    author: "Natalie",
    timestamp: "12:35 PM | Today",
    attachments: [
      "/pilot/activity-feed/attachment-1.png",
      "/pilot/activity-feed/attachment-2.png",
      "/pilot/activity-feed/attachment-3.png",
      "/pilot/activity-feed/attachment-4.png",
      "/pilot/activity-feed/attachment-5.png",
      "/pilot/activity-feed/attachment-3.png",
      "/pilot/activity-feed/attachment-3.png",
    ],
    attachmentCaption: "This is a file attachment",
  },
]

export const DUE_WEEK_ITEMS: DueWeekItem[] = [
  {
    id: "tile-graphics",
    title: "Tile Graphics",
    subtitle: "Ashley Frank sent a message on Thursday 29 Jan, 2026",
    badgeLabel: "First Draft Date | 27 Feb",
    detailsLabel: "Project Details",
    detailsHref: "/projects/tote-bag-design",
    highlighted: true,
  },
  {
    id: "krave-pdps",
    title: "Krave PDPs",
    subtitle: "Allie Robino sent a message on Thursday 29 Jan, 2026",
    badgeLabel: "Final Due Date | 27 Feb",
    detailsLabel: "Project Details",
    detailsHref: "/projects/tote-bag-design",
  },
  {
    id: "lady-bird-sheet",
    title: "Lady Bird New Sell Sheet",
    subtitle: "1 new file uploaded on 22 Feb, 2026",
    badgeLabel: "First Draft Date | 27 Feb",
    detailsLabel: "Project Details",
    detailsHref: "/projects/tote-bag-design",
  },
]
