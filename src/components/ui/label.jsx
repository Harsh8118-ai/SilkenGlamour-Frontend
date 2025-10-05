import * as React from "react"

export const Label = React.forwardRef(({ className, children, htmlFor, ...props }, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={(
        "text-sm font-medium text-[#3E2B2A] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
})

Label.displayName = "Label"
