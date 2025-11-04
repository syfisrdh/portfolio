'use client'

import { useToast } from '@/hooks/use-toast'
import { CheckCircle2 } from 'lucide-react'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="glass-strong">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="!top-20 !right-0 sm:!right-4 sm:!top-20 !left-auto !bottom-auto !flex-col" />
    </ToastProvider>
  )
}
