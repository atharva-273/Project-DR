import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { SIDEBAR_MENU } from "./data"
import { ProjectListingIcon } from "./project-listing-icons"

type SidebarItemProps = {
  label: string
  iconName:
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
  active?: boolean
  href?: string
}

function SidebarItem({ label, iconName, active = false, href }: SidebarItemProps) {
  const itemClassName = cn(
    "flex w-full items-center justify-center gap-0 rounded-md px-1 py-[14px] text-left text-[14px] leading-none text-white outline-none transition-[background-color,transform] duration-150 ease-out sm:px-2 xl:justify-start xl:gap-2 xl:px-2",
    "focus-visible:ring-2 focus-visible:ring-[var(--pilot-focus-ring)]",
    active
      ? "bg-[var(--pilot-sidebar-active)] font-medium"
      : "font-normal hover:bg-[var(--pilot-sidebar-active)] hover:translate-x-[1px] active:scale-[0.99]"
  )

  const content = (
    <>
      <div className="flex size-4 items-center justify-center">
        <ProjectListingIcon name={iconName} className="h-auto w-auto" />
      </div>
      <span className="hidden truncate xl:block">{label}</span>
    </>
  )

  if (href) {
    return (
      <Link href={href} aria-label={label} className={itemClassName}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      aria-label={label}
      className={itemClassName}
    >
      {content}
    </button>
  )
}

const iconMap: Record<
  string,
  SidebarItemProps["iconName"]
> = {
  "Activity Feed": "sidebar-home",
  Projects: "sidebar-notepad",
  "Brand Profiles": "sidebar-swatch",
  Team: "sidebar-users",
  Files: "sidebar-folder",
  "AI Create": "sidebar-bot",
  DAX: "sidebar-sparkles",
  "Book a Call": "sidebar-calendar",
  "Talk to Support": "sidebar-messages",
  "Project Ideas": "sidebar-lightbulb",
  "Refer a Friend": "sidebar-dollar",
}

const primaryHrefMap: Partial<Record<string, string>> = {
  "Activity Feed": "/activity-feed",
  Projects: "/projects",
}

type ProjectListingSidebarProps = {
  activePrimaryItem?: string
}

export function ProjectListingSidebar({
  activePrimaryItem = "Projects",
}: ProjectListingSidebarProps) {
  return (
    <aside className="flex min-h-svh w-16 shrink-0 flex-col justify-between bg-[var(--pilot-sidebar-bg)] text-white sm:w-20 xl:w-64">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between px-2 py-4 sm:px-3 xl:px-4 xl:py-5">
          <Image
            src="/pilot/project-listing/logo.png"
            alt="DarkRoast"
            width={144}
            height={23}
            className="hidden h-[23px] w-[144px] object-contain object-left xl:block"
          />
          <span className="px-1 text-sm leading-none font-semibold xl:hidden">
            DR
          </span>
          <button
            type="button"
            className="rounded-md p-0.5 text-white outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-[var(--pilot-sidebar-active)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--pilot-focus-ring)]"
            aria-label="Toggle sidebar"
          >
            <div className="flex size-4 items-center justify-center">
              <ProjectListingIcon
                name="sidebar-panel-left"
                className="h-auto w-auto"
              />
            </div>
          </button>
        </div>

        <div className="min-h-0 flex-1">
          <div className="border-b-[0.5px] border-[var(--pilot-sidebar-divider)] px-1 pb-2 sm:px-2 sm:pb-3 xl:px-3">
            {SIDEBAR_MENU.primary.map((item) => (
              <SidebarItem
                key={item}
                label={item}
                iconName={iconMap[item]}
                active={item === activePrimaryItem}
                href={primaryHrefMap[item]}
              />
            ))}
          </div>

          <div className="border-b-[0.5px] border-[var(--pilot-sidebar-divider)] px-1 py-2 sm:px-2 sm:py-3 xl:px-3">
            {SIDEBAR_MENU.support.map((item) => (
              <SidebarItem
                key={item}
                label={item}
                iconName={iconMap[item]}
              />
            ))}
          </div>

          <div className="border-b-[0.5px] border-[var(--pilot-sidebar-divider)] px-1 py-2 sm:px-2 sm:py-3 xl:px-3">
            {SIDEBAR_MENU.footerLinks.map((item) => (
              <SidebarItem
                key={item}
                label={item}
                iconName={iconMap[item]}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 pb-3 pt-0">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-0 rounded-md p-2 text-left text-white outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-[var(--pilot-sidebar-active)] active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[var(--pilot-focus-ring)] xl:justify-start xl:gap-2"
        >
          <Image
            src="/pilot/project-listing/footer-avatar.png"
            alt="Trev Scott"
            width={32}
            height={32}
            className="size-8 rounded-[10px] object-cover"
          />
          <div className="hidden min-w-0 xl:block">
            <p className="truncate text-[14px] font-semibold leading-none">Trev Scott</p>
            <p className="truncate pt-0.5 text-[12px] leading-none text-white">
              TrevCo Snacks
            </p>
          </div>
        </button>
      </div>
    </aside>
  )
}
