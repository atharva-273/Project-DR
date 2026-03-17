"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

import { ActivityFeedScreen } from "@/components/screens/activity-feed/activity-feed-screen"

export default function ActivityFeedPage() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const previousTheme = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!previousTheme.current && theme) {
      previousTheme.current = theme
    }
  }, [theme])

  useEffect(() => {
    return () => {
      setTheme(previousTheme.current ?? "system")
    }
  }, [setTheme])

  useEffect(() => {
    if (resolvedTheme !== "light") {
      setTheme("light")
    }
  }, [resolvedTheme, setTheme])

  return (
    <div className="min-h-svh w-full overflow-x-hidden bg-[var(--pilot-sandal-25)]">
      <ActivityFeedScreen />
    </div>
  )
}
