enum Difficulty {
  Easy,
  Medium,
  Hard,
  Challenging,
}

type Operator = '∧' | '∨'
type SimpleOperand = string | BooleanExpression
type Operand = { value: SimpleOperand; isNegated: boolean }

class BooleanExpression {
  left: Operand
  right: Operand
  operator: Operator
  private usedVariables: string[]

  private static variables = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  constructor(left: SimpleOperand, right: SimpleOperand, operator: Operator, leftNegated = false, rightNegated = false) {
    this.left = { value: left, isNegated: leftNegated }
    this.right = { value: right, isNegated: rightNegated }
    this.operator = operator
    this.usedVariables = []
  }

  displayAsString(): string {
    const formatOperand = (operand: Operand): string => {
      let str = typeof operand.value === 'string' ? operand.value : `(${operand.value.displayAsString()})`
      return operand.isNegated ? `¬${str}` : str
    }

    const leftStr = formatOperand(this.left)
    const rightStr = formatOperand(this.right)
    return `${leftStr} ${this.operator} ${rightStr}`
  }

  private selectVariable(): string {
    const unusedVariables = BooleanExpression.variables.filter((v) => !this.usedVariables.includes(v))

    // If there are no unused variables, reuse any used variable
    if (unusedVariables.length === 0) {
      return this.usedVariables[Math.floor(Math.random() * this.usedVariables.length)]
    }

    // have a chance to use the same variable
    if (Math.random() < 0.3 && this.usedVariables.length > 0) {
      return this.usedVariables[Math.floor(Math.random() * this.usedVariables.length)]
    }

    const newVar = unusedVariables[0]
    this.usedVariables.push(newVar)
    return newVar
  }

  static generateRandom(difficulty: Difficulty, usedVariables: string[] = [], depth: number = 0): BooleanExpression {
    const operators: Operator[] = ['∧', '∨']
    const expr = new BooleanExpression('A', 'B', '∧') // Temporary, will be overwritten
    expr.usedVariables = [...usedVariables]

    let maxDepth: number
    let negationProbability: number
    let complexityProbability: number

    switch (difficulty) {
      case Difficulty.Easy:
        maxDepth = 1
        negationProbability = 0.1
        complexityProbability = 0
        break
      case Difficulty.Medium:
        maxDepth = 2
        negationProbability = 0.2
        complexityProbability = 0.3
        break
      case Difficulty.Hard:
        maxDepth = 3
        negationProbability = 0.3
        complexityProbability = 0.6
        break
      case Difficulty.Challenging:
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

  simplify(): BooleanExpression | string {
    const simplifyOperand = (operand: Operand): Operand => {
      if (typeof operand.value === 'string') {
        if (operand.value === 'true' && operand.isNegated) return { value: 'false', isNegated: false }
        if (operand.value === 'false' && operand.isNegated) return { value: 'true', isNegated: false }
        return operand
      }
      const simplifiedValue = operand.value.simplify()
      if (typeof simplifiedValue === 'string') {
        if (simplifiedValue === 'true' && operand.isNegated) return { value: 'false', isNegated: false }
        if (simplifiedValue === 'false' && operand.isNegated) return { value: 'true', isNegated: false }
        return { value: simplifiedValue, isNegated: operand.isNegated }
      }
      return {
        value: simplifiedValue,
        isNegated: operand.isNegated !== simplifiedValue.left.isNegated,
      }
    }

    let left = simplifyOperand(this.left)
    let right = simplifyOperand(this.right)

    // Handle cases with 'true' and 'false'
    if (left.value === 'true' && !left.isNegated) {
      return this.operator === '∧' ? right.value : 'true'
    }
    if (left.value === 'false' && !left.isNegated) {
      return this.operator === '∧' ? 'false' : right.value
    }
    if (right.value === 'true' && !right.isNegated) {
      return this.operator === '∧' ? left.value : 'true'
    }
    if (right.value === 'false' && !right.isNegated) {
      return this.operator === '∧' ? 'false' : left.value
    }

    // Idempotence: A ∧ A = A, A ∨ A = A
    if (BooleanExpression.areOperandsEqual(left, right)) {
      return left.value
    }

    // Complementation: A ∧ ¬A = false, A ∨ ¬A = true
    if (
      typeof left.value === 'string' &&
      typeof right.value === 'string' &&
      left.value === right.value &&
      left.isNegated !== right.isNegated
    ) {
      return this.operator === '∧' ? 'false' : 'true'
    }

    // If no simplification rules apply, return a new BooleanExpression
    return new BooleanExpression(left.value, right.value, this.operator, left.isNegated, right.isNegated)
  }

  static areEqual(expr1: BooleanExpression | string, expr2: BooleanExpression | string): boolean {
    const simplifiedExpr1 = typeof expr1 === 'string' ? expr1 : expr1.simplify()
    const simplifiedExpr2 = typeof expr2 === 'string' ? expr2 : expr2.simplify()

    if (typeof simplifiedExpr1 === 'string' || typeof simplifiedExpr2 === 'string') {
      return simplifiedExpr1 === simplifiedExpr2
    }

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

    if (typeof operand1.value === 'string' && typeof operand2.value === 'string') {
      return operand1.value === operand2.value
    }

    if (typeof operand1.value === 'object' && typeof operand2.value === 'object') {
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
      value: typeof operand.value === 'string' ? operand.value : operand.value.toJSON(),
      isNegated: operand.isNegated,
      isExpression: typeof operand.value !== 'string',
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

// Example usage:
console.log('Generating expressions for each difficulty level:')
Object.values(Difficulty)
  .filter((v) => typeof v === 'number')
  .forEach((difficulty: Difficulty) => {
    console.log(`\nDifficulty: ${Difficulty[difficulty]}`)
    for (let i = 0; i < 3; i++) {
      const randomExpr = BooleanExpression.generateRandom(difficulty)
      console.log(`Expression ${i + 1}:`, randomExpr.displayAsString())
      const simplifiedRandomExpr = randomExpr.simplify()
      console.log(`Simplified:`, typeof simplifiedRandomExpr === 'string' ? simplifiedRandomExpr : simplifiedRandomExpr.displayAsString())
    }
  })
