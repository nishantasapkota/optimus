'use client'

import { toast as sonnerToast } from "sonner"

/**
 * Compatibility wrapper for sonner toast to replace the custom useToast hook.
 * This allows the entire system to use sonner without changing all component imports.
 */

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

function toast({ title, description, variant, ...props }: ToastProps) {
  if (variant === "destructive") {
    return sonnerToast.error(title || description, {
      description: title ? description : undefined,
      ...props
    })
  }

  return sonnerToast.success(title || description, {
    description: title ? description : undefined,
    ...props
  })
}

function useToast() {
  return {
    toast,
    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  }
}

export { useToast, toast }
