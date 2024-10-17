import { Alphabet } from '@/app/ui/canvas/types'

export type BooleanExpression =
  | {
      left: BooleanExpression
      operator?: BooleanOperator
      right?: BooleanExpression
      type: 'compound'
    }
  | {
      variable: BooleanVariable
      type: 'variable'
    }
  | {
      constant: BooleanConstant
      type: 'constant'
    }

export type BooleanOperator = '∧' | '∨' | '¬'

export const AndOperator: BooleanOperator = '∧'
export const OrOperator: BooleanOperator = '∨'
export const NotOperator: BooleanOperator = '¬'

export type BooleanVariable = Alphabet

export enum BooleanConstant {
  TRUE = 1,
  FALSE = 0,
}

export const BooleanVariables: BooleanVariable[] = 'ABCDEFGHJKLMNPQRSTUWXYZ'.split('') as BooleanVariable[]

export enum ExpressionDifficulty {
  /**
   * For users who are new to boolean algebra and/or creating simple logic gates or filling out truth tables.
   */
  EASY = 1, // This means that it will set the depth to 1 - allowing each side of the expression to generate 1 element.
  /**
   * For users who have some experience with boolean algebra and/or creating logic gates.
   */
  MEDIUM = 2, // This means that it will set the depth to 2 - allowing each side of the expression to generate at most 2 elements.
  /**
   * For users who are comfortable with boolean algebra and/or creating logic gates.
   */
  HARD = 3, // This means that it will set the depth to 3 - allowing each side of the expression to generate at most 3 elements.
  /**
   * For extra hard stuff that will make your head spin.
   */
  CHALLENGING = 4, // This means that it will set the depth to 4 - allowing each side of the expression to generate at most 4 elements.
  /**
   * For users who are insane.
   */
  EXTREME = 5, // This means that it will set the depth to 5 - allowing each side of the expression to generate at most 5 elements.
}
