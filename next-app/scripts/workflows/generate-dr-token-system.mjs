#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const NEXT_APP_ROOT = path.resolve(__dirname, "../..")
const REPO_ROOT = path.resolve(NEXT_APP_ROOT, "..")
const TMP_ROOT = path.join(REPO_ROOT, ".tmp", "dr-tokens")

function parseArgs(argv) {
  const args = {
    out: path.join(NEXT_APP_ROOT, "app", "dr-token-system.css"),
    manifestOut: path.join(
      REPO_ROOT,
      "docs",
      "workflows",
      "batches",
      "2026-04-02-form-controls",
      "00-dr-token-manifest.md"
    ),
  }

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
    if (current === "--") {
      continue
    }
    if (current === "--out") {
      args.out = path.resolve(process.cwd(), argv[index + 1])
      index += 1
      continue
    }
    if (current === "--manifest-out") {
      args.manifestOut = path.resolve(process.cwd(), argv[index + 1])
      index += 1
      continue
    }
    if (current === "--help" || current === "-h") {
      printHelp()
      process.exit(0)
    }
    throw new Error(`Unknown argument: ${current}`)
  }

  return args
}

function printHelp() {
  console.log(`Generate DR token system CSS from Figma token export zips.

Usage:
  node scripts/workflows/generate-dr-token-system.mjs [options]

Options:
  --out <path>           Output CSS file path.
  --manifest-out <path>  Output markdown manifest path.
  --help, -h             Show help.
`)
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function listBreakpointFiles() {
  const directory = path.join(TMP_ROOT, "breakpoints")
  if (!fs.existsSync(directory)) {
    return []
  }
  return fs
    .readdirSync(directory)
    .filter((entry) => entry.endsWith(".json"))
    .sort((left, right) => left.localeCompare(right))
    .map((entry) => path.join(directory, entry))
}

function collectLeafTokens(node, basePath = [], bucket = []) {
  if (!node || typeof node !== "object") {
    return bucket
  }

  if (
    Object.prototype.hasOwnProperty.call(node, "$value") &&
    Object.prototype.hasOwnProperty.call(node, "$type")
  ) {
    bucket.push({
      path: basePath,
      type: node.$type,
      value: node.$value,
    })
    return bucket
  }

  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) {
      continue
    }
    collectLeafTokens(child, [...basePath, key], bucket)
  }

  return bucket
}

function isTokenReference(value) {
  return typeof value === "string" && /^\{.+\}$/.test(value)
}

function formatColorValue(value) {
  if (typeof value === "string") {
    return value
  }

  if (value && typeof value === "object") {
    const alpha = typeof value.alpha === "number" ? value.alpha : 1
    if (alpha >= 1 && typeof value.hex === "string") {
      return value.hex.toLowerCase()
    }

    if (Array.isArray(value.components) && value.components.length >= 3) {
      const [r, g, b] = value.components
      const red = Math.round(r * 255)
      const green = Math.round(g * 255)
      const blue = Math.round(b * 255)
      return `rgba(${red}, ${green}, ${blue}, ${alpha})`
    }
  }

  return String(value)
}

function shouldAppendPx(sourceName, tokenPath) {
  const normalizedPath = tokenPath.map(slugify).join("-")
  const isOpacity = normalizedPath.includes("opacity")
  const isFontWeight =
    normalizedPath.includes("font-weight") || normalizedPath.includes("weights")
  if (isOpacity || isFontWeight) {
    return false
  }

  if (sourceName.startsWith("breakpoint-")) {
    return true
  }

  const dimensionHints = [
    "radius",
    "spacing",
    "stroke",
    "breakpoint-width",
    "container-width",
    "font-size",
    "line-height",
    "offset-x",
    "offset-y",
    "blur-radius",
    "spread-radius",
  ]

  return dimensionHints.some((hint) => normalizedPath.includes(hint))
}

function toCssValue(entry, sourceName, resolveReference) {
  if (entry.type === "color") {
    if (isTokenReference(entry.value)) {
      return resolveReference(entry.value)
    }
    return formatColorValue(entry.value)
  }

  if (entry.type === "number" && typeof entry.value === "number") {
    if (shouldAppendPx(sourceName, entry.path)) {
      return `${entry.value}px`
    }
    return String(entry.value)
  }

  if (entry.type === "string" && typeof entry.value === "string") {
    if (isTokenReference(entry.value)) {
      return resolveReference(entry.value)
    }
    return JSON.stringify(entry.value)
  }

  if (typeof entry.value === "string" && isTokenReference(entry.value)) {
    return resolveReference(entry.value)
  }

  if (typeof entry.value === "object") {
    return formatColorValue(entry.value)
  }

  return String(entry.value)
}

function addSource(sourceName, filePath, tokens, sourceStats) {
  const json = readJson(filePath)
  const leaves = collectLeafTokens(json)
  sourceStats[sourceName] = leaves.length

  for (const leaf of leaves) {
    const id = [sourceName, ...leaf.path].map(slugify).join("-")
    tokens.set(id, {
      id,
      source: sourceName,
      path: leaf.path,
      type: leaf.type,
      value: leaf.value,
    })
  }
}

function resolveRefToVarName(reference, currentSource) {
  const raw = reference.slice(1, -1)
  const refId = [currentSource, ...raw.split(".")].map(slugify).join("-")
  return `var(--dr-${refId})`
}

function buildComponentAliases(tokenIds) {
  const has = (id) => tokenIds.has(id)
  const ref = (id, fallback) => (has(id) ? `var(--dr-${id})` : fallback)

  return [
    ["dr-component-control-radius", ref("style-border-radius-md", "var(--radius)")],
    ["dr-component-control-border-width", ref("style-border-stroke-tokens-border", "1px")],
    ["dr-component-button-bg", ref("colors-primitive-colours-brand-primary-green-400", "var(--primary)")],
    [
      "dr-component-button-bg-hover",
      ref("colors-primitive-colours-brand-primary-green-500", "color-mix(in srgb, var(--primary) 90%, black)"),
    ],
    ["dr-component-button-fg", ref("colors-primitive-colours-system-greyscale-50", "var(--primary-foreground)")],
    ["dr-component-button-border", ref("colors-tokens-style-border-border-primary-primary-01", "var(--border)")],
    ["dr-component-button-ring", ref("colors-primitive-colours-brand-primary-green-300", "var(--ring)")],
    ["dr-component-button-ring-soft", ref("colors-primitive-colours-brand-primary-green-100", "color-mix(in srgb, var(--ring) 28%, transparent)")],
    ["dr-component-input-bg", ref("colors-tokens-style-background-bg-neutral-neutral-01", "var(--background)")],
    ["dr-component-input-border", ref("colors-tokens-style-border-border-neutral-neutral-01", "var(--input)")],
    ["dr-component-input-fg", ref("colors-tokens-style-typography-primary-text-primary-01", "var(--foreground)")],
    ["dr-component-input-placeholder", ref("colors-tokens-style-typography-secondary-text-secondary-01", "var(--muted-foreground)")],
    ["dr-component-input-ring", ref("colors-primitive-colours-brand-primary-green-300", "var(--ring)")],
    ["dr-component-input-ring-soft", ref("colors-primitive-colours-brand-primary-green-100", "color-mix(in srgb, var(--ring) 24%, transparent)")],
    ["dr-component-label-fg", ref("colors-tokens-style-typography-primary-text-primary-01", "var(--foreground)")],
    ["dr-component-avatar-border", ref("colors-tokens-style-border-border-neutral-neutral-01", "var(--border)")],
    ["dr-component-avatar-fallback-bg", ref("colors-tokens-style-background-bg-secondary-secondary-01", "var(--muted)")],
    ["dr-component-avatar-fallback-fg", ref("colors-tokens-style-typography-secondary-text-secondary-01", "var(--muted-foreground)")],
    ["dr-component-avatar-badge-bg", ref("colors-primitive-colours-brand-primary-green-400", "var(--primary)")],
    ["dr-component-avatar-badge-fg", ref("colors-primitive-colours-system-greyscale-50", "var(--primary-foreground)")],
    ["dr-component-avatar-group-ring", ref("colors-tokens-style-background-bg-neutral-neutral-01", "var(--background)")],
    ["dr-component-checkbox-bg", ref("colors-tokens-style-background-bg-neutral-neutral-01", "var(--background)")],
    ["dr-component-checkbox-border", ref("colors-tokens-style-border-border-neutral-neutral-01", "var(--input)")],
    ["dr-component-checkbox-checked-bg", ref("colors-primitive-colours-brand-primary-green-400", "var(--primary)")],
    ["dr-component-checkbox-checked-fg", ref("colors-primitive-colours-system-greyscale-50", "var(--primary-foreground)")],
    ["dr-component-checkbox-ring", ref("colors-primitive-colours-brand-primary-green-300", "var(--ring)")],
    ["dr-component-checkbox-ring-soft", ref("colors-primitive-colours-brand-primary-green-100", "color-mix(in srgb, var(--ring) 28%, transparent)")],
    ["dr-component-radio-bg", ref("colors-tokens-style-background-bg-neutral-neutral-01", "var(--background)")],
    ["dr-component-radio-border", ref("colors-tokens-style-border-border-neutral-neutral-01", "var(--input)")],
    ["dr-component-radio-checked-bg", ref("colors-primitive-colours-brand-primary-green-400", "var(--primary)")],
    ["dr-component-radio-checked-dot", ref("colors-primitive-colours-system-greyscale-50", "var(--primary-foreground)")],
    ["dr-component-radio-ring", ref("colors-primitive-colours-brand-primary-green-300", "var(--ring)")],
    ["dr-component-radio-ring-soft", ref("colors-primitive-colours-brand-primary-green-100", "color-mix(in srgb, var(--ring) 28%, transparent)")],
  ]
}

function writeFile(targetPath, content) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.writeFileSync(targetPath, content, "utf8")
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const sourceStats = {}
  const tokens = new Map()

  addSource(
    "colors",
    path.join(TMP_ROOT, "colors", "Mode 1.tokens.json"),
    tokens,
    sourceStats
  )
  addSource(
    "style",
    path.join(TMP_ROOT, "style", "Mode 1.tokens.json"),
    tokens,
    sourceStats
  )
  addSource(
    "typography",
    path.join(TMP_ROOT, "typography", "Mode 1.tokens.json"),
    tokens,
    sourceStats
  )

  for (const filePath of listBreakpointFiles()) {
    const sourceName = `breakpoint-${slugify(path.basename(filePath, ".tokens.json"))}`
    addSource(sourceName, filePath, tokens, sourceStats)
  }

  const sortedTokens = [...tokens.values()].sort((left, right) =>
    left.id.localeCompare(right.id)
  )

  const lines = []
  lines.push("/*")
  lines.push(" * DR token system.")
  lines.push(" * Generated from:")
  lines.push(" * - /Users/atharva/Desktop/DR - Colors.zip")
  lines.push(" * - /Users/atharva/Desktop/DR - Typography.zip")
  lines.push(" * - /Users/atharva/Desktop/DR - Style properties.zip")
  lines.push(" * - /Users/atharva/Desktop/DR - Breakpoints.zip")
  lines.push(" */")
  lines.push("")
  lines.push(":root {")

  for (const token of sortedTokens) {
    const value = toCssValue(token, token.source, (reference) =>
      resolveRefToVarName(reference, token.source)
    )
    lines.push(`  --dr-${token.id}: ${value};`)
  }

  lines.push("")
  lines.push("  /* Component aliases for first test run: avatar, button, checkbox, input, label, radio */")
  const aliases = buildComponentAliases(new Set(sortedTokens.map((token) => token.id)))
  for (const [name, value] of aliases) {
    lines.push(`  --${name}: ${value};`)
  }
  lines.push("}")
  lines.push("")

  const css = `${lines.join("\n")}\n`
  writeFile(args.out, css)

  const sourceRows = Object.entries(sourceStats)
    .sort((left, right) => left[0].localeCompare(right[0]))
    .map(([name, count]) => `| ${name} | ${count} |`)
    .join("\n")

  const manifest = `# DR Token Import Manifest

Generated: ${new Date().toISOString()}

## Sources

| Source | Tokens |
| --- | --- |
${sourceRows}

## Outputs

- CSS token system: \`${path.relative(REPO_ROOT, args.out)}\`
- Token manifest: \`${path.relative(REPO_ROOT, args.manifestOut)}\`

## Components in this test run

- Avatar
- Button
- Checkbox
- Input
- Label
- Radio
`

  writeFile(args.manifestOut, manifest)

  console.log(`Generated ${sortedTokens.length} tokens.`)
  console.log(`CSS: ${args.out}`)
  console.log(`Manifest: ${args.manifestOut}`)
}

main()
