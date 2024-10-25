import { BooleanExpression } from "@/questions/boolean-expression"
import { GateType } from "./node/gates/types"
import { GateItem, InputItem, Item, OutputItem, Wire } from "./types"

// TODO: CODE DOES NOT WORK PROPERLY - RE-WRITE

export function convertCanvasToExpression(items: Item[], wires: Wire[]): BooleanExpression | string | null {
  // Find the output item(s)
  const outputItems = items.filter((item) => item.itemType === "output") as OutputItem[]
  if (outputItems.length === 0) {
    return null
  }

  // For simplicity, assume there is only one output
  const outputItem = outputItems[0]

  // Build the expression starting from the output item
  return buildExpression(outputItem.id, items, wires)
}

function buildExpression(itemId: string, items: Item[], wires: Wire[]): BooleanExpression | string {
  const item = items.find((item) => item.id === itemId)
  if (!item) {
    throw new Error(`Item with id ${itemId} not found`)
  }

  if (item.itemType === "input") {
    // Return the variable associated with this input
    const inputItem = item as InputItem
    const variableName = inputItem.settings.expressionLetter || inputItem.id
    return inputItem.settings.constant && inputItem.value ? "true" : variableName
  } else if (item.itemType === "gate") {
    // Get the input wires for this gate
    const inputWires = wires.filter((wire) => wire.to.id === itemId)
    const inputExpressions: (BooleanExpression | string)[] = []

    for (const wire of inputWires) {
      const expr = buildExpression(wire.from.id, items, wires)
      inputExpressions.push(expr)
    }

    const gateItem = item as GateItem
    const gateType = gateItem.type

    // Convert gate type to operator and handle inversions
    const { operator, isNegated } = gateTypeToOperator(gateType)

    if (inputExpressions.length === 0) {
      throw new Error(`Gate with id ${itemId} has no inputs`)
    } else if (inputExpressions.length === 1) {
      // For unary gates like NOT
      const operand = inputExpressions[0]
      return new BooleanExpression(
        operand,
        operand, // Placeholder, as our BooleanExpression requires two operands
        operator,
        isNegated, // Negate if needed
        false
      ).simplify()
    } else {
      // For gates with multiple inputs
      let expr = new BooleanExpression(inputExpressions[0], inputExpressions[1], operator, false, false)

      for (let i = 2; i < inputExpressions.length; i++) {
        expr = new BooleanExpression(expr, inputExpressions[i], operator, false, false)
      }

      // Apply negation if gate is inverted (e.g., NAND, NOR)
      return isNegated ? new BooleanExpression(expr, "", "∧", true, false).simplify() : expr
    }
  } else if (item.itemType === "output") {
    // Get the input wire for this output
    const outputItem = item as OutputItem
    const inputWire = wires.find((wire) => wire.to.id === itemId)
    if (!inputWire) {
      throw new Error(`Output with id ${itemId} has no input wire`)
    }

    const expr = buildExpression(inputWire.from.id, items, wires)
    return expr
  } else {
    throw new Error(`Unknown item type when building expression`)
  }
}

function gateTypeToOperator(gateType: GateType): { operator: "∧" | "∨" | "⊕"; isNegated: boolean } {
  switch (gateType) {
    case GateType.AND:
    case GateType.BUFFER:
      return { operator: "∧", isNegated: false }
    case GateType.OR:
      return { operator: "∨", isNegated: false }
    case GateType.NOT:
    case GateType.NAND:
      return { operator: "∧", isNegated: true } // Unary operator, negation applied
    case GateType.NOR:
      return { operator: "∨", isNegated: true }
    case GateType.XOR:
      // XOR needs special handling; here's a simple representation
      return { operator: "⊕", isNegated: false }
    case GateType.XNOR:
      return { operator: "⊕", isNegated: true }
    default:
      throw new Error(`Unknown gate type: ${gateType}`)
  }
}
