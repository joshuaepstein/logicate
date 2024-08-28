import { beautifyBooleanExpression, BooleanExpression } from "./generator";

const expression: BooleanExpression = {
  type: "and",
  left: {
    type: "or",
    left: { type: "variable", value: "C" },
    right: { type: "variable", value: "C" },
  },
  right: {
    type: "and",
    left: { type: "variable", value: "C" },
    right: { type: "variable", value: "B" },
  },
};

const incorrectAnswer: BooleanExpression = {
  type: "or",
  left: { type: "variable", value: "C" },
  right: { type: "variable", value: "B" },
};

interface Token {
  type: "operand" | "operator";
  value: string;
}

function stringifyExpression(expression: BooleanExpression): string {
  return beautifyBooleanExpression(expression);
}

function tokenise(expression: string): Token[] {
  const regex = /([A-Za-z]+)|([&|!()]+)/g;
  const tokens: Token[] = [];
  let match;

  while ((match = regex.exec(expression)) !== null) {
    if (/[A-Za-z]/.test(match[0])) {
      tokens.push({ type: "operand", value: match[0] });
    } else {
      tokens.push({ type: "operator", value: match[0] });
    }
  }

  return tokens;
}

function generateCombinations(operands: string[]): boolean[][] {
  const combinations: boolean[][] = [];
  const n = operands.length;

  for (let i = 0; i < 1 << n; i++) {
    const combination = Array(n)
      .fill(false)
      .map((_, bit) => Boolean(i & (1 << bit)));
    combinations.push(combination);
  }

  return combinations;
}

function evaluateExpression(
  expression: string,
  operandValues: Record<string, boolean>,
): boolean {
  const formattedExpression = expression.replace(
    /\b[A-Za-z]\b/g,
    (match) => `${operandValues[match]}`,
  );
  return new Function(`return ${formattedExpression}`)();
}

const createMostSimplifiedExpression = (expression: string) => {
  const tokens = tokenise(expression);
  const operandsSet = new Set<string>();
  tokens.forEach((token) => {
    if (token.type === "operand") operandsSet.add(token.value);
  });
  const operands = Array.from(operandsSet);
  const combinations = generateCombinations(operands);
  for (const combination of combinations) {
    const operandValues = Object.fromEntries(
      operands.map((operand, index) => [operand, combination[index]]),
    );
    var result1 = evaluateExpression(expression, operandValues);
    console.log(result1);
    console.log(operandValues);
  }
};

createMostSimplifiedExpression("(!D && !A)");

function isExpressionEquivalent(expr1: string, expr2: string): boolean {
  const tokens1 = tokenise(expr1);
  const tokens2 = tokenise(expr2);

  const operandsSet = new Set<string>();
  tokens1.forEach((token) => {
    if (token.type === "operand") operandsSet.add(token.value);
  });
  tokens2.forEach((token) => {
    if (token.type === "operand") operandsSet.add(token.value);
  });

  const operands = Array.from(operandsSet);
  const combinations = generateCombinations(operands);

  for (const combination of combinations) {
    const operandValues = Object.fromEntries(
      operands.map((operand, index) => [operand, combination[index]]),
    );
    var result1 = evaluateExpression(expr1, operandValues);
    var result2 = evaluateExpression(expr2, operandValues);
    // @ts-ignore
    if (result2 === 1) result2 = true;
    // @ts-ignore
    if (result2 === 0) result2 = false;
    if (result1 !== result2) {
      return false;
    }
  }

  return true;
}

// const tokenised = tokenise("(!D && !A)");
// console.log(tokenised);
// const operandsset = new Set<string>();
// tokenised.forEach((token) => {
//   if (token.type === "operand") operandsset.add(token.value);
// });
// console.log(generateCombinations(Array.from(operandsset)));
// console.log(isExpressionEquivalent(expression, incorrectAnswer));
