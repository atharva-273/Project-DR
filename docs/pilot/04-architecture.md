# 04 Architecture

## File / Folder Blueprint
- `/Users/atharva/Project-DR/next-app/app/projects/page.tsx`
- `/Users/atharva/Project-DR/next-app/components/screens/project-listing/project-listing-screen.tsx`
- `/Users/atharva/Project-DR/next-app/components/screens/project-listing/project-listing-sidebar.tsx`
- `/Users/atharva/Project-DR/next-app/components/screens/project-listing/project-listing-header.tsx`
- `/Users/atharva/Project-DR/next-app/components/screens/project-listing/project-listing-taskbar.tsx`
- `/Users/atharva/Project-DR/next-app/components/screens/project-listing/project-listing-table.tsx`
- `/Users/atharva/Project-DR/next-app/components/screens/project-listing/data.ts`
- `/Users/atharva/Project-DR/next-app/components/screens/project-listing/types.ts`
- `/Users/atharva/Project-DR/next-app/public/pilot/project-listing/*`

## Component Tree
- `ProjectListingScreen`
  - `ProjectListingSidebar`
  - `MainPane`
    - `ProjectListingHeader`
    - `ProjectListingTaskbar`
    - `ProjectListingTable`
      - `SectionToggleRow`
      - `ActiveTable`
        - `PriorityBadge`
        - `StatusProgressBar`
        - `DesignerStack`
      - Collapsed section rows (`On Hold`, `Completed`)

## State Boundaries
- `ProjectListingScreen`:
  - selected tab value (`ProjectTab`)
  - section open map (`Record<ProjectSectionId, boolean>`)
- Child components are stateless presentation with callback props where needed
- No server or external state in this pilot

## Styling Strategy
- Global: add minimal `--pilot-*` variables in `app/globals.css`
- Local: apply screen-specific utility classes in screen modules
- Reuse: rely on shadcn component structure and class override hooks
- Avoid random color literals in component code; use tokens/classes from tokenized palette

## Accessibility Contract
- Sidebar and toolbar controls use real `button` elements
- Accordion rows expose `aria-expanded` and keyboard focus
- Table uses semantic `thead/tbody/th/td`
- Icon-only controls include `aria-label`
- Focus visibility preserved through existing shadcn focus styles

## Verification Plan
1. Run `/projects` at desktop (`1440x900`) and compare against Figma screenshot
2. Validate:
   - Shell dimensions (sidebar/header/taskbar/main)
   - Table column widths and row heights
   - Typography and semantic colors
   - Tabs and accordion interaction behavior
3. Run `pnpm --dir next-app lint` and `pnpm --dir next-app typecheck`
4. Document deltas in `07-verification.md`
