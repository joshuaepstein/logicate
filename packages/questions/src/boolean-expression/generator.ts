const randomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * @description A list of variables that can be used in a boolean expression. This does not include V or N as they could be confused with an AND or OR symbol.
 */
const variables = ["A", "B", "C", "D"];

const operators = {
  and: {
    symbol: "∧",
    precedence: 2,
  },
  or: {
    symbol: "∨",
    precedence: 2,
  },
  not: {
    symbol: "¬",
    precedence: 3,
  },
};

export type BooleanExpression =
  | { type: "variable"; value: string }
  | { type: "not"; expression: BooleanExpression }
  | { type: "and" | "or"; left: BooleanExpression; right: BooleanExpression };

function generateBooleanExpression(
  difficulty: "easy" | "medium" | "hard",
): BooleanExpression {
  const maxDepth = difficulty === "easy" ? 2 : difficulty === "medium" ? 3 : 4;

  function generate(depth: number): BooleanExpression {
    if (depth >= maxDepth || (depth > 0 && Math.random() < 0.3)) {
      return { type: "variable", value: randomItem(variables) };
    }

    const operatorType = randomItem(["and", "or", "not"]);
    if (operatorType === "not") {
      const innerExpression = generate(depth + 1);
      if (innerExpression.type === "variable") {
        // If the inner expression is just a variable, force it to be an 'and' or 'or'
        return {
          type: randomItem(["and", "or"]) as "and" | "or",
          left: innerExpression,
          right: generate(depth + 1),
        };
      }
      return { type: "not", expression: innerExpression };
    } else {
      return {
        type: operatorType as "and" | "or",
        left: generate(depth + 1),
        right: generate(depth + 1),
      };
    }
  }

  let expression: BooleanExpression;
  do {
    expression = generate(0);
  } while (
    expression.type === "not" &&
    expression.expression.type === "variable"
  );

  return expression;
}

export function beautifyBooleanExpression(expr: BooleanExpression): string {
  switch (expr.type) {
    case "variable":
      return expr.value;
    case "not":
      return `${operators.not.symbol}${beautifyBooleanExpression(expr.expression)}`;
    case "and":
    case "or":
      const left = beautifyBooleanExpression(expr.left);
      const right = beautifyBooleanExpression(expr.right);
      const symbol = operators[expr.type].symbol;
      return `(${left} ${symbol} ${right})`;
  }
}

// Example usage:
const expression = generateBooleanExpression("easy");
console.log(expression);
console.log(beautifyBooleanExpression(expression));
