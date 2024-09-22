'use client';

import { BooleanExpressionGenerator, createString } from '@logicate/questions/boolean-expression/generator';
import { simplifyBooleanExpression } from '@logicate/questions/boolean-expression/simplifier';
import { BooleanExpression, ExpressionDifficulty } from '@logicate/types/question/expression/boolean';
import { Button } from '@logicate/ui/button';
import { useState } from 'react';

export default function GenTemp() {
  const [expression, setExpression] = useState<BooleanExpression | null>(null);
  const [string, setString] = useState<string>('');
  const [simplified, setSimplified] = useState<string>('');

  return (
    <>
      <Button
        onClick={() => {
          const booleanExpression = new BooleanExpressionGenerator(ExpressionDifficulty.EASY);
          const expression = booleanExpression.generateExpression();
          setExpression(expression);
          setString(createString(expression));
          setSimplified(createString(simplifyBooleanExpression(expression)));
        }}
      >
        Generate
      </Button>
      <div>{string}</div>
      <div>{simplified.slice(1, -1)}</div>
    </>
  );
}
