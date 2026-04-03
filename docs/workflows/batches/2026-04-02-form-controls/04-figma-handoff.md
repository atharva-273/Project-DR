# Figma Handoff

## Target
- Page Name: `Component Docs`
- URL: https://www.figma.com/design/d0NDAZFtXvK2GAfzlrPBvx/Style-guide?node-id=490-4579&t=hQkmEI8zv4LUtrYY-11
- fileKey: `d0NDAZFtXvK2GAfzlrPBvx`
- nodeId: `490:4579`

## MCP Execution Order
1. Run `get_design_context(fileKey, nodeId)` for each component node.
2. Run `get_screenshot(fileKey, nodeId)` for visual parity checks.
3. Ensure code paths are finalized in this batch's mapping file.
4. Save Code Connect mappings with:

```ts
send_code_connect_mappings({
  fileKey: "d0NDAZFtXvK2GAfzlrPBvx",
  nodeId: "498:1743",
  mappings: [
  {
    componentName: "avatar",
    label: "React",
    nodeId: "498:1758",
    source: "next-app/components/ui/avatar.tsx"
  },
  {
    componentName: "button",
    label: "React",
    nodeId: "498:1771",
    source: "next-app/components/ui/button.tsx"
  },
  {
    componentName: "checkbox",
    label: "React",
    nodeId: "498:1779",
    source: "next-app/components/ui/checkbox.tsx"
  },
  {
    componentName: "input",
    label: "React",
    nodeId: "498:1789",
    source: "next-app/components/ui/input.tsx"
  },
  {
    componentName: "label",
    label: "React",
    nodeId: "498:1796",
    source: "next-app/components/ui/label.tsx"
  },
  {
    componentName: "radio-group",
    label: "React",
    nodeId: "498:1805",
    source: "next-app/components/ui/radio-group.tsx"
  }
  ]
})
```

## QA Gate
- Every component variant/state in this batch is represented in Figma docs.
- Token alias names in Figma docs match aliases in `03-component-token-mapping.md`.
- Code Connect source paths are resolvable.
- Code Connect write access requires a Figma Developer seat in an Organization/Enterprise plan.
