# PROJECT DR — SINGLE-SCREEN PILOT WORKFLOW (Codex-ready)

## Purpose
Validate a Figma → code workflow by building **one screen** to be as close as possible to **100% pixel perfect** while:
- reusing the existing **shadcn/ui** + **design system**
- keeping customization controlled and documented
- producing clear, auditable documentation before implementation

---

## Ground rules
1. **One screen only** (do not “explore” the product yet)
2. **Figma is the visual benchmark** for pixel-perfect comparison
3. **shadcn/ui + design system** is the implementation backbone
4. Prefer reuse over creating new primitives
5. No uncontrolled overrides:
   - do not use arbitrary hex codes / random px values
   - do not introduce one-off spacing if a system spacing can be used
6. Customization is allowed only when justified:
   - document the gap and the chosen solution
7. Document first, then build.

---

## Workflow phases (Codex execution order)

### Phase 0 — Intake (docs-only)
**Output file:** `docs/pilot/00-intake.md`

Codex must capture:
- project context (this pilot)
- repo structure summary
- screen name + intended route
- Figma file/frame reference
- what’s included (static UI vs states)
- what’s excluded (global navigation, responsive breakpoints, etc.)

### Phase 1 — System audit (docs-only)
**Output file:** `docs/pilot/01-system-audit.md`

Codex must inspect:
- `components/ui/` shadcn components available
- any internal design system tokens/utilities
- layout shell and composition patterns already present
- constraints and recommended patterns to follow

Deliverables:
- system “you must use these first” components
- list of missing pieces expected in pilot

### Phase 2 — Screen extraction (docs-only)
**Output file:** `docs/pilot/02-screen-extraction.md`

Codex must extract from Figma:
- screen layout zones (top bar / sidebar / content / modals)
- key typography styles and hierarchy
- spacing rhythm
- interactive states required for the pilot (hover/active/focus only if visible in Figma)
- assets required (icons/images)

No code yet.

### Phase 3 — Component mapping (docs-only)
**Output file:** `docs/pilot/03-component-mapping.md`

Codex must map every screen element to:
- existing shadcn component (preferred)
- existing internal component (preferred)
- **only if required**: new variant, wrapper, or new component

Every “customization” entry must include:
- reason (gap)
- proposed change (variant/wrapper/new component)
- whether it should be upstreamed into the design system

### Phase 4 — Architecture spec (docs-only)
**Output file:** `docs/pilot/04-architecture.md`

Codex must produce a build-ready plan:
- file names + folder structure (e.g. `components/screens/<ScreenName>/<parts>.tsx`)
- component tree
- state boundaries (what props/state live where)
- styling approach per section (Tailwind + classnames utilities)
- accessibility considerations (focus ring, labels, aria, headings)
- verification plan (Figma cross-check points)

This is the “blueprint.” Implementation should be mostly mechanical after this.

### Phase 5 — Checklist (docs-only)
**Output file:** `docs/pilot/05-checklist.md`

Codex must create an actionable checklist covering:
- layout correctness
- typography correctness
- colors (tokens)
- state coverage
- accessibility and usability
- code quality (lint/type)
- pixel-perfect verification steps

This checklist must be used to declare the pilot “done.”

### Phase 6 — Implementation (code + docs)
**Outputs:**
- screen code (under `components/screens/` + used in the intended route)
- updated design system tokens/variants only if justified
- `docs/pilot/06-implementation.md` (optional but recommended)

Codex builds according to the spec and references the checklists. Any deviation must be explained and documented in `06-implementation.md`.

### Phase 7 — Verification (docs-only)
**Output file:** `docs/pilot/07-verification.md`

Codex must produce a verification report:
- list of mismatches vs Figma (by element)
- screenshots/notes (if Codex supports)
- decisions: which mismatches are acceptable vs must-fix
- final yes/no for the pilot (based on checklist)

---

## Roles (agent responsibilities)

### Architect (doc-first)
- intake → audit → extraction → mapping → spec → checklist
- aim: “someone could build from this spec without reopening Figma”

### Builder (implementation)
- implement based on spec
- enforce “reuse first” and “tokens first”

### Auditor (verification)
- verify checklist and produce mismatch report

Codex can perform all roles sequentially.

---

## Folder expectations
- `docs/pilot/00-intake.md`
- `docs/pilot/01-system-audit.md`
- `docs/pilot/02-screen-extraction.md`
- `docs/pilot/03-component-mapping.md`
- `docs/pilot/04-architecture.md`
- `docs/pilot/05-checklist.md`
- (implementation)
- `docs/pilot/07-verification.md`

---

## Codex handshake: “ready to implement”
Codex must not implement until it has created and reviewed:
- `00-intake`
- `01-system-audit`
- `02-screen-extraction`
- `03-component-mapping`
- `04-architecture`
- `05-checklist`

Only then proceed to implementation.

---

## Pilot success definition
Pilot passes when:
- all `05-checklist` items are satisfied, and
- `07-verification` declares the screen a pass, and
- documentation is complete with no missing sections, and
- any design-system customizations are justified and documented.
