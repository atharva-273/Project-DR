"use client"

import { useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { useTheme } from "next-themes"

import { ProjectDetailsScreen } from "@/components/screens/project-details/project-details-screen"

export default function ProjectDetailsPage() {
  const params = useParams<{ projectId: string }>()
  const projectIdParam = params?.projectId
  const projectId = Array.isArray(projectIdParam)
    ? projectIdParam[0]
    : projectIdParam ?? ""

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

  return <ProjectDetailsScreen projectId={projectId} />
}
