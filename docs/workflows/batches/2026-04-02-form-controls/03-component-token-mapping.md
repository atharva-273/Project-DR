# Component + Token Mapping

## Batch
- Batch ID: `2026-04-02-form-controls`
- Workspace: `next-app`
- Figma URL: https://www.figma.com/design/d0NDAZFtXvK2GAfzlrPBvx/Style-guide?node-id=490-4579&t=hQkmEI8zv4LUtrYY-11
- Figma fileKey: `d0NDAZFtXvK2GAfzlrPBvx`
- Figma nodeId: `490:4579`

## Components
| Component | Variants | States | Code Path |
| --- | --- | --- | --- |
| avatar | default, sm, lg | default | next-app/components/ui/avatar.tsx |
| button | default, outline, ghost | default, hover, focus, disabled | next-app/components/ui/button.tsx |
| checkbox | default | default, focus, active, disabled | next-app/components/ui/checkbox.tsx |
| input | default | default, focus, disabled | next-app/components/ui/input.tsx |
| label | default | default, disabled | next-app/components/ui/label.tsx |
| radio-group | default | default, focus, active, disabled | next-app/components/ui/radio-group.tsx |

## Semantic Aliases
| Semantic Alias | Token | Mode | Description |
| --- | --- | --- | --- |
| dr-component-button-bg | primitive.brand.primary-green.400 | light | Default button background |
| dr-component-button-bg-hover | primitive.brand.primary-green.500 | light | Button hover background |
| dr-component-button-fg | primitive.system.greyscale.50 | light | Button foreground |
| dr-component-input-bg | tokens-style.background.bg-neutral.neutral-01 | light | Input background |
| dr-component-input-border | tokens-style.border.border-neutral.neutral-01 | light | Input border |
| dr-component-input-fg | tokens-style.typography.primary-text.primary-01 | light | Input text |
| dr-component-input-placeholder | tokens-style.typography.secondary-text.secondary-01 | light | Input placeholder text |
| dr-component-label-fg | tokens-style.typography.primary-text.primary-01 | light | Label text |
| dr-component-checkbox-checked-bg | primitive.brand.primary-green.400 | light | Checkbox checked state background |
| dr-component-radio-checked-bg | primitive.brand.primary-green.400 | light | Radio checked state background |

## Component Slot Mapping
| Component | Slot | Alias | Notes |
| --- | --- | --- | --- |
| button | root.background.default | dr-component-button-bg | - |
| button | root.background.hover | dr-component-button-bg-hover | - |
| button | label.foreground | dr-component-button-fg | - |
| input | root.background | dr-component-input-bg | - |
| input | root.border | dr-component-input-border | - |
| input | value.foreground | dr-component-input-fg | - |
| input | placeholder.foreground | dr-component-input-placeholder | - |
| label | text.foreground | dr-component-label-fg | - |
| checkbox | checked.background | dr-component-checkbox-checked-bg | - |
| radio-group | checked.background | dr-component-radio-checked-bg | - |
