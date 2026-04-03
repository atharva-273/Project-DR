# Component + Token Mapping

## Batch
- Batch ID: `2026-04-02-core-controls`
- Workspace: `next-app`
- Figma URL: https://figma.com/design/FMynMzTyGNTCQ05xUvgCPS/Project-DR?node-id=1905-15188
- Figma fileKey: `FMynMzTyGNTCQ05xUvgCPS`
- Figma nodeId: `1905:15188`

## Components
| Component | Variants | States | Code Path |
| --- | --- | --- | --- |
| button | default, outline, ghost | default, hover, focus, disabled | next-app/components/ui/button.tsx |
| input | default | default, focus, disabled | next-app/components/ui/input.tsx |
| badge | default, secondary, outline | default | next-app/components/ui/badge.tsx |

## Semantic Aliases
| Semantic Alias | Token | Mode | Description |
| --- | --- | --- | --- |
| workflow-action-primary-bg | brand.green.400 | light | Primary button default background. |
| workflow-action-primary-bg-hover | brand.green.500 | light | Primary button hover background. |
| workflow-action-primary-fg | neutral.50 | light | Primary button foreground. |
| workflow-input-fg | neutral.900 | light | Input text color. |
| workflow-input-fg | neutral.100 | dark | Input text color in dark mode. |

## Component Slot Mapping
| Component | Slot | Alias | Notes |
| --- | --- | --- | --- |
| button | root.background.default | workflow-action-primary-bg | - |
| button | root.background.hover | workflow-action-primary-bg-hover | - |
| button | label.foreground | workflow-action-primary-fg | - |
| input | input.foreground | workflow-input-fg | - |
