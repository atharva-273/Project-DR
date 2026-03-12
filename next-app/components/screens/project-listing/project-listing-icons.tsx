import Image from "next/image"

import { cn } from "@/lib/utils"

type IconName =
  | "header-search"
  | "header-plus"
  | "task-brush"
  | "task-file"
  | "task-search"
  | "task-filter"
  | "sidebar-panel-left"
  | "sidebar-home"
  | "sidebar-notepad"
  | "sidebar-swatch"
  | "sidebar-users"
  | "sidebar-folder"
  | "sidebar-bot"
  | "sidebar-sparkles"
  | "sidebar-calendar"
  | "sidebar-messages"
  | "sidebar-lightbulb"
  | "sidebar-dollar"
  | "table-chevron-up"
  | "table-chevron-right"
  | "table-info"
  | "table-star"
  | "table-chevron-down-top"
  | "table-chevron-down-high"
  | "table-chevron-down-low"
  | "table-chevron-down-medium"

type IconSpec = {
  src: string
  width: number
  height: number
}

const ICONS: Record<IconName, IconSpec> = {
  "header-search": {
    src: "/pilot/project-listing/icons/header-search.svg",
    width: 13.0001,
    height: 13,
  },
  "header-plus": {
    src: "/pilot/project-listing/icons/header-plus.svg",
    width: 10.6633,
    height: 10.6633,
  },
  "task-brush": {
    src: "/pilot/project-listing/icons/task-brush.svg",
    width: 14.6788,
    height: 14.0147,
  },
  "task-file": {
    src: "/pilot/project-listing/icons/task-file.svg",
    width: 11.9967,
    height: 14.6633,
  },
  "task-search": {
    src: "/pilot/project-listing/icons/task-search.svg",
    width: 13.0001,
    height: 13,
  },
  "task-filter": {
    src: "/pilot/project-listing/icons/task-filter.svg",
    width: 13.33,
    height: 9.33,
  },
  "sidebar-panel-left": {
    src: "/pilot/project-listing/icons/sidebar-panel-left.svg",
    width: 13.5,
    height: 13.5,
  },
  "sidebar-home": {
    src: "/pilot/project-listing/icons/sidebar-home.svg",
    width: 13,
    height: 14.3333,
  },
  "sidebar-notepad": {
    src: "/pilot/project-listing/icons/sidebar-notepad.svg",
    width: 11.6667,
    height: 14.3333,
  },
  "sidebar-swatch": {
    src: "/pilot/project-listing/icons/sidebar-swatch.svg",
    width: 13,
    height: 13,
  },
  "sidebar-users": {
    src: "/pilot/project-listing/icons/sidebar-users.svg",
    width: 14.3334,
    height: 13,
  },
  "sidebar-folder": {
    src: "/pilot/project-listing/icons/sidebar-folder.svg",
    width: 14.3333,
    height: 12.3333,
  },
  "sidebar-bot": {
    src: "/pilot/project-listing/icons/sidebar-bot.svg",
    width: 14.3333,
    height: 11.6667,
  },
  "sidebar-sparkles": {
    src: "/pilot/project-listing/icons/sidebar-sparkles.svg",
    width: 14.3337,
    height: 14.3337,
  },
  "sidebar-calendar": {
    src: "/pilot/project-listing/icons/sidebar-calendar.svg",
    width: 13,
    height: 14.3333,
  },
  "sidebar-messages": {
    src: "/pilot/project-listing/icons/sidebar-messages.svg",
    width: 14.3333,
    height: 14.3333,
  },
  "sidebar-lightbulb": {
    src: "/pilot/project-listing/icons/sidebar-lightbulb.svg",
    width: 9,
    height: 14.3333,
  },
  "sidebar-dollar": {
    src: "/pilot/project-listing/icons/sidebar-dollar.svg",
    width: 9,
    height: 14.3333,
  },
  "table-chevron-up": {
    src: "/pilot/project-listing/icons/table-chevron-up.svg",
    width: 9.33333,
    height: 5.33333,
  },
  "table-chevron-right": {
    src: "/pilot/project-listing/icons/table-chevron-right.svg",
    width: 5.33333,
    height: 9.33333,
  },
  "table-info": {
    src: "/pilot/project-listing/icons/table-info.svg",
    width: 10.9975,
    height: 10.9975,
  },
  "table-star": {
    src: "/pilot/project-listing/icons/table-star.svg",
    width: 11.25,
    height: 10.76,
  },
  "table-chevron-down-top": {
    src: "/pilot/project-listing/icons/table-chevron-down-top.svg",
    width: 7.25,
    height: 4.25,
  },
  "table-chevron-down-high": {
    src: "/pilot/project-listing/icons/table-chevron-down-high.svg",
    width: 7.25,
    height: 4.25,
  },
  "table-chevron-down-low": {
    src: "/pilot/project-listing/icons/table-chevron-down-low.svg",
    width: 7.25,
    height: 4.25,
  },
  "table-chevron-down-medium": {
    src: "/pilot/project-listing/icons/table-chevron-down-medium.svg",
    width: 7.25,
    height: 4.25,
  },
}

type ProjectListingIconProps = {
  name: IconName
  className?: string
  alt?: string
}

export function ProjectListingIcon({
  name,
  className,
  alt = "",
}: ProjectListingIconProps) {
  const icon = ICONS[name]

  return (
    <Image
      src={icon.src}
      alt={alt}
      width={icon.width}
      height={icon.height}
      unoptimized
      className={cn("block shrink-0", className)}
      style={{ width: `${icon.width}px`, height: `${icon.height}px` }}
    />
  )
}
