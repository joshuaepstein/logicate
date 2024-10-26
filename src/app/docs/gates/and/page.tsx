import DocBody from "../../components/doc-body"
import DocHeader from "../../components/doc-header"
import { DocList, DocListItem } from "../../components/doc-list"
import DocParagraph from "../../components/doc-paragraph"
import DocSection from "../../components/doc-section"
import DocSubtitle from "../../components/doc-subtitle"
import DocSummary from "../../components/doc-summary"
import {
  DocTable,
  DocTableBody,
  DocTableCaption,
  DocTableCell,
  DocTableHead,
  DocTableHeader,
  DocTableRow,
} from "../../components/doc-table"
import DocTitle, { DocTitle2 } from "../../components/doc-title"
import Documentation from "../../components/documentation"
import AndInteractive from "../../components/interactve/pre-built/and"

export default function Page() {
  return (
    <Documentation>
      <DocHeader>
        <DocTitle>AND Gate</DocTitle>
        <DocSummary>An in-depth look at the AND gate and how it works in digital circuits.</DocSummary>
      </DocHeader>

      <DocBody>
        {/* Section 1: Introduction */}
        <DocSection>
          <DocTitle2>Introduction</DocTitle2>
          <DocSubtitle>What is an AND Gate?</DocSubtitle>

          <DocParagraph>
            An AND gate is a basic component in digital electronics that takes two inputs and produces an output. It’s called an "AND" gate
            because it only produces a true (or "1") output when both of its inputs are true.
          </DocParagraph>
        </DocSection>

        {/* Section 2: How It Works */}
        <DocSection>
          <DocTitle2>How It Works</DocTitle2>
          <DocSubtitle>Understanding the AND Gate Logic</DocSubtitle>

          <DocParagraph>
            Think of an AND gate as a test that requires both conditions to be met before it gives a "yes" answer. If both input conditions
            are true, the output is true. If one or both inputs are false, the output will be false.
          </DocParagraph>
        </DocSection>

        {/* Section 3: Truth Table */}
        <DocSection>
          <DocTitle2>Truth Table</DocTitle2>
          <DocSubtitle>Seeing the AND Gate's Rules in Action</DocSubtitle>

          <DocParagraph>
            The truth table is a simple way to see how an AND gate behaves with different inputs. Here’s what the table looks like:
          </DocParagraph>

          <DocTable className="max-w-xl">
            <DocTableHeader>
              <DocTableHead>Input A</DocTableHead>
              <DocTableHead>Input B</DocTableHead>
              <DocTableHead>Output</DocTableHead>
            </DocTableHeader>
            <DocTableBody>
              <DocTableRow>
                <DocTableCell>0</DocTableCell>
                <DocTableCell>0</DocTableCell>
                <DocTableCell>0</DocTableCell>
              </DocTableRow>
              <DocTableRow>
                <DocTableCell>0</DocTableCell>
                <DocTableCell>1</DocTableCell>
                <DocTableCell>0</DocTableCell>
              </DocTableRow>
              <DocTableRow>
                <DocTableCell>1</DocTableCell>
                <DocTableCell>0</DocTableCell>
                <DocTableCell>0</DocTableCell>
              </DocTableRow>
              <DocTableRow>
                <DocTableCell>1</DocTableCell>
                <DocTableCell>1</DocTableCell>
                <DocTableCell>1</DocTableCell>
              </DocTableRow>
            </DocTableBody>

            <DocTableCaption className="text-left">
              In this table, the output is "1" (true) only when both Input A and Input B are "1" (true).
            </DocTableCaption>
          </DocTable>
        </DocSection>

        {/* Section 4: Visual Representation */}
        <DocSection>
          <DocTitle2>Interactive Diagram</DocTitle2>
          <DocSubtitle>Interactive diagram of an AND Gate</DocSubtitle>

          <DocParagraph>
            Here is a canvas which you can interact with to simulate the AND gate. There are two switches (inputs) and one light (output).
            The light will turn on only if both switches are on.
          </DocParagraph>

          <AndInteractive />
        </DocSection>

        {/* Section 5: Example Use */}
        <DocSection>
          <DocTitle2>Example Use</DocTitle2>
          <DocSubtitle>Where We Use AND Gates in Real Life</DocSubtitle>

          <DocParagraph>
            AND gates are used in circuits where two conditions need to be met at the same time.
            <br /> For example, in a security system, an alarm might only sound if both the front door and a window are opened, which would
            require both conditions (inputs) to be true.
          </DocParagraph>
        </DocSection>

        {/* Section 6: Key Points to Remember */}
        <DocSection>
          <DocTitle2>Key Points to Remember</DocTitle2>
          <DocSubtitle>Quick Facts about the AND Gate</DocSubtitle>

          <DocList>
            <DocListItem>An AND gate has two (or more) inputs but only one output.</DocListItem>
            <DocListItem>The output is true (1) only if all inputs are true (1).</DocListItem>
            <DocListItem>It’s a fundamental building block in digital electronics and computers.</DocListItem>
          </DocList>
        </DocSection>
      </DocBody>
    </Documentation>
  )
}
