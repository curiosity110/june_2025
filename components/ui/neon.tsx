"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from 'react';

type NeonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { glow?: boolean };

export function NeonButton({
  className,
  children,
  glow = true,
  ...props
}: NeonButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
      <button
        className={cn(
          "relative inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm tracking-wide bg-neutral-900/70 backdrop-blur border border-white/10 text-white overflow-hidden transition",
          glow && "btn-neon",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children as ReactNode}</span>
        <span className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-r from-fuchsia-600/20 via-amber-400/20 to-cyan-400/20" />
      </button>
    </motion.div>
  );
}

export function NeonCard({
  className,
  children,
  as: Tag = "div",
  hover = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { as?: any; hover?: boolean }) {
  return (
    <Tag
      className={cn(
        "relative card-neon neon-border rounded-2xl p-6 overflow-hidden",
        hover && "hover-raise",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
