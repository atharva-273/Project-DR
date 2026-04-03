# ShadCN -> Tokenized Components -> Figma Docs

This workflow operationalizes the following batch contract:

- `components`: ShadCN component names with expected variants/states
- `tokens`: Figma token exports (`name`, `value`, `type`, `mode`)
- `figma_target`: destination Figma URL for documentation

## Prerequisites

- ShadCN skill installed in Codex
- Figma MCP configured and authenticated
- ShadCN MCP configured in `~/.codex/config.toml`

## Batch File

Start from:

- `next-app/workflows/shadcn-token-figma/batch.example.json`
- contract reference: `next-app/workflows/shadcn-token-figma/batch.schema.json`

## Run Pipeline

From repo root:

```bash
pnpm --dir next-app workflow:run -- --batch workflows/shadcn-token-figma/batch.example.json --write-css
```

Optional flags:

- `--install` runs `pnpm dlx shadcn@latest add ...` in the target workspace
- `--validate-only` checks contract only and skips file generation
- `--out <dir>` writes generated artifacts to a custom location

## DR Token Import (ZIP Exports)

When token updates are provided as ZIP exports from Figma, first extract them into:

- `.tmp/dr-tokens/colors/Mode 1.tokens.json`
- `.tmp/dr-tokens/typography/Mode 1.tokens.json`
- `.tmp/dr-tokens/style/Mode 1.tokens.json`
- `.tmp/dr-tokens/breakpoints/*.tokens.json`

Then run:

```bash
pnpm --dir next-app tokens:dr:generate
```

This regenerates `next-app/app/dr-token-system.css` and writes a manifest in `docs/workflows/batches/<batchId>/`.

## Generated Artifacts

For each batch, the runner writes:

- `docs/workflows/batches/<batchId>/01-shadcn-add-command.txt`
- `docs/workflows/batches/<batchId>/02-workflow-tokens.css`
- `docs/workflows/batches/<batchId>/03-component-token-mapping.md`
- `docs/workflows/batches/<batchId>/04-figma-handoff.md`
- `docs/workflows/batches/<batchId>/05-qa-checklist.md`

When `--write-css` is used, it also updates:

- `next-app/app/workflow-tokens.css`

This file is already imported by `next-app/app/globals.css`.

## Execution Standard Per Batch

1. Validate batch contract and generate artifacts.
2. Install requested ShadCN components (`--install`) or run generated install command manually.
3. Apply token aliases in component variants/classes; use semantic aliases only.
4. Run quality gates:
   - `pnpm --dir next-app lint`
   - `pnpm --dir next-app typecheck`
5. Execute Figma handoff instructions in `04-figma-handoff.md`:
   - update docs page
   - record anatomy/variants/states/tokens
   - save Code Connect mappings

## Notes

- Token conflicts should be resolved via semantic aliases, not one-off component literals.
- If Figma URL lacks `node-id`, add it before final documentation handoff so Code Connect mapping can target exact nodes.
- Code Connect write operations require a Figma Developer seat in an Organization/Enterprise plan.
