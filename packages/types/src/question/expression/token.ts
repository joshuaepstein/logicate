export type Token = {
  type: 'operator' | 'operand';
  value: string;
};

export const isOperator = (token: Token): token is Token => token.type === 'operator';
export const isOperand = (token: Token): token is Token => token.type === 'operand';
