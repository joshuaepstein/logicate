interface Token {
  type: "operand" | "operator";
  value: string;
}

function tokenise(expression: string): Token[] {
  const regex = /([A-Za-z]+)|([∧∨¬()]+)/g;
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

function generateTruthTable(expression: string) {
  const tokens = tokenise(expression);
  const variables = Array.from(
    new Set(
      tokens
        .filter((token) => token.type === "operand")
        .map((token) => token.value),
    ),
  );
  const table: {
    [key: string]: boolean;
  }[] = [];

  // Generate all possible combinations of true/false for variables
  for (let i = 0; i < Math.pow(2, variables.length); i++) {
    const row: { [key: string]: boolean } = {};
    variables.forEach((variable, index) => {
      row[variable] = (i & (1 << (variables.length - 1 - index))) !== 0;
    });

    // Evaluate the expression
    const result = evaluateExpression(expression, row);
    row[expression] = result;

    table.push(row);
  }

  return table;
}

function evaluateExpression(
  expression: string,
  operandValues: Record<string, boolean>,
): boolean {
  const formattedExpression = expression
    .replace(/\b[A-Za-z]\b/g, (match) => `${operandValues[match]}`)
    .replace(/∨/g, "||")
    .replace(/∧/g, "&&")
    .replace(/¬/g, "!");
  return new Function(`return ${formattedExpression}`)();
}

// Usage
const truthTable = generateTruthTable("¬(b∨d)∧(b∨¬d)");
console.log(truthTable);
