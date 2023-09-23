import * as React from "react"

import { cn } from "@/libs/utils"

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className,  ...props }, ref) => {
    return (
      <textarea 
        className={cn(
          "flex w-full bg-background focus:outline-none text-[20px]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextArea.displayName = "TextArea"

export { TextArea }
