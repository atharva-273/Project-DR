# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## ShadCN + Figma workflow

This project includes a batch-based workflow runner:

```bash
pnpm --dir next-app workflow:run -- --batch workflows/shadcn-token-figma/batch.example.json --write-css
```

For DR token updates from Figma ZIP exports:

```bash
pnpm --dir next-app tokens:dr:generate
```

Reference docs:

- `docs/workflows/shadcn-token-figma-workflow.md`
- `next-app/workflows/shadcn-token-figma/batch.schema.json`
- `next-app/workflows/shadcn-token-figma/batch.example.json`
