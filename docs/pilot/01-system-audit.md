# 01 System Audit

## Repo + Runtime Baseline
- **Target app:** `/Users/atharva/Project-DR/next-app`
- **Framework:** Next.js App Router + React + TypeScript
- **Styling:** Tailwind v4 + CSS variables in `app/globals.css`
- **UI primitives:** local shadcn/ui components in `components/ui`

## Available shadcn Components (Must Reuse First)
- Present and reusable:
  - `button`
  - `input`
  - `tabs`
  - `badge`
  - `table`
  - `avatar` (with `AvatarGroup` + `AvatarGroupCount`)
  - `separator`
  - `dropdown-menu`, `dialog`, `card`, `label`, `select`, `textarea`, `skeleton`

## Missing / Not Present for Pilot
- No dedicated `sidebar` component in `components/ui`
- No dedicated `progress` component in `components/ui`
- No dedicated `accordion` component in `components/ui`

## Design Token Coverage
- Existing base tokens are neutral shadcn defaults (`--background`, `--foreground`, `--muted`, etc.)
- Figma-specific colors for this screen are not fully present:
  - Brand sandal range (`25/50/100/200`)
  - Brand green (`400`) and sidebar dark green
  - Semantic priority/status colors as used in frame
- Pilot-specific CSS variables are required (`--pilot-*` naming)

## Existing Pattern Constraints
- Prefer component composition over creating new primitives
- Keep custom styling local to screen modules when possible
- Avoid uncontrolled one-off values where tokenized equivalents exist
- Maintain accessibility semantics (buttons, table header cells, `aria-expanded`)

## Recommended Reuse-First Strategy
1. Use `Input`, `Button`, `Tabs`, `Badge`, `Table`, `Avatar` as base building blocks
2. Add local wrappers for frame-specific variants:
   - `PriorityBadge`
   - `StatusProgressBar`
   - `SectionToggleRow`
3. Keep new global changes limited to pilot tokens in `globals.css`
4. Keep pilot implementation isolated under `components/screens/project-listing`
