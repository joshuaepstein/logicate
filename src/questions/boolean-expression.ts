export enum BooleanExpressionDifficulty {
  Easy,
  Medium,
  Hard,
  Challenging,
}

type Operator = "∧" | "∨" | "⊕"
type SimpleOperand = string | BooleanExpression
type Operand = { value: SimpleOperand; isNegated: boolean }

export class BooleanExpression {
  left: Operand
  right: Operand
  operator: Operator
  private usedVariables: string[]

  private static variables = ["A", "B", "C", "D", "E", "F", "G", "H"]

  constructor(left: SimpleOperand, right: SimpleOperand, operator: Operator, leftNegated = false, rightNegated = false) {
    this.left = { value: left, isNegated: leftNegated }
    this.right = { value: right, isNegated: rightNegated }
    this.operator = operator
    this.usedVariables = []
  }

  displayAsString(): string {
    const formatOperand = (operand: Operand): string => {
      const str = typeof operand.value === "string" ? operand.value : `(${operand.value.displayAsString()})`
      return operand.isNegated ? `¬${str}` : str
    }

    const leftStr = formatOperand(this.left)
    const rightStr = formatOperand(this.right)
    return `${leftStr} ${this.operator} ${rightStr}`
  }

  private selectVariable(): string {
    const unusedVariables = BooleanExpression.variables.filter((v) => !this.usedVariables.includes(v))

    if (unusedVariables.length === 0) {
      return this.usedVariables[Math.floor(Math.random() * this.usedVariables.length)]
    }

    if (Math.random() < 0.3 && this.usedVariables.length > 0) {
      return this.usedVariables[Math.floor(Math.random() * this.usedVariables.length)]
    }

    const newVar = unusedVariables[0]
    this.usedVariables.push(newVar)
    return newVar
  }

  static generateRandom(difficulty: BooleanExpressionDifficulty, usedVariables: string[] = [], depth: number = 0): BooleanExpression {
    const operators: Operator[] = ["∧", "∨"]
    const expr = new BooleanExpression("A", "B", "∧")
    expr.usedVariables = [...usedVariables]

    let maxDepth: number
    let negationProbability: number
    let complexityProbability: number

    switch (difficulty) {
      case BooleanExpressionDifficulty.Easy:
        maxDepth = 1
        negationProbability = 0.1
        complexityProbability = 0
        break
      case BooleanExpressionDifficulty.Medium:
        maxDepth = 2
        negationProbability = 0.2
        complexityProbability = 0.3
        break
      case BooleanExpressionDifficulty.Hard:
        maxDepth = 3
        negationProbability = 0.3
        complexityProbability = 0.6
        break
      case BooleanExpressionDifficulty.Challenging:
        maxDepth = 4
        negationProbability = 0.4
        complexityProbability = 0.8
        break
    }

    function generateOperand(currentDepth: number): SimpleOperand {
      if (currentDepth >= maxDepth || Math.random() > complexityProbability) {
        return expr.selectVariable()
      } else {
        return BooleanExpression.generateRandom(difficulty, expr.usedVariables, currentDepth + 1)
      }
    }

    const left = generateOperand(depth)
    const right = generateOperand(depth)
    const operator = operators[Math.floor(Math.random() * operators.length)]
    const leftNegated = Math.random() < negationProbability
    const rightNegated = Math.random() < negationProbability

    return new BooleanExpression(left, right, operator, leftNegated, rightNegated)
  }
  simplify(): BooleanExpression {
    const simplifyOperand = (operand: Operand): Operand => {
      if (typeof operand.value === "string") {
        return operand
      }
      const simplifiedValue = operand.value.simplify()
      return {
        value: simplifiedValue,
        isNegated: operand.isNegated !== simplifiedValue.left.isNegated,
      }
    }

    let left = simplifyOperand(this.left)
    let right = simplifyOperand(this.right)

    // Apply De Morgan's laws
    if (this.left.isNegated && typeof this.left.value === "object") {
      const innerExpr = this.left.value
      if (innerExpr.operator === "∧") {
        return new BooleanExpression(
          new BooleanExpression(
            innerExpr.left.value,
            innerExpr.left.isNegated ? "¬" + innerExpr.left.value : innerExpr.left.value,
            "∨",
            true
          ),
          new BooleanExpression(
            innerExpr.right.value,
            innerExpr.right.isNegated ? "¬" + innerExpr.right.value : innerExpr.right.value,
            "∨",
            true
          ),
          "∨"
        ).simplify()
      } else if (innerExpr.operator === "∨") {
        return new BooleanExpression(
          new BooleanExpression(
            innerExpr.left.value,
            innerExpr.left.isNegated ? "¬" + innerExpr.left.value : innerExpr.left.value,
            "∧",
            true
          ),
          new BooleanExpression(
            innerExpr.right.value,
            innerExpr.right.isNegated ? "¬" + innerExpr.right.value : innerExpr.right.value,
            "∧",
            true
          ),
          "∧"
        ).simplify()
      }
    }

    // Handle double negation
    if (left.isNegated && typeof left.value === "object" && left.value.left.isNegated) {
      left = { ...left.value.left, isNegated: false }
    }
    if (right.isNegated && typeof right.value === "object" && right.value.left.isNegated) {
      right = { ...right.value.left, isNegated: false }
    }

    // Simplify based on operator
    if (this.operator === "∧") {
      if (left.value === "true" && !left.isNegated)
        return new BooleanExpression(right.value, right.isNegated ? "¬" + right.value : right.value, "∧")
      if (right.value === "true" && !right.isNegated)
        return new BooleanExpression(left.value, left.isNegated ? "¬" + left.value : left.value, "∧")
      if (left.value === "false" && !left.isNegated) return new BooleanExpression("false", "false", "∧")
      if (right.value === "false" && !right.isNegated) return new BooleanExpression("false", "false", "∧")
    } else if (this.operator === "∨") {
      if (left.value === "true" && !left.isNegated) return new BooleanExpression("true", "false", "∨")
      if (right.value === "true" && !right.isNegated) return new BooleanExpression("true", "false", "∨")
      if (left.value === "false" && !left.isNegated)
        return new BooleanExpression(right.value, right.isNegated ? "¬" + right.value : right.value, "∨")
    }

    // If no simplification rules apply, return a new BooleanExpression
    return new BooleanExpression(left.value, right.value, this.operator, left.isNegated, right.isNegated)
  }

  static areEqual(expr1: BooleanExpression, expr2: BooleanExpression): boolean {
    const simplifiedExpr1 = expr1.simplify()
    const simplifiedExpr2 = expr2.simplify()

    return (
      simplifiedExpr1.operator === simplifiedExpr2.operator &&
      BooleanExpression.areOperandsEqual(simplifiedExpr1.left, simplifiedExpr2.left) &&
      BooleanExpression.areOperandsEqual(simplifiedExpr1.right, simplifiedExpr2.right)
    )
  }

  private static areOperandsEqual(operand1: Operand, operand2: Operand): boolean {
    if (operand1.isNegated !== operand2.isNegated) {
      return false
    }

    if (typeof operand1.value === "string" && typeof operand2.value === "string") {
      return operand1.value === operand2.value
    }

    if (typeof operand1.value === "object" && typeof operand2.value === "object") {
      return BooleanExpression.areEqual(operand1.value, operand2.value)
    }

    return false
  }

  toJSON(): object {
    return {
      left: this.serializeOperand(this.left),
      right: this.serializeOperand(this.right),
      operator: this.operator,
    }
  }

  private serializeOperand(operand: Operand): object {
    return {
      value: typeof operand.value === "string" ? operand.value : operand.value.toJSON(),
      isNegated: operand.isNegated,
      isExpression: typeof operand.value !== "string",
    }
  }

  static fromJSON(json: any): BooleanExpression {
    const left = BooleanExpression.deserializeOperand(json.left)
    const right = BooleanExpression.deserializeOperand(json.right)
    return new BooleanExpression(left.value, right.value, json.operator as Operator, left.isNegated, right.isNegated)
  }

  private static deserializeOperand(json: any): Operand {
    let value: SimpleOperand
    if (json.isExpression) {
      value = BooleanExpression.fromJSON(json.value)
    } else {
      value = json.value
    }
    return { value, isNegated: json.isNegated }
  }
}
