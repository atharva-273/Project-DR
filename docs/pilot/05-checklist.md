# 05 Checklist

## Layout Correctness
- [ ] Root frame renders as desktop-first `1440x900` composition
- [ ] Sidebar width/height matches expected dimensions
- [ ] Header and task bar heights match extraction spec
- [ ] Main content paddings and spacing align with Figma rhythm
- [ ] Table column widths (`294/132/348/210/128`) are enforced

## Typography Correctness
- [ ] Sans font is Geist-based for this app shell
- [ ] Title, labels, metadata, and body text sizes match `16/14/12`
- [ ] Weight hierarchy (regular/medium/semibold) is preserved

## Color / Token Compliance
- [ ] Pilot uses `--pilot-*` tokens for screen-specific palette
- [ ] No uncontrolled one-off color values in screen component code
- [ ] Priority and status semantic colors match intended variants

## State Coverage
- [ ] Tabs switch active visual state locally
- [ ] Accordion section rows toggle open/close state
- [ ] Active section is open by default
- [ ] On Hold and Completed are collapsed by default

## Accessibility / Usability
- [ ] Accordion toggles have `aria-expanded`
- [ ] Icon-only controls include readable labels
- [ ] Table is semantic with headers and cells
- [ ] Keyboard focus ring is visible on interactive controls

## Code Quality
- [ ] `pnpm --dir next-app lint` passes without warnings/errors
- [ ] `pnpm --dir next-app typecheck` passes
- [ ] New files are organized under `components/screens/project-listing`

## Pixel Verification Steps
- [ ] Open Figma frame (`1905:15188`) and app route (`/projects`) side by side
- [ ] Compare shell geometry (sidebar/header/taskbar/main)
- [ ] Compare table: headers, row heights, badge/status visuals, avatar stack
- [ ] Compare collapsed rows and spacing below table
- [ ] Record any mismatches in `07-verification.md`
