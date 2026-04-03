# Figma Handoff

## Target
- Page Name: `Component Docs`
- URL: https://figma.com/design/FMynMzTyGNTCQ05xUvgCPS/Project-DR?node-id=1905-15188
- fileKey: `FMynMzTyGNTCQ05xUvgCPS`
- nodeId: `1905:15188`

## MCP Execution Order
1. Run `get_design_context(fileKey, nodeId)` for each component node.
2. Run `get_screenshot(fileKey, nodeId)` for visual parity checks.
3. Ensure code paths are finalized in this batch's mapping file.
4. Save Code Connect mappings with:

```ts
send_code_connect_mappings({
  fileKey: "FMynMzTyGNTCQ05xUvgCPS",
  nodeId: "1905:15188",
  mappings: [
  {
    componentName: "button",
    label: "React",
    nodeId: "<replace-with-figma-node-id>",
    source: "next-app/components/ui/button.tsx"
  },
  {
    componentName: "input",
    label: "React",
    nodeId: "<replace-with-figma-node-id>",
    source: "next-app/components/ui/input.tsx"
  },
  {
    componentName: "badge",
    label: "React",
    nodeId: "<replace-with-figma-node-id>",
    source: "next-app/components/ui/badge.tsx"
  }
  ]
})
```

## QA Gate
- Every component variant/state in this batch is represented in Figma docs.
- Token alias names in Figma docs match aliases in `03-component-token-mapping.md`.
- Code Connect source paths are resolvable.
- Code Connect write access requires a Figma Developer seat in an Organization/Enterprise plan.
