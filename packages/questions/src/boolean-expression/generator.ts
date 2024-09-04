import {
  AndOperator,
  BooleanConstant,
  BooleanExpression,
  BooleanOperator,
  BooleanVariable,
  BooleanVariables,
  ExpressionDifficulty,
  OrOperator,
} from "@logicate/types/question/expression/boolean";
import { simplifyBooleanExpression } from "./simplifier";

/**
 * Get a random boolean value based on the chance
 * @param chance A number between 1 and 100 for the chance of returning true
 */
const chance = (chance: number) => Math.random() < chance / 100;

const randomOf = (array: any[]) => array[Math.floor(Math.random() * array.length)];

export class BooleanExpressionGenerator {
  private static operators: BooleanOperator[] = [AndOperator, OrOperator];
  private static variables: BooleanVariable[] = BooleanVariables;
  private currentDepth: number = 0;
  private maxDepth: number;
  private usedVariables: BooleanVariable[] = [];

  // private currentExpression: BooleanExpression | null | undefined;

  public static selectOperator(): BooleanOperator {
    return randomOf(this.operators);
  }

  /**
   * This function selects a variable. It has a 50% chance of selecting a variable which has already been used,
   * and a 50% chance of selecting a variable which has not been used. (Will select the next alphabetical variable which hasn't been used)
   * @returns The variable selected (Letter only)
   * @example "A"
   */
  public selectVariable(): BooleanExpression {
    if (chance(25)) {
      return {
        variable: randomOf(this.usedVariables) ?? BooleanVariables[0],
        type: "variable",
      };
    } else {
      const unusedVariables = BooleanExpressionGenerator.variables.filter(
        (variable) => !this.usedVariables.includes(variable),
      );
      this.usedVariables.push(unusedVariables[0]);
      return {
        variable: unusedVariables[0] ?? BooleanVariables[0],
        type: "variable",
      };
    }
  }

  private selectConstant(): BooleanExpression {
    return {
      constant: randomOf([BooleanConstant.TRUE, BooleanConstant.FALSE]),
      type: "constant",
    };
  }

  constructor(difficulty: ExpressionDifficulty) {
    this.maxDepth = difficulty;
    this.usedVariables = [];
    this.currentDepth = 0;
  }

  private difficultyToChance(): number {
    let chance: number = 0;
    switch (this.maxDepth) {
      case ExpressionDifficulty.EASY:
        chance = 70;
        break;
      case ExpressionDifficulty.MEDIUM:
        chance = 65;
        break;
      case ExpressionDifficulty.HARD:
        chance = 60;
        break;
      case ExpressionDifficulty.CHALLENGING:
        chance = 55;
        break;
      case ExpressionDifficulty.EXTREME:
        chance = 50;
        break;
    }
    return chance;
  }

  public generateExpression(): BooleanExpression {
    if (this.currentDepth >= this.maxDepth) {
      // Base case: return a simple expression (variable or constant)
      return this.generateSimpleExpression();
    }

    if (chance(40) && this.currentDepth > 0) {
      return this.selectVariable();
    }
    if (chance(20) && this.currentDepth > 0) {
      return this.selectConstant();
    }

    const operator = BooleanExpressionGenerator.selectOperator();
    const left = chance(this.difficultyToChance()) ? this.generateSimpleExpression() : this.generateExpression();
    const right = chance(this.difficultyToChance()) ? this.generateSimpleExpression() : this.generateExpression();

    const expression: BooleanExpression = {
      operator,
      left,
      right,
      type: "compound",
    };

    this.currentDepth++;

    return expression;
  }

  private generateSimpleExpression(): BooleanExpression {
    if (chance(40)) {
      return chance(50) ? this.selectVariable() : this.selectConstant();
    }
    return {
      operator: BooleanExpressionGenerator.selectOperator(),
      left: this.selectVariable(),
      right: this.selectVariable(),
      type: "compound",
    };
  }
}

export default BooleanExpressionGenerator;

export { ExpressionDifficulty };

export function createString(expression: BooleanExpression): string {
  // Check if the expression is the parent expression (e.g. the root)
  if (expression.type === "variable") {
    return expression.variable;
  } else if (expression.type === "constant") {
    return expression.constant.toString();
  } else if (expression.type === "compound") {
    return `(${createString(expression.left)} ${expression.operator}${expression.right ? " " + createString(expression.right) : ""})`;
  } else {
    return "ERROR";
  }
}

const generator = new BooleanExpressionGenerator(ExpressionDifficulty.EASY);
const expression = generator.generateExpression();
console.log(expression);

console.log(createString(expression));

const simplified = simplifyBooleanExpression(expression);
console.log("Simplified:", createString(simplified));
