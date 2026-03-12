# 02 Screen Extraction

## Frame Identity
- **Node:** `1905:15188`
- **Name:** `Client | Project listing`
- **Canvas size:** `1440 x 900`

## Layout Zones and Dimensions
- Root frame: `1440 x 900`
- Sidebar: `256 x 900`
- Main pane: `1184 x 900`
- Header (main pane top): `1184 x 56`
- Task bar: `1184 x 68`
- Main content area: `1184 x 776`

## Main Table Region
- Active section container width: `1144`
- Table column widths:
  - Project Name: `294`
  - Priority: `132`
  - Status: `348`
  - Final Date: `210`
  - Designer: `128`
- Table row heights:
  - Header row: `40`
  - Data rows: `64`

## Typography Hierarchy
- Primary heading/body emphasis: `16px` medium
- Standard labels/body: `14px` regular/medium/semibold
- Supporting/meta text: `12px` regular/medium/semibold
- Progress status labels: `12px` with semantic color

## Spacing Rhythm (Observed)
- Core spacing values: `2, 4, 6, 8, 10, 12, 14, 16, 20, 24`
- Rounded corners used: `6, 8, 10, 9999`

## Visual States Visible in Frame
- Sidebar current item highlight (`Projects`)
- Tabs selected state (`Design` active)
- Priority badge variants (`Top`, `High`, `Low`, `Medium`)
- Status variants (`In progress`, `Ready for review`, `Needs attention`)
- Accordion states:
  - `Active` expanded
  - `On Hold` collapsed
  - `Completed` collapsed

## Assets Required
- Sidebar logo image
- Two avatar images reused in table + footer
- Left gutter decoration image in active table block

## Interaction Scope for Pilot
- Implement only what is visible/necessary for this pilot:
  - Tabs active visual switch
  - Accordion toggle open/close
- Keep data controls visual-only (no persistence or backend effects)
