import type {
  ProjectBriefSection,
  ProjectDetailsMessage,
  ProjectDetailsTab,
} from "./types"

export const PROJECT_DETAILS_TABS: { value: ProjectDetailsTab; label: string }[] = [
  { value: "brief", label: "Brief" },
  { value: "files", label: "Files" },
  { value: "ai-summary", label: "AI Summary" },
]

export const DEFAULT_PROJECT_DETAILS_TAB: ProjectDetailsTab = "brief"

export const PROJECT_DETAILS_MESSAGES: ProjectDetailsMessage[] = [
  {
    id: "message-1",
    author: "Natalie",
    timestamp: "12:35 PM | Today",
    bullets: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. This is a long test message.",
      "Lorem Ipsum is simply dummy text.",
    ],
  },
  {
    id: "message-2",
    author: "Natalie",
    timestamp: "12:35 PM | Today",
    body: "This is a short message",
  },
  {
    id: "message-3",
    author: "Natalie",
    timestamp: "12:35 PM | Today",
    bullets: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. This is a long test message.",
      "Lorem Ipsum is simply dummy text.",
    ],
  },
  {
    id: "message-4",
    author: "Natalie",
    timestamp: "12:35 PM | Today",
    body: "This is a short message",
  },
]

export const PROJECT_DETAILS_ATTACHMENTS = [
  "/pilot/project-details/attachment-1.png",
  "/pilot/project-details/attachment-2.png",
  "/pilot/project-details/attachment-3.png",
  "/pilot/project-details/attachment-4.png",
  "/pilot/project-details/attachment-5.png",
]

export const PROJECT_BRIEF_SECTIONS: ProjectBriefSection[] = [
  {
    label: "Objective",
    body: "Promote the new Ontario-inspired flavour launch with a high-energy story sequence that feels native to Instagram.",
  },
  {
    label: "Audience",
    body: "Young professionals 24–34 in metro cities who enjoy premium snacks and follow foodie creators.",
  },
  {
    label: "Key points to highlight",
    body: [
      "New Muskoka-inspired flavour drop",
      "Limited-time launch window",
      "Swipe-up CTA to product page",
    ],
  },
  {
    label: "Final deliverables",
    body: [
      "New Muskoka-inspired flavour drop",
      "Limited-time launch window",
      "Swipe-up CTA to product page",
    ],
  },
]
