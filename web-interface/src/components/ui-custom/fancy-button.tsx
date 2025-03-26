import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

export function FancyButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "px-2",
        "relative transition duration-200 ease-in-out shadow-lg",
        "outline outline-2 outline-transparent ring-0 ring-offset-2 ring-offset-gray-800",
        "hover:outline-primary hover:scale-105",
        "active:scale-95",
        className
      )}

      {...props}
    />
  )
}
