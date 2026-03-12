# 08 Token Conflicts

## Token Source Used
- `/Users/atharva/Desktop/Colors.zip` → `Mode 1.tokens.json`
- `/Users/atharva/Desktop/Tailwind CSS.zip` → `Default.tokens.json`
- `/Users/atharva/Desktop/Theme.zip` → `Default.tokens 2.tokens.json`

No token markdown file was present in the supplied zip packages, so JSON token exports were used as the styling source of truth.

## Policy Applied
1. Prefer values from the supplied token files.
2. Keep screen-specific values outside token set only when the selected Figma frame (`FMynMzTyGNTCQ05xUvgCPS`, node `1905:15188`) clearly requires them.
3. Store those exceptions as explicit `--pilot-conflict-*` variables in `/Users/atharva/Project-DR/next-app/app/globals.css`.

## Confirmed Frame-vs-Token Conflicts
1. `#256F4C` (top-priority badge background)
- Token set gap: not present in provided token files.
- Closest available tokens: `#1E6042` (`Brand green 500`), `#2F7A58` (`Brand green 400`).
- Decision: keep frame value via `--pilot-conflict-priority-top-bg`.

2. `#F0E4D8` (taskbar filter button border)
- Token set gap: not present in provided token files.
- Closest available token: `#EBDDCB` (`Brand Sandal 300`).
- Decision: keep frame value via `--pilot-conflict-filter-border`.

3. `rgba(255, 255, 255, 0.2)` (sidebar section divider)
- Token set gap: token export includes `white` at `0.1` alpha, not `0.2`.
- Closest available token: `rgba(255, 255, 255, 0.1)`.
- Decision: keep frame value via `--pilot-conflict-sidebar-divider`.
