# 00 Intake

## Pilot Context
- **Project:** Project DR single-screen pilot
- **Workflow source:** `/Users/atharva/Project-DR/docs/pilot/WORKFLOW.md`
- **Implementation target:** `/Users/atharva/Project-DR/next-app`
- **Intended route:** `/projects`

## Design Reference
- **Figma file key:** `FMynMzTyGNTCQ05xUvgCPS`
- **Figma node:** `1905:15188`
- **Frame name:** `Client | Project listing`
- **Target fidelity:** Pixel-accurate to the provided frame at desktop (`1440x900`)

## Included In Pilot
- Full static visual composition of the frame:
  - Left sidebar
  - Top header
  - Task bar (type tabs, drafts, search, filter)
  - Main area with active project table and collapsed section rows
- Static content matching frame text and labels
- Basic local UI behavior:
  - Type tabs active-state switching
  - Accordion open/close toggles for section headers
- shadcn/ui + existing repo patterns as implementation backbone

## Excluded From Pilot
- Backend/API integration
- Real search/filter behavior
- Real priority/status editing
- Cross-page navigation logic
- Responsive redesign beyond desktop reference
- Dark-mode parity for this screen

## Success Criteria
- `/projects` renders the screen with no runtime errors
- Visual structure and spacing match Figma frame at desktop size
- Typography, colors, and component styling align with Figma intent
- Only controlled, documented customizations are introduced
- Lint and typecheck pass for `next-app`
