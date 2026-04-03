import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-[var(--dr-component-control-radius)] border-[var(--dr-component-control-border-width)] border-[var(--dr-component-input-border)] bg-[var(--dr-component-input-bg)] px-2.5 py-1 text-base text-[var(--dr-component-input-fg)] shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--dr-component-input-fg)] placeholder:text-[var(--dr-component-input-placeholder)] focus-visible:border-[var(--dr-component-input-ring)] focus-visible:ring-3 focus-visible:ring-[var(--dr-component-input-ring-soft)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
