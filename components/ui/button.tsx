// components/ui/button.tsx
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "ghost" 
  | "destructive" 
  | "success" 
  | "glass"

export type ButtonSize = "sm" | "default" | "lg" | "xl" | "icon"

export type ButtonAnimation = "none" | "pulse" | "bounce" | "glow"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  animation?: ButtonAnimation
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const getVariantClasses = (variant: ButtonVariant = "primary") => {
  const variants = {
    primary: "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 font-bold shadow-md",
    secondary: "glass-card border border-accent/30 text-white hover:border-accent/50 hover:bg-white/5 backdrop-blur-md",
    outline: "border-2 border-yellow-400/50 bg-transparent text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors",
    ghost: "bg-transparent text-white/80 hover:bg-white/10 hover:text-white",
    destructive: "bg-red-500 text-white hover:bg-red-600 hover:scale-105",
    success: "bg-green-500 text-white hover:bg-green-600 hover:scale-105",
    glass: "glass-strong border border-accent/30 text-white hover:border-yellow-400 hover:shadow-yellow-400/20 hover:shadow-lg backdrop-blur-md",
  }
  return variants[variant]
}

const getSizeClasses = (size: ButtonSize = "default") => {
  const sizes = {
    sm: "h-9 px-3 text-xs",
    default: "h-11 px-6 py-3",
    lg: "h-12 px-8 py-4 text-base",
    xl: "h-14 px-10 py-4 text-lg",
    icon: "h-10 w-10",
  }
  return sizes[size]
}

const getAnimationClasses = (animation: ButtonAnimation = "none") => {
  const animations = {
    none: "",
    pulse: "animate-pulse",
    bounce: "hover:animate-bounce",
    glow: "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-accent/0 after:via-accent/10 after:to-accent/0 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
  }
  return animations[animation]
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "default", 
    animation = "none",
    loading = false,
    icon,
    iconPosition = "left",
    children, 
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group"

    return (
      <button
        className={cn(
          baseClasses,
          getVariantClasses(variant),
          getSizeClasses(size),
          getAnimationClasses(animation),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Content container */}
        <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {icon && iconPosition === "left" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          
          {children}
          
          {icon && iconPosition === "right" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </div>

        {/* Hover effect overlay for primary variant */}
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/10 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
