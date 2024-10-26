import { PropsWithChildren } from "react"

export default function DocPageLayout({ children }: PropsWithChildren) {
  return <div className="flex h-full grow flex-col items-start justify-start text-left">{children}</div>
}
