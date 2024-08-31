import {
  AndOperator,
  BooleanExpression,
} from "@logicate/types/question/expression/boolean";

export function simplifyBooleanExpression(
  expression: BooleanExpression,
): BooleanExpression {
  if (expression.type !== "compound") return expression;

  const left = simplifyBooleanExpression(expression.left);
  const right = expression.right
    ? simplifyBooleanExpression(expression.right)
    : undefined;

  // Apply simplification rules
  if (isConstant(left, true))
    return expression.operator === AndOperator ? right || left : left;
  if (isConstant(left, false))
    return expression.operator === AndOperator ? left : right || left;
  if (right && isConstant(right, true))
    return expression.operator === AndOperator ? left : right;
  if (right && isConstant(right, false))
    return expression.operator === AndOperator ? right : left;

  // Simplify identical operands
  if (right && areEqual(left, right)) return left;

  // Simplify nested expressions with the same operator
  if (left.type === "compound" && left.operator === expression.operator) {
    return {
      type: "compound",
      operator: expression.operator,
      left: left.left,
      right: simplifyBooleanExpression({
        type: "compound",
        operator: expression.operator,
        left: left.right!,
        right: right,
      }),
    };
  }

  return { ...expression, left, right };
}

function isConstant(expr: BooleanExpression, value: boolean): boolean {
  return expr.type === "constant" && expr.constant === (value ? 1 : 0);
}

function areEqual(a: BooleanExpression, b: BooleanExpression): boolean {
  if (a.type !== b.type) return false;
  if (a.type === "variable") return a.variable === (b as any).variable;
  if (a.type === "constant") return a.constant === (b as any).constant;
  if (a.type === "compound" && b.type === "compound") {
    return (
      a.operator === b.operator &&
      areEqual(a.left, b.left) &&
      areEqual(a.right!, b.right!)
    );
  }
  return false;
}
