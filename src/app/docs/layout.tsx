import { PropsWithChildren } from "react"
import DocAside from "./doc-aside"
import DocPageLayout from "./doc-page-layout"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto mb-16 flex w-full flex-row items-start justify-center gap-8 pt-10">
      <DocAside />
      <DocPageLayout>{children}</DocPageLayout>
    </div>
  )
}
