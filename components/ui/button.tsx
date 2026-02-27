import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[1.5] active:scale-[0.98] rounded-full hover:scale-[1.02] motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        default:
          "bg-teal-500 text-white shadow-sm hover:bg-teal-600 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-teal-300 text-teal-700 bg-teal-50 shadow-sm hover:bg-teal-100 hover:border-teal-400",
        secondary:
          "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-teal-600 underline-offset-4 hover:underline rounded-none hover:scale-100 active:scale-100",
        pill: "rounded-full bg-teal-500 text-white shadow-sm hover:bg-teal-600 hover:shadow-md",
      },
      size: {
        default: "h-10 px-5 py-2 [&_svg]:size-4",
        sm: "h-9 rounded-full px-4 text-xs [&_svg]:size-3.5",
        lg: "h-11 rounded-full px-8 [&_svg]:size-5",
        icon: "h-10 w-10 rounded-full [&_svg]:size-5",
        "icon-sm": "h-9 w-9 rounded-full [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
