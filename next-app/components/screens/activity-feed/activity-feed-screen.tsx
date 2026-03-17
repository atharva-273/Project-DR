"use client"

import {
  ArrowLeft,
  ArrowRight,
  Bold,
  ChevronDown,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  MessageSquareText,
  Mic,
  Paperclip,
  Smile,
  Sun,
  Underline,
  Video,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { type ReactNode, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import {
  ACTIVITY_MESSAGES,
  ACTIVITY_TABS,
  DEFAULT_ACTIVITY_TAB,
  DUE_WEEK_ITEMS,
} from "./data"
import { ProjectListingIcon } from "../project-listing/project-listing-icons"
import { ProjectListingSidebar } from "../project-listing/project-listing-sidebar"
import type { ActivityFeedTab, ActivityMessage, DueWeekItem } from "./types"

const SHADCN_INTERACTION =
  "outline-none transition-all duration-150 ease-out focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"

function AvatarGroup() {
  return (
    <div className="flex items-center pr-2">
      <Image
        src="/pilot/activity-feed/due-avatar-1.png"
        alt="Collaborator 1"
        width={20}
        height={20}
        className="mr-[-8px] size-5 rounded-full border-2 border-white object-cover"
      />
      <Image
        src="/pilot/activity-feed/due-avatar-2.png"
        alt="Collaborator 2"
        width={20}
        height={20}
        className="mr-[-8px] size-5 rounded-full border-2 border-white object-cover"
      />
      <Image
        src="/pilot/activity-feed/due-avatar-3.png"
        alt="Collaborator 3"
        width={20}
        height={20}
        className="mr-[-8px] size-5 rounded-full border-2 border-white object-cover"
      />
      <div className="mr-[-8px] flex size-5 items-center justify-center rounded-full border-2 border-white bg-muted text-[12px] leading-4 text-card-foreground">
        MW
      </div>
      <div className="mr-[-8px] flex size-5 items-center justify-center rounded-full border-2 border-white bg-muted text-[12px] leading-4 text-card-foreground">
        SD
      </div>
    </div>
  )
}

function ActivityMessageRow({ message }: { message: ActivityMessage }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Image
        src="/pilot/activity-feed/message-avatar.png"
        alt={message.author}
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 leading-none">
          <p className="text-[16px] font-medium text-card-foreground">{message.author}</p>
          <p className="text-[12px] text-muted-foreground">{message.timestamp}</p>
        </div>

        {message.kind === "short" ? (
          <p className="pt-1 text-[14px] leading-5 text-card-foreground">{message.content}</p>
        ) : null}

        {message.kind === "numbered" ? (
          <div className="flex items-start gap-2 pt-1">
            <span className="w-6 shrink-0 text-right text-[14px] leading-5 text-card-foreground">
              1.
            </span>
            <div className="min-w-0 text-[14px] leading-5 text-card-foreground">
              {message.numberedParagraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : null}

        {message.kind === "attachment" ? (
          <>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {message.attachments?.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  aria-label={`Open attachment ${index + 1}`}
                  className={cn(
                    "shrink-0 overflow-hidden rounded-sm border border-border",
                    SHADCN_INTERACTION,
                    "hover:brightness-95"
                  )}
                >
                  <Image
                    src={src}
                    alt={`Attachment ${index + 1}`}
                    width={84}
                    height={84}
                    className="size-[84px] object-cover"
                  />
                </button>
              ))}
            </div>
            <p className="pt-2 text-[14px] leading-5 text-card-foreground">
              {message.attachmentCaption}
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}

function ToolbarButton({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:bg-[var(--pilot-sandal-100)] hover:text-card-foreground",
        SHADCN_INTERACTION
      )}
    >
      {children}
    </button>
  )
}

function DueWeekRow({ item, bordered = false }: { item: DueWeekItem; bordered?: boolean }) {
  return (
    <div className={cn("space-y-3", bordered ? "border-t border-border pt-6" : "")}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] leading-none font-medium text-card-foreground">
            {item.title}
          </p>
          <p className="pt-1 text-[12px] leading-4 text-muted-foreground">{item.subtitle}</p>
        </div>
        <AvatarGroup />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-7 items-center rounded-md bg-[var(--pilot-sandal-100)] px-3 text-[12px] leading-4 font-medium text-card-foreground">
          {item.badgeLabel}
        </span>

        <Link
          href={item.detailsHref}
          className={cn(
            "inline-flex items-center gap-2 rounded-md text-[14px] leading-5 font-semibold",
            SHADCN_INTERACTION,
            item.highlighted
              ? "text-[var(--pilot-green-400)] hover:text-[var(--pilot-priority-top-bg)]"
              : "text-card-foreground hover:text-[var(--pilot-green-400)]"
          )}
        >
          {item.detailsLabel}
          {item.highlighted ? <ArrowRight className="size-4" /> : null}
        </Link>
      </div>
    </div>
  )
}

export function ActivityFeedScreen() {
  const [selectedTab, setSelectedTab] = useState<ActivityFeedTab>(DEFAULT_ACTIVITY_TAB)
  const [pendingTab, setPendingTab] = useState<ActivityFeedTab | null>(null)
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const registerTimer = (callback: () => void, duration = 700) => {
    const timer = window.setTimeout(callback, duration)
    timersRef.current.push(timer)
  }

  const handleTabChange = (tab: ActivityFeedTab) => {
    if (tab === selectedTab || pendingTab) return
    setPendingTab(tab)
    setSelectedTab(tab)
    registerTimer(() => setPendingTab(null), 300)
  }

  const handleCreateProject = () => {
    if (isCreatingProject) return
    setIsCreatingProject(true)
    registerTimer(() => setIsCreatingProject(false), 850)
  }

  const handleSend = () => {
    if (isSending) return
    setIsSending(true)
    registerTimer(() => setIsSending(false), 850)
  }

  return (
    <div className="flex min-h-svh w-full min-w-0 overflow-x-hidden bg-[var(--pilot-sandal-25)]">
      <ProjectListingSidebar activePrimaryItem="Activity Feed" />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-[60px] flex-wrap items-center justify-between gap-3 border-b border-border bg-[var(--pilot-sandal-25)] px-3 py-3 sm:px-6">
          <h1 className="inline-flex items-center gap-1.5 text-[18px] leading-7 font-semibold text-card-foreground">
            <Sun className="size-4 fill-[var(--pilot-priority-low-fg)] text-[var(--pilot-priority-low-fg)]" />
            Good afternoon, Tcules
          </h1>

          <div className="ml-auto flex w-full min-w-0 items-center gap-3 sm:w-auto sm:flex-none">
            <div className="flex h-9 min-w-0 flex-1 items-center justify-between rounded-md border border-input bg-white px-3 sm:w-[440px] sm:flex-none">
              <span className="truncate text-[12px] leading-4 font-medium text-muted-foreground">
                Search DarkRoast
              </span>
              <div className="flex size-4 items-center justify-center">
                <ProjectListingIcon name="header-search" className="h-auto w-auto" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreateProject}
              disabled={isCreatingProject}
              aria-busy={isCreatingProject}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded-md bg-[var(--pilot-priority-top-bg)] py-[6px] pl-[14px] pr-4 text-[14px] leading-5 font-medium whitespace-nowrap text-[var(--pilot-priority-top-fg)] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:brightness-95",
                SHADCN_INTERACTION
              )}
            >
              {isCreatingProject ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <div className="flex size-4 items-center justify-center">
                  <ProjectListingIcon name="header-plus" className="h-auto w-auto" />
                </div>
              )}
              {isCreatingProject ? "Creating..." : "New Project"}
            </button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-hidden px-3 py-3 sm:px-5 sm:py-4">
          <div className="grid h-full min-h-0 min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_480px]">
            <section className="flex min-h-0 min-w-0 flex-col gap-2">
              <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-md border border-border bg-white p-4">
                <div className="inline-flex h-9 w-fit items-center gap-1 rounded-[10px] bg-[var(--pilot-sandal-200)] p-[3px]">
                  {ACTIVITY_TABS.map((tab) => {
                    const active = selectedTab === tab.value

                    return (
                      <button
                        key={tab.value}
                        type="button"
                        disabled={pendingTab !== null}
                        aria-busy={pendingTab === tab.value}
                        onClick={() => handleTabChange(tab.value)}
                        className={cn(
                          "inline-flex h-7 items-center gap-2 rounded-md px-2 text-[14px] leading-5 text-card-foreground",
                          SHADCN_INTERACTION,
                          active
                            ? "border border-transparent bg-[var(--pilot-sandal-25)] font-semibold shadow-[var(--pilot-shadow-sm)]"
                            : "font-medium hover:bg-white/70"
                        )}
                      >
                        {pendingTab === tab.value ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : null}
                        {active && tab.value === "huddle-board" ? (
                          <div className="flex size-4 items-center justify-center">
                            <MessageSquareText className="size-4" />
                          </div>
                        ) : null}
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
                  {selectedTab === "huddle-board" ? (
                    <>
                      <ActivityMessageRow message={ACTIVITY_MESSAGES[0]} />
                      <ActivityMessageRow message={ACTIVITY_MESSAGES[1]} />

                      <div className="flex items-center gap-3 py-4">
                        <div className="h-px flex-1 bg-border" />
                        <button
                          type="button"
                          className={cn(
                            "inline-flex items-center gap-1 rounded-4xl bg-[var(--pilot-sandal-100)] py-1 pl-3 pr-1.5 text-[12px] leading-4 font-medium text-card-foreground hover:bg-[var(--pilot-sandal-200)]",
                            SHADCN_INTERACTION
                          )}
                        >
                          Today
                          <ChevronDown className="size-3" />
                        </button>
                        <div className="h-px flex-1 bg-border" />
                      </div>

                      <ActivityMessageRow message={ACTIVITY_MESSAGES[2]} />
                      <ActivityMessageRow message={ACTIVITY_MESSAGES[3]} />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-md border border-dashed border-[var(--pilot-sandal-300)] p-6 text-[14px] text-muted-foreground">
                      Notifications feed will appear here.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-md border border-border bg-white">
                <div className="flex items-center gap-4 border-b border-border px-3 py-3 text-muted-foreground">
                  <button
                    type="button"
                    aria-label="Insert"
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full bg-[var(--pilot-sandal-100)] text-[12px] hover:bg-[var(--pilot-sandal-200)]",
                      SHADCN_INTERACTION
                    )}
                  >
                    +
                  </button>

                  <ToolbarButton label="Emoji">
                    <Smile className="size-4" />
                  </ToolbarButton>

                  <div className="h-4 w-px bg-border" />

                  <ToolbarButton label="Bold">
                    <Bold className="size-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Italic">
                    <Italic className="size-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Underline">
                    <Underline className="size-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Text options">
                    <ChevronDown className="size-3.5" />
                  </ToolbarButton>
                  <ToolbarButton label="Link">
                    <Link2 className="size-4" />
                  </ToolbarButton>

                  <div className="h-4 w-px bg-border" />

                  <ToolbarButton label="Bulleted list">
                    <List className="size-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Numbered list">
                    <ListOrdered className="size-4" />
                  </ToolbarButton>

                  <div className="h-4 w-px bg-border" />

                  <ToolbarButton label="Attach file">
                    <Paperclip className="size-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Voice note">
                    <Mic className="size-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Video message">
                    <Video className="size-4" />
                  </ToolbarButton>
                </div>

                <div className="flex items-center justify-between px-3 py-2.5">
                  <p className="text-[14px] leading-5 text-muted-foreground">
                    What&apos;s on your mind?
                  </p>
                  <button
                    type="button"
                    aria-label="Send message"
                    onClick={handleSend}
                    disabled={isSending}
                    aria-busy={isSending}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-md bg-[var(--pilot-green-400)] text-[var(--pilot-priority-top-fg)] hover:brightness-95",
                      SHADCN_INTERACTION
                    )}
                  >
                    {isSending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <ArrowRight className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </section>

            <aside className="flex min-h-0 min-w-0 flex-col gap-4">
              <section className="flex min-h-0 flex-[402] flex-col rounded-md border border-border bg-white p-4">
                <h2 className="text-[18px] leading-7 font-semibold text-card-foreground">
                  Due this week:
                </h2>
                <div className="mt-6 min-h-0 space-y-6 overflow-y-auto">
                  <DueWeekRow item={DUE_WEEK_ITEMS[0]} />
                  <DueWeekRow item={DUE_WEEK_ITEMS[1]} bordered />
                  <DueWeekRow item={DUE_WEEK_ITEMS[2]} bordered />
                </div>
              </section>

              <section className="flex h-[400px] flex-none flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-[18px] leading-7 font-semibold text-card-foreground">
                    Announcements!
                  </h2>

                  <div className="inline-flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Previous announcement"
                      className={cn("opacity-40 hover:opacity-70", SHADCN_INTERACTION)}
                    >
                      <ArrowLeft className="size-[14px] text-card-foreground" />
                    </button>
                    <p className="text-[14px] leading-5 text-card-foreground">1 /4</p>
                    <button
                      type="button"
                      aria-label="Next announcement"
                      className={cn("hover:text-[var(--pilot-green-400)]", SHADCN_INTERACTION)}
                    >
                      <ArrowRight className="size-[14px] text-card-foreground" />
                    </button>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-border bg-white">
                  <div className="relative h-[238px] w-full shrink-0">
                    <Image
                      src="/pilot/activity-feed/announcement-hero.png"
                      alt="Announcement"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col space-y-3 px-4 py-5">
                    <h3 className="text-[16px] leading-6 font-semibold text-card-foreground">
                      Upcoming Holiday on 29th Feb!
                    </h3>
                    <p className="text-[14px] leading-5 text-muted-foreground">
                      Darkroast&apos;s design team will be on a public holiday on 29th
                      February 2026 Sunday for the following occasion...
                      <Link
                        href="/activity-feed"
                        className={cn(
                          "ml-1 font-semibold text-[var(--pilot-green-400)] hover:text-[var(--pilot-priority-top-bg)]",
                          SHADCN_INTERACTION
                        )}
                      >
                        Know More
                      </Link>
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
