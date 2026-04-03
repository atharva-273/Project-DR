# QA Checklist

## Component Rendering
- [ ] avatar/default: renders correctly and uses semantic aliases only
- [ ] avatar/sm: renders correctly and uses semantic aliases only
- [ ] avatar/lg: renders correctly and uses semantic aliases only
- [ ] button/default: renders correctly and uses semantic aliases only
- [ ] button/outline: renders correctly and uses semantic aliases only
- [ ] button/ghost: renders correctly and uses semantic aliases only
- [ ] checkbox/default: renders correctly and uses semantic aliases only
- [ ] input/default: renders correctly and uses semantic aliases only
- [ ] label/default: renders correctly and uses semantic aliases only
- [ ] radio-group/default: renders correctly and uses semantic aliases only

## Validation
- [ ] `pnpm --dir next-app lint`
- [ ] `pnpm --dir next-app typecheck`
- [ ] No hardcoded one-off color literals in changed component files
- [ ] Visual comparison completed against Figma screenshots
- [ ] Figma docs updated and Code Connect mapping saved
