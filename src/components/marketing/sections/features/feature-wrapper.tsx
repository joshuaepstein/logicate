import React from "react"

export default function FeatureWrapper({ children, ...props }: React.ComponentPropsWithoutRef<"section"> & { children: React.ReactNode }) {
  return (
    <section id={props.id} className="flex min-h-[25dvh] w-full scroll-mt-16 items-center justify-center bg-neutralgrey-200 py-12">
      <div className="container flex flex-col items-center justify-center">{children}</div>
    </section>
  )
}
