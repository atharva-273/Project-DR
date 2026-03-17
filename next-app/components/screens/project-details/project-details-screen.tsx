"use client"

import {
  Calendar,
  ChevronDown,
  Loader2,
  List,
  ListOrdered,
  Mic,
  Paperclip,
  SendHorizontal,
  Smile,
  Underline,
  Video,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import {
  DEFAULT_PROJECT_DETAILS_TAB,
  PROJECT_BRIEF_SECTIONS,
  PROJECT_DETAILS_ATTACHMENTS,
  PROJECT_DETAILS_MESSAGES,
  PROJECT_DETAILS_TABS,
} from "./data"
import { ProjectListingIcon } from "../project-listing/project-listing-icons"
import { ProjectListingSidebar } from "../project-listing/project-listing-sidebar"
import type { ProjectDetailsMessage, ProjectDetailsTab } from "./types"

type ProjectDetailsScreenProps = {
  projectId: string
}

const SHADCN_INTERACTION =
  "outline-none transition-all duration-150 ease-out focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"

function HeaderIconButton({
  iconSrc,
  label,
  loading = false,
  onClick,
}: {
  iconSrc: string
  label: string
  loading?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      className={cn(
        "flex size-9 items-center justify-center rounded-md border border-[var(--pilot-sandal-300)] bg-[var(--pilot-sandal-100)] text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[var(--pilot-sandal-200)]",
        SHADCN_INTERACTION
      )}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Image
          src={iconSrc}
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          unoptimized
          className="size-4"
        />
      )}
    </button>
  )
}

function ComposerToolButton({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "flex size-5 items-center justify-center rounded-sm text-card-foreground hover:bg-[var(--pilot-sandal-100)]",
        SHADCN_INTERACTION
      )}
    >
      {children}
    </button>
  )
}

function MessageItem({ message }: { message: ProjectDetailsMessage }) {
  return (
    <div className="flex items-start gap-3">
      <Image
        src="/pilot/project-details/message-avatar.png"
        alt={message.author}
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <p className="text-[16px] font-medium text-card-foreground">{message.author}</p>
          <p className="text-[12px] text-muted-foreground">{message.timestamp}</p>
        </div>

        {message.body ? (
          <p className="pt-1 text-[14px] leading-5 text-card-foreground">{message.body}</p>
        ) : (
          <ul className="list-disc pl-4 pt-1 text-[14px] leading-5 text-card-foreground">
            {message.bullets?.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function ProjectDetailsPanel({
  selectedTab,
  pendingTab,
  isTabLoading,
  onTabChange,
  isBookmarkAdding,
  onBookmarkAdd,
}: {
  selectedTab: ProjectDetailsTab
  pendingTab: ProjectDetailsTab | null
  isTabLoading: boolean
  onTabChange: (tab: ProjectDetailsTab) => void
  isBookmarkAdding: boolean
  onBookmarkAdd: () => void
}) {
  return (
    <aside className="w-full shrink-0 border-t border-border px-6 py-4 xl:w-[411px] xl:border-t-0 xl:border-l">
      <div className="flex h-full flex-col">
        <div className="border-b border-border pb-6">
          <h2 className="text-[28px] leading-none font-semibold text-card-foreground">
            Project Details
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-6">
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] leading-4 text-muted-foreground">Status</p>
              <button
                type="button"
                className={cn(
                  "inline-flex h-8 items-center gap-1 rounded-md border border-[#fde68a] bg-[#fefce8] px-3 text-[12px] font-medium text-[#a16207]",
                  SHADCN_INTERACTION
                )}
              >
                In progress
                <ChevronDown className="size-3" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] leading-4 text-muted-foreground">First Draft:</p>
              <div className="inline-flex h-8 items-center gap-2 rounded-md bg-[var(--pilot-sandal-100)] px-3 text-[12px] font-medium text-card-foreground">
                19 Nov &apos;25
                <Calendar className="size-3.5 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] leading-4 text-muted-foreground">Final due:</p>
              <div className="inline-flex h-8 items-center gap-2 rounded-md bg-[var(--pilot-sandal-100)] px-3 text-[12px] font-medium text-card-foreground">
                19 Nov &apos;25
                <Calendar className="size-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="mt-4 h-1 rounded-full bg-[var(--pilot-sandal-200)]">
            <div className="h-1 w-3/4 rounded-full bg-[var(--pilot-status-green)]" />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border py-6">
          <h3 className="text-[28px] leading-none font-semibold text-card-foreground">
            Bookmarks
          </h3>
          <button
            type="button"
            onClick={onBookmarkAdd}
            disabled={isBookmarkAdding}
            aria-busy={isBookmarkAdding}
            aria-label="Add bookmark"
            className={cn("rounded-sm p-1 hover:scale-[1.04]", SHADCN_INTERACTION)}
          >
            {isBookmarkAdding ? (
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            ) : (
              <Image
                src="/pilot/project-details/icon-plus.svg"
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                unoptimized
                className="size-5"
              />
            )}
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col py-6">
          <div className="inline-flex h-9 w-fit items-center rounded-[10px] bg-[var(--pilot-sandal-200)] p-[3px]">
            {PROJECT_DETAILS_TABS.map((tab) => {
              const active = selectedTab === tab.value

              return (
                <button
                  key={tab.value}
                  type="button"
                  disabled={isTabLoading}
                  onClick={() => onTabChange(tab.value)}
                  aria-busy={pendingTab === tab.value}
                  className={cn(
                    "inline-flex h-7 items-center gap-2 rounded-md px-3 text-[14px] leading-5 font-medium text-card-foreground",
                    SHADCN_INTERACTION,
                    active
                      ? "bg-[var(--pilot-sandal-25)] shadow-[var(--pilot-shadow-sm)]"
                      : "hover:bg-white/70"
                  )}
                >
                  {pendingTab === tab.value ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : null}
                  {tab.value === "brief" ? (
                    <Image
                      src="/pilot/project-details/icon-file-text.svg"
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      unoptimized
                      className="size-4"
                    />
                  ) : null}
                  {tab.label}
                </button>
              )
            })}
          </div>

          {selectedTab === "brief" ? (
            <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[28px] leading-none font-semibold text-card-foreground">
                  Project Brief
                </h3>
                <button
                  type="button"
                  aria-label="Edit project brief"
                  className={cn("rounded-sm p-1 hover:scale-[1.04]", SHADCN_INTERACTION)}
                >
                  <Image
                    src="/pilot/project-details/icon-pencil.svg"
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                    unoptimized
                    className="size-5"
                  />
                </button>
              </div>

              <div className="space-y-3 text-[14px] leading-6 text-card-foreground">
                {PROJECT_BRIEF_SECTIONS.map((section) => (
                  <div key={section.label}>
                    <p className="font-semibold">{section.label}</p>
                    {Array.isArray(section.body) ? (
                      <ul className="list-disc pl-5">
                        {section.body.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{section.body}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-md border border-dashed border-[var(--pilot-sandal-300)] p-4 text-[14px] text-muted-foreground">
              {selectedTab === "files"
                ? "Files list will appear here."
                : "AI summary will appear here."}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export function ProjectDetailsScreen({ projectId }: ProjectDetailsScreenProps) {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<ProjectDetailsTab>(
    DEFAULT_PROJECT_DETAILS_TAB
  )
  const [pendingTab, setPendingTab] = useState<ProjectDetailsTab | null>(null)
  const [isBookmarkAdding, setIsBookmarkAdding] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [headerActionLoading, setHeaderActionLoading] = useState<
    "copy-link" | "more-actions" | null
  >(null)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const registerTimer = (fn: () => void, duration = 700) => {
    const timer = window.setTimeout(fn, duration)
    timersRef.current.push(timer)
  }

  const handleTabChange = (tab: ProjectDetailsTab) => {
    if (tab === selectedTab || pendingTab) return
    setPendingTab(tab)
    setSelectedTab(tab)
    registerTimer(() => setPendingTab(null), 350)
  }

  const handleBookmarkAdd = () => {
    if (isBookmarkAdding) return
    setIsBookmarkAdding(true)
    registerTimer(() => setIsBookmarkAdding(false), 900)
  }

  const handleHeaderAction = (action: "copy-link" | "more-actions") => {
    if (headerActionLoading) return
    setHeaderActionLoading(action)
    registerTimer(() => setHeaderActionLoading(null), 650)
  }

  const handleSendMessage = () => {
    if (isSending) return
    setIsSending(true)
    registerTimer(() => setIsSending(false), 900)
  }

  const handleBackToProjects = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
      return
    }

    router.push("/projects")
  }

  if (projectId !== "tote-bag-design") {
    return (
      <div className="flex min-h-svh w-full bg-[var(--pilot-sandal-25)]">
        <ProjectListingSidebar />
        <main className="flex min-w-0 flex-1 items-center justify-center px-6">
          <p className="text-[16px] text-muted-foreground">Project not found.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh w-full min-w-0 overflow-x-hidden bg-[var(--pilot-sandal-25)]">
      <ProjectListingSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-[66px] flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-3">
          <div className="flex min-w-0 items-end gap-3">
            <HeaderIconButton
              iconSrc="/pilot/project-details/icon-arrow-left.svg"
              label="Back to projects"
              onClick={handleBackToProjects}
            />

            <div>
              <p className="text-[12px] leading-none text-muted-foreground">TrevCo Snacks</p>
              <h1 className="pt-1 text-[20px] leading-7 font-semibold text-card-foreground">
                Insta Story campaign
              </h1>
            </div>

            <button
              type="button"
              className={cn(
                "inline-flex h-8 items-center gap-1 rounded-md border border-[var(--pilot-priority-high-border)] bg-[var(--pilot-priority-high-bg)] px-3 text-[12px] font-medium text-[var(--pilot-priority-high-fg)]",
                SHADCN_INTERACTION
              )}
            >
              High Priority
              <div className="flex size-3 items-center justify-center">
                <ProjectListingIcon
                  name="table-chevron-down-high"
                  className="h-auto w-auto"
                />
              </div>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center pr-2">
              <Image
                src="/pilot/project-details/header-avatar-1.png"
                alt="Team member 1"
                width={32}
                height={32}
                className="mr-[-8px] size-8 rounded-full border-2 border-white object-cover"
              />
              <Image
                src="/pilot/project-details/header-avatar-2.png"
                alt="Team member 2"
                width={32}
                height={32}
                className="mr-[-8px] size-8 rounded-full border-2 border-white object-cover"
              />
              <button
                type="button"
                aria-label="More collaborators"
                className={cn(
                  "mr-[-8px] flex size-9 items-center justify-center rounded-full border-2 border-white bg-[var(--pilot-sandal-100)] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[var(--pilot-sandal-200)]",
                  SHADCN_INTERACTION
                )}
              >
                <ChevronDown className="size-4 text-card-foreground" />
              </button>
            </div>

            <HeaderIconButton
              iconSrc="/pilot/project-details/icon-link.svg"
              label="Copy link"
              loading={headerActionLoading === "copy-link"}
              onClick={() => handleHeaderAction("copy-link")}
            />
            <HeaderIconButton
              iconSrc="/pilot/project-details/icon-ellipsis-vertical.svg"
              label="More actions"
              loading={headerActionLoading === "more-actions"}
              onClick={() => handleHeaderAction("more-actions")}
            />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 min-w-0 flex-col xl:flex-row">
          <main className="flex min-w-0 flex-1 flex-col gap-2 px-6 py-3">
            <div className="flex min-h-0 flex-1 flex-col rounded-md border border-border bg-white p-4">
              <div className="min-h-0 flex-1 space-y-6 overflow-y-auto pr-1">
                {PROJECT_DETAILS_MESSAGES.slice(0, 3).map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1 rounded-4xl bg-[var(--pilot-sandal-100)] px-3 py-1 text-[12px] font-medium text-card-foreground",
                      SHADCN_INTERACTION
                    )}
                  >
                    Today
                    <ChevronDown className="size-3" />
                  </button>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <MessageItem message={PROJECT_DETAILS_MESSAGES[3]} />

                <div className="flex items-start gap-3">
                  <Image
                    src="/pilot/project-details/message-avatar.png"
                    alt="Natalie"
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 leading-none">
                      <p className="text-[16px] font-medium text-card-foreground">Natalie</p>
                      <p className="text-[12px] text-muted-foreground">12:35 PM | Today</p>
                    </div>

                    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
                      {PROJECT_DETAILS_ATTACHMENTS.map((src) => (
                        <button
                          key={src}
                          type="button"
                          aria-label="Open attachment"
                          className={cn(
                            "shrink-0 rounded-md border border-border hover:brightness-95",
                            SHADCN_INTERACTION
                          )}
                        >
                          <Image
                            src={src}
                            alt="Attachment preview"
                            width={60}
                            height={60}
                            className="size-[60px] rounded-md object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    <p className="pt-1 text-[14px] leading-5 text-card-foreground">
                      This is a file attachment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border bg-white">
              <div className="flex items-center gap-3 border-b border-border px-3 py-3 text-muted-foreground">
                <ComposerToolButton label="Add">
                  <span className="text-[12px] font-medium">+</span>
                </ComposerToolButton>
                <ComposerToolButton label="Emoji">
                  <Smile className="size-4" />
                </ComposerToolButton>
                <ComposerToolButton label="Bold">
                  <span className="text-[14px] font-medium">B</span>
                </ComposerToolButton>
                <ComposerToolButton label="Italic">
                  <span className="text-[14px] italic">I</span>
                </ComposerToolButton>
                <ComposerToolButton label="Underline">
                  <Underline className="size-4" />
                </ComposerToolButton>
                <ComposerToolButton label="Decrease indent">
                  <ProjectListingIcon name="table-chevron-right" className="h-auto w-auto" />
                </ComposerToolButton>
                <ComposerToolButton label="Increase indent">
                  <ProjectListingIcon name="table-chevron-up" className="h-auto w-auto" />
                </ComposerToolButton>
                <ComposerToolButton label="Info">
                  <ProjectListingIcon
                    name="table-info"
                    className="h-auto w-auto opacity-80"
                  />
                </ComposerToolButton>
                <ComposerToolButton label="List">
                  <List className="size-4" />
                </ComposerToolButton>
                <ComposerToolButton label="Ordered list">
                  <ListOrdered className="size-4" />
                </ComposerToolButton>
                <ComposerToolButton label="Attach file">
                  <Paperclip className="size-4" />
                </ComposerToolButton>
                <ComposerToolButton label="Record voice">
                  <Mic className="size-4" />
                </ComposerToolButton>
                <ComposerToolButton label="Video">
                  <Video className="size-4" />
                </ComposerToolButton>
              </div>

              <div className="flex items-center justify-between px-3 py-2.5">
                <p className="text-[14px] text-muted-foreground">
                  {isSending ? "Sending message..." : "What's on your mind?"}
                </p>
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={isSending}
                  aria-busy={isSending}
                  aria-label="Send message"
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md bg-[var(--pilot-green-400)] text-white hover:brightness-95",
                    SHADCN_INTERACTION
                  )}
                >
                  {isSending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <SendHorizontal className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </main>

          <ProjectDetailsPanel
            selectedTab={selectedTab}
            pendingTab={pendingTab}
            isTabLoading={pendingTab !== null}
            onTabChange={handleTabChange}
            isBookmarkAdding={isBookmarkAdding}
            onBookmarkAdd={handleBookmarkAdd}
          />
        </div>
      </div>
    </div>
  )
}
