import type { ProjectSection, ProjectSectionId, ProjectTab } from "./types"

export const PROJECT_TABS: { value: ProjectTab; label: string }[] = [
  { value: "design", label: "Design" },
  { value: "print", label: "Print" },
  { value: "motion-video", label: "Motion/Video" },
  { value: "3d", label: "3D" },
  { value: "email", label: "Email" },
]

export const DEFAULT_TAB: ProjectTab = "design"

export const INITIAL_OPEN_SECTIONS: Record<ProjectSectionId, boolean> = {
  active: true,
  "on-hold": false,
  completed: false,
}

export const PROJECT_SECTIONS: ProjectSection[] = [
  {
    id: "active",
    label: "Active",
    projectCount: 3,
    rows: [
      {
        id: "t-shirt-printing",
        name: "T-shirt printing",
        subtitle: "Aayushi updated something at 2:30 pm",
        priority: "top",
        status: "in-progress",
        statusDate: "Thu 15 Mar",
        finalDate: "Sun 05 Sep",
        highlighted: true,
      },
      {
        id: "tote-bag-design-1",
        name: "Tote bag design",
        subtitle: "Sunsets glow, memories linger.",
        priority: "high",
        status: "ready-for-review",
        statusDate: "Sun 18 Mar",
        finalDate: "Mon 15 May",
      },
      {
        id: "printable-greeting-cards",
        name: "Printable greeting cards",
        subtitle: "Mountains call, spirits soar",
        priority: "low",
        status: "in-progress",
        statusDate: "Thu 15 Mar",
        finalDate: "Mon 15 May",
      },
      {
        id: "tote-bag-design-2",
        name: "Tote bag design",
        subtitle: "Sunsets glow, memories linger.",
        priority: "medium",
        status: "needs-attention",
        statusDate: "Thu 15 Mar",
        finalDate: "Tue 10 Aug",
      },
    ],
  },
  {
    id: "on-hold",
    label: "On Hold",
    projectCount: 3,
    rows: [],
  },
  {
    id: "completed",
    label: "Completed",
    projectCount: 3,
    rows: [],
  },
]

export const SIDEBAR_MENU = {
  primary: [
    "Activity Feed",
    "Projects",
    "Brand Profiles",
    "Team",
    "Files",
    "AI Create",
    "DAX",
  ],
  support: ["Book a Call", "Talk to Support"],
  footerLinks: ["Project Ideas", "Refer a Friend"],
}
