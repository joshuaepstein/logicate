import DocHeader from "./components/doc-header"
import DocTitle from "./components/doc-title"
import Documentation from "./components/documentation"

export default function DocsPage() {
  return (
    <Documentation>
      <DocHeader>
        <DocTitle>Welcome to the docs</DocTitle>
      </DocHeader>
    </Documentation>
  )
}
