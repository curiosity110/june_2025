// components/ui/button.tsx
import { cn } from "@/lib/utils"

export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "bg-highlight text-black font-semibold px-6 py-3 rounded-md hover:scale-105 transition",
        className
      )}
      {...props}
    />
  )
}
