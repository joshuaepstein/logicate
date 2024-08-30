import { sample } from "lodash";

const operators = ["∧", "∨"];
const variables = "ABCDEFGHIJKLMPQRSTUWXYZ".split("");

function generateBooleanExpression(difficulty: number): string {
  const maxDepth = Math.floor(difficulty / 2) + 1;
  const maxVariables = Math.min(5, Math.floor(difficulty / 2) + 2);

  function generateSubExpression(depth: number): string {
    if (depth >= maxDepth || Math.random() < 0.3) {
      const variable = sample(variables.slice(0, maxVariables))!;
      return Math.random() < 0.3 ? `¬${variable}` : variable;
    }

    const left = generateSubExpression(depth + 1);
    const right = generateSubExpression(depth + 1);
    const operator = sample(operators)!;

    return `(${left} ${operator} ${right})`;
  }

  return generateSubExpression(0);
}

console.log(generateBooleanExpression(1)); // Might output: A
console.log(generateBooleanExpression(3)); // Might output: (A ∨ ¬B)
console.log(generateBooleanExpression(5)); // Might output: ((A ∧ B) ∨ (¬C → D))
