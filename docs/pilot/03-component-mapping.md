# 03 Component Mapping

## Mapping Matrix

### App Shell
- **Figma:** Root + sidebar + main pane
- **Implementation:** `ProjectListingScreen` + `ProjectListingSidebar`
- **Base:** Local layout wrappers (`div`, `nav`, `button`)
- **Reason:** No native shadcn sidebar primitive currently present
- **Upstream decision:** Keep local (pilot-specific)

### Top Header
- **Figma:** Header with title, search, new-project CTA
- **Implementation:** `ProjectListingHeader`
- **Base components:** `Input`, `Button`
- **Customization:** Search input icon placement + fixed width; green CTA variant styling
- **Upstream decision:** Keep local wrapper styles, do not alter core `Button`

### Task Bar
- **Figma:** Type tabs, drafts action, in-project search, filter
- **Implementation:** `ProjectListingTaskbar`
- **Base components:** `Tabs`, `Button`, `Input`
- **Customization:** Sandal tab container style and trigger states
- **Upstream decision:** Keep local class overrides in screen module

### Accordion Section Headers
- **Figma:** Active/On Hold/Completed header rows
- **Implementation:** `SectionToggleRow` wrapper
- **Base components:** semantic `button` row
- **Customization:** Chevron state + metadata text + info icon layout
- **Upstream decision:** Keep local; generic accordion primitive can be evaluated later

### Active Data Table
- **Figma:** Multi-column table with custom cells
- **Implementation:** `ProjectListingTable` with shadcn `Table*` primitives
- **Base components:** `Table`, `TableHead`, `TableRow`, `TableCell`
- **Customization:** Exact column widths, row highlights, custom composite cells
- **Upstream decision:** Keep pilot-local due strong screen specificity

### Priority Cell
- **Figma:** Priority badges with icon/color variants
- **Implementation:** `PriorityBadge`
- **Base components:** `Badge`
- **Customization:** Variant-specific colors, optional leading icon, chevron
- **Upstream decision:** Candidate for upstream only if reused by additional screens

### Status Cell
- **Figma:** Status label + date + progress track
- **Implementation:** `StatusProgressBar`
- **Base components:** local wrapper (`div` + tokenized bars)
- **Customization:** Semantic colors + percent widths
- **Upstream decision:** Keep local until more screens need same pattern

### Designer Cell
- **Figma:** Overlapping avatars + plus fallback
- **Implementation:** shadcn `Avatar`, `AvatarGroup`, `AvatarGroupCount`
- **Base components:** existing avatar primitives
- **Customization:** ring/background and sizing alignment
- **Upstream decision:** Reuse existing avatar primitives (no new primitive)

## Controlled Customization Log
1. Add `--pilot-*` tokens for non-base color set from Figma
2. Local wrappers for status/priority/section toggle instead of modifying `components/ui/*`
3. Local fixed sizing classes where frame requires exact desktop dimensions
