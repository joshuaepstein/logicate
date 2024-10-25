import { cn } from '@/lib'
import React from 'react'

/**
 * @deprecated Use FeatureTag, FeatureTitle, and FeatureDescription instead
 *
 * ! Set for removal in next push
 *
 */
export default function FeatureTitleCombined({
  title,
  description,
  section,
  colourClass,
}: {
  title: string
  description: string
  section: string
  colourClass: string
}) {
  return (
    <>
      <p className={cn(`text-2xs scale-100 select-none font-mono font-medium transition hover:scale-105`, colourClass)}>{section}</p>
      <h4 className="text-neutralgrey-1200 mt-2 text-center text-2xl font-medium">{title}</h4>
      <p className="text-neutralgrey-1000/85 mt-2 max-w-lg text-center">{description}</p>
    </>
  )
}

export const FeatureTag = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className }, ref) => {
    return (
      <p ref={ref} className={cn(`text-2xs scale-100 select-none font-mono font-medium transition hover:scale-105`, className)}>
        {children}
      </p>
    )
  }
)

export const FeatureTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className }, ref) => {
    return (
      <h4 ref={ref} className={cn(`text-neutralgrey-1200 mt-2 text-center text-2xl font-medium`, className)}>
        {children}
      </h4>
    )
  }
)

export const FeatureDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className }, ref) => {
    return (
      <p ref={ref} className={cn(`text-neutralgrey-1000/85 mt-2 max-w-lg text-center`, className)}>
        {children}
      </p>
    )
  }
)
