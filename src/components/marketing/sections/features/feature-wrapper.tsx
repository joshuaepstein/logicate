import React from 'react'

export default function FeatureWrapper({ children, ...props }: React.ComponentPropsWithoutRef<'section'> & { children: React.ReactNode }) {
  return (
    <section id={props.id} className="bg-neutralgrey-200 flex min-h-[25dvh] w-full scroll-mt-16 items-center justify-center py-12">
      <div className="container flex flex-col items-center justify-center">{children}</div>
    </section>
  )
}