import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-[var(--dr-colors-tokens-style-border-border-neutral-neutral-01)] bg-[var(--dr-colors-tokens-style-background-bg-neutral-neutral-01)] p-6">
      <h2 className="text-lg font-semibold text-[var(--dr-colors-tokens-style-typography-primary-text-primary-01)]">
        {title}
      </h2>
      <p className="mt-1 text-sm text-[var(--dr-colors-tokens-style-typography-secondary-text-secondary-01)]">
        {description}
      </p>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function ShadcnLibraryPage() {
  return (
    <main className="min-h-screen bg-[var(--dr-colors-tokens-style-background-bg-secondary-secondary-01)] p-8 md:p-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-xl border border-[var(--dr-colors-tokens-style-border-border-secondary-secondary-01)] bg-[var(--dr-colors-tokens-style-background-bg-neutral-neutral-01)] p-6">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--dr-colors-tokens-style-typography-primary-text-primary-01)]">
            ShadCN Base Components
          </h1>
          <p className="mt-2 text-sm text-[var(--dr-colors-tokens-style-typography-secondary-text-secondary-01)]">
            Source: local `components/ui/*` from ShadCN with DR token styling
            applied.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section
            title="Avatar"
            description="ShadCN Avatar root/fallback/group with DR token aliases."
          >
            <div className="flex flex-wrap items-center gap-4">
              <Avatar size="sm">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <AvatarGroup>
                <Avatar size="sm">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Avatar size="sm">
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+3</AvatarGroupCount>
              </AvatarGroup>
            </div>
          </Section>

          <Section
            title="Button"
            description="ShadCN button variants styled through DR aliases."
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Section>

          <Section
            title="Checkbox + Label"
            description="ShadCN checkbox paired with label and disabled state."
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="terms" defaultChecked />
                <Label htmlFor="terms">Accept terms</Label>
              </div>
              <div className="flex items-center gap-2 opacity-70">
                <Checkbox id="disabled-terms" disabled />
                <Label htmlFor="disabled-terms">Disabled option</Label>
              </div>
            </div>
          </Section>

          <Section
            title="Input"
            description="ShadCN input with default, filled, and disabled states."
          >
            <div className="flex flex-col gap-3">
              <Input placeholder="Placeholder text" />
              <Input defaultValue="Alex Morgan" />
              <Input defaultValue="Disabled value" disabled />
            </div>
          </Section>

          <Section
            title="Radio Group"
            description="ShadCN radio-group with preselected value and labels."
          >
            <RadioGroup defaultValue="professional">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="starter" id="starter" />
                <Label htmlFor="starter">Starter</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional">Professional</Label>
              </div>
              <div className="flex items-center gap-2 opacity-70">
                <RadioGroupItem value="enterprise" id="enterprise" disabled />
                <Label htmlFor="enterprise">Enterprise (disabled)</Label>
              </div>
            </RadioGroup>
          </Section>
        </div>
      </div>
    </main>
  )
}
