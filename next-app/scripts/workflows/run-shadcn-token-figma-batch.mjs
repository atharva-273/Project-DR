#!/usr/bin/env node

import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const NEXT_APP_ROOT = path.resolve(__dirname, "../..")
const REPO_ROOT = path.resolve(NEXT_APP_ROOT, "..")

function parseArgs(argv) {
  const args = {
    batchPath: null,
    outDir: null,
    install: false,
    writeCss: false,
    validateOnly: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i]
    if (current === "--") {
      continue
    }
    if (current === "--batch") {
      args.batchPath = argv[i + 1]
      i += 1
      continue
    }
    if (current === "--out") {
      args.outDir = argv[i + 1]
      i += 1
      continue
    }
    if (current === "--install") {
      args.install = true
      continue
    }
    if (current === "--write-css") {
      args.writeCss = true
      continue
    }
    if (current === "--validate-only") {
      args.validateOnly = true
      continue
    }
    if (current === "--help" || current === "-h") {
      printHelp()
      process.exit(0)
    }
    throw new Error(`Unknown argument: ${current}`)
  }

  if (!args.batchPath) {
    throw new Error("Missing required argument: --batch <path-to-json>")
  }

  return args
}

function printHelp() {
  console.log(`ShadCN -> Tokenized Components -> Figma Docs batch runner

Usage:
  node scripts/workflows/run-shadcn-token-figma-batch.mjs --batch workflows/shadcn-token-figma/batch.example.json [options]

Options:
  --out <dir>         Custom output folder for generated artifacts.
  --install           Run "pnpm dlx shadcn@latest add ..." for batch components.
  --write-css         Write generated token CSS to app/workflow-tokens.css.
  --validate-only     Validate and print summary only (no generated files).
  --help, -h          Show this help message.
`)
}

function ensureString(value) {
  return typeof value === "string" && value.trim().length > 0
}

function normalizeName(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function parseJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8")
  return JSON.parse(raw)
}

function parseFigmaTarget(figmaTarget) {
  const parsed = {
    url: figmaTarget?.url ?? "",
    fileKey: figmaTarget?.fileKey ?? "",
    nodeId: figmaTarget?.nodeId ?? "",
    pageName: figmaTarget?.pageName ?? "Component Docs",
  }

  if (!ensureString(parsed.url)) {
    return parsed
  }

  try {
    const url = new URL(parsed.url)
    const parts = url.pathname.split("/").filter(Boolean)
    if (!parsed.fileKey) {
      if (parts[0] === "design" && ensureString(parts[1])) {
        parsed.fileKey = parts[1]
      } else if (parts[0] === "make" && ensureString(parts[1])) {
        parsed.fileKey = parts[1]
      }
    }

    if (!parsed.nodeId) {
      const nodeParam = url.searchParams.get("node-id")
      if (nodeParam) {
        parsed.nodeId = nodeParam.replace(/-/g, ":")
      }
    }
  } catch {
    // URL shape validation is handled in validateBatch.
  }

  return parsed
}

function validateBatch(batch) {
  const errors = []
  if (!batch || typeof batch !== "object") {
    errors.push("Batch must be a JSON object.")
    return errors
  }

  if (!ensureString(batch.batchId)) {
    errors.push("batchId is required.")
  }

  if (!Array.isArray(batch.components) || batch.components.length === 0) {
    errors.push("components must be a non-empty array.")
  } else {
    batch.components.forEach((component, index) => {
      if (!ensureString(component?.name)) {
        errors.push(`components[${index}].name is required.`)
      }
    })
  }

  if (!Array.isArray(batch.tokens) || batch.tokens.length === 0) {
    errors.push("tokens must be a non-empty array.")
  } else {
    batch.tokens.forEach((token, index) => {
      if (!ensureString(token?.name)) {
        errors.push(`tokens[${index}].name is required.`)
      }
      if (!ensureString(token?.value)) {
        errors.push(`tokens[${index}].value is required.`)
      }
      if (!ensureString(token?.type)) {
        errors.push(`tokens[${index}].type is required.`)
      }
      if (!ensureString(token?.mode)) {
        errors.push(`tokens[${index}].mode is required.`)
      }
    })
  }

  if (!batch.figma_target || typeof batch.figma_target !== "object") {
    errors.push("figma_target is required.")
  } else {
    if (!ensureString(batch.figma_target.url)) {
      errors.push("figma_target.url is required.")
    } else {
      try {
        const url = new URL(batch.figma_target.url)
        if (!url.hostname.includes("figma.com")) {
          errors.push("figma_target.url must be a figma.com URL.")
        }
      } catch {
        errors.push("figma_target.url is not a valid URL.")
      }
    }
  }

  return errors
}

function buildCssPayload(batch) {
  const tokensByMode = new Map()
  const knownTokenNames = new Set()

  for (const token of batch.tokens) {
    const tokenName = normalizeName(token.name)
    const mode = normalizeName(token.mode || "light") || "light"
    const varName = `--token-${tokenName}`
    knownTokenNames.add(tokenName)

    if (!tokensByMode.has(mode)) {
      tokensByMode.set(mode, [])
    }

    tokensByMode.get(mode).push({
      line: `  ${varName}: ${token.value};`,
      source: token.name,
    })
  }

  const aliasesByMode = new Map()
  const unresolvedAliases = []
  for (const alias of batch.semanticAliases ?? []) {
    const mode = normalizeName(alias.mode || "light") || "light"
    const aliasName = normalizeName(alias.name)
    const tokenName = normalizeName(alias.token)

    if (!knownTokenNames.has(tokenName)) {
      unresolvedAliases.push(
        `semanticAliases "${alias.name}" references missing token "${alias.token}"`
      )
    }

    if (!aliasesByMode.has(mode)) {
      aliasesByMode.set(mode, [])
    }
    aliasesByMode
      .get(mode)
      .push(`  --${aliasName}: var(--token-${tokenName});`)
  }

  const rootTokens = tokensByMode.get("light") ?? []
  const darkTokens = tokensByMode.get("dark") ?? []
  const rootAliases = aliasesByMode.get("light") ?? []
  const darkAliases = aliasesByMode.get("dark") ?? []

  const additionalModes = [...new Set([...tokensByMode.keys(), ...aliasesByMode.keys()])]
    .filter((mode) => mode !== "light" && mode !== "dark")
    .sort()

  const additionalModeBlocks = additionalModes
    .map((mode) => {
      const tokenLines = (tokensByMode.get(mode) ?? []).map((entry) => entry.line)
      const aliasLines = aliasesByMode.get(mode) ?? []
      const body = [...tokenLines, ...aliasLines].join("\n")
      if (!body) {
        return ""
      }
      return `[data-theme="${mode}"] {\n${body}\n}`
    })
    .filter(Boolean)

  const rootBlock = [":root {", ...rootTokens.map((entry) => entry.line), ...rootAliases, "}"].join(
    "\n"
  )
  const darkBlock = [".dark {", ...darkTokens.map((entry) => entry.line), ...darkAliases, "}"].join(
    "\n"
  )

  const css = `/* Auto-generated by scripts/workflows/run-shadcn-token-figma-batch.mjs */\n${rootBlock}\n\n${darkBlock}${
    additionalModeBlocks.length > 0 ? `\n\n${additionalModeBlocks.join("\n\n")}` : ""
  }\n`

  return { css, unresolvedAliases }
}

function markdownTable(headers, rows) {
  const head = `| ${headers.join(" | ")} |`
  const separator = `| ${headers.map(() => "---").join(" | ")} |`
  const body = rows.map((row) => `| ${row.join(" | ")} |`).join("\n")
  return [head, separator, body].filter(Boolean).join("\n")
}

function formatList(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return "-"
  }
  return values.join(", ")
}

function buildMappingMarkdown(batch, figma) {
  const componentRows = batch.components.map((component) => [
    component.name,
    formatList(component.variants),
    formatList(component.states),
    component.codePath ?? "-",
  ])
  const componentTable = markdownTable(
    ["Component", "Variants", "States", "Code Path"],
    componentRows
  )

  const aliasRows = (batch.semanticAliases ?? []).map((alias) => [
    alias.name,
    alias.token,
    alias.mode ?? "light",
    alias.description ?? "-",
  ])
  const aliasTable =
    aliasRows.length > 0
      ? markdownTable(["Semantic Alias", "Token", "Mode", "Description"], aliasRows)
      : "_No semantic aliases supplied._"

  const mappingRows = (batch.componentTokenMappings ?? []).map((mapping) => [
    mapping.component,
    mapping.slot,
    mapping.alias,
    mapping.notes ?? "-",
  ])
  const slotTable =
    mappingRows.length > 0
      ? markdownTable(["Component", "Slot", "Alias", "Notes"], mappingRows)
      : "_No component slot mappings supplied._"

  return `# Component + Token Mapping

## Batch
- Batch ID: \`${batch.batchId}\`
- Workspace: \`${batch.workspace || "next-app"}\`
- Figma URL: ${figma.url}
- Figma fileKey: \`${figma.fileKey || "missing"}\`
- Figma nodeId: \`${figma.nodeId || "missing"}\`

## Components
${componentTable}

## Semantic Aliases
${aliasTable}

## Component Slot Mapping
${slotTable}
`
}

function buildFigmaHandoffMarkdown(batch, figma) {
  const codeMappings = batch.components
    .map((component) => {
      const sourcePath = component.codePath ?? `next-app/components/ui/${component.name}.tsx`
      return `  {\n    componentName: "${component.name}",\n    label: "React",\n    nodeId: "<replace-with-figma-node-id>",\n    source: "${sourcePath}"\n  }`
    })
    .join(",\n")

  return `# Figma Handoff

## Target
- Page Name: \`${figma.pageName}\`
- URL: ${figma.url}
- fileKey: \`${figma.fileKey || "missing"}\`
- nodeId: \`${figma.nodeId || "missing"}\`

## MCP Execution Order
1. Run \`get_design_context(fileKey, nodeId)\` for each component node.
2. Run \`get_screenshot(fileKey, nodeId)\` for visual parity checks.
3. Ensure code paths are finalized in this batch's mapping file.
4. Save Code Connect mappings with:

\`\`\`ts
send_code_connect_mappings({
  fileKey: "${figma.fileKey || "<fileKey>"}",
  nodeId: "${figma.nodeId || "<parent-doc-node-id>"}",
  mappings: [
${codeMappings}
  ]
})
\`\`\`

## QA Gate
- Every component variant/state in this batch is represented in Figma docs.
- Token alias names in Figma docs match aliases in \`03-component-token-mapping.md\`.
- Code Connect source paths are resolvable.
- Code Connect write access requires a Figma Developer seat in an Organization/Enterprise plan.
`
}

function buildQaChecklistMarkdown(batch) {
  const checks = batch.components.flatMap((component) => {
    const variants = component.variants?.length ? component.variants : ["default"]
    return variants.map(
      (variant) =>
        `- [ ] ${component.name}/${variant}: renders correctly and uses semantic aliases only`
    )
  })

  return `# QA Checklist

## Component Rendering
${checks.length > 0 ? checks.join("\n") : "- [ ] No components specified"}

## Validation
- [ ] \`pnpm --dir next-app lint\`
- [ ] \`pnpm --dir next-app typecheck\`
- [ ] No hardcoded one-off color literals in changed component files
- [ ] Visual comparison completed against Figma screenshots
- [ ] Figma docs updated and Code Connect mapping saved
`
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, "utf8")
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const batchFile = path.resolve(process.cwd(), args.batchPath)
  const batch = parseJsonFile(batchFile)
  const errors = validateBatch(batch)

  if (errors.length > 0) {
    console.error("Batch validation failed:")
    for (const error of errors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  const workspaceDir = path.resolve(REPO_ROOT, batch.workspace || "next-app")
  if (!fs.existsSync(workspaceDir)) {
    console.error(`Workspace directory does not exist: ${workspaceDir}`)
    process.exit(1)
  }

  const figma = parseFigmaTarget(batch.figma_target)
  const componentNames = [...new Set(batch.components.map((component) => component.name.trim()))]
  const installCommand = `pnpm dlx shadcn@latest add ${componentNames.join(" ")}`

  const { css, unresolvedAliases } = buildCssPayload(batch)
  const outputDir =
    args.outDir !== null
      ? path.resolve(process.cwd(), args.outDir)
      : path.join(REPO_ROOT, "docs", "workflows", "batches", batch.batchId)

  if (!args.validateOnly) {
    fs.mkdirSync(outputDir, { recursive: true })
    writeFile(path.join(outputDir, "01-shadcn-add-command.txt"), `${installCommand}\n`)
    writeFile(path.join(outputDir, "02-workflow-tokens.css"), css)
    writeFile(path.join(outputDir, "03-component-token-mapping.md"), buildMappingMarkdown(batch, figma))
    writeFile(path.join(outputDir, "04-figma-handoff.md"), buildFigmaHandoffMarkdown(batch, figma))
    writeFile(path.join(outputDir, "05-qa-checklist.md"), buildQaChecklistMarkdown(batch))
  }

  if (args.install) {
    console.log(`Installing components in workspace: ${workspaceDir}`)
    execSync(installCommand, { cwd: workspaceDir, stdio: "inherit" })
  }

  if (args.writeCss) {
    const workflowCssPath = path.join(workspaceDir, "app", "workflow-tokens.css")
    writeFile(workflowCssPath, `${css}`)
    console.log(`Wrote workflow token CSS: ${workflowCssPath}`)
  }

  console.log("Batch validated successfully.")
  console.log(`Batch ID: ${batch.batchId}`)
  console.log(`Components: ${componentNames.join(", ")}`)
  console.log(`Figma fileKey: ${figma.fileKey || "missing"}`)
  console.log(`Figma nodeId: ${figma.nodeId || "missing"}`)
  console.log(`Install command: ${installCommand}`)
  if (!args.validateOnly) {
    console.log(`Generated artifacts: ${outputDir}`)
  }
  if (unresolvedAliases.length > 0) {
    console.log("Warnings:")
    for (const warning of unresolvedAliases) {
      console.log(`- ${warning}`)
    }
  }
}

main()
