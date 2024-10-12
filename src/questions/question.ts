// import type { QuestionType } from '@logicate/database'

export enum QuestionType {
  BOOLEAN_EXPRESSION = 'BOOLEAN_EXPRESSION',
  TRUTH_TABLE = 'TRUTH_TABLE',
  LOGIC_GATE = 'LOGIC_GATE',
}

export enum AnswerType {
  SIMPLIFIED_BOOLEAN_EXPRESSION = 'SIMPLIFIED_BOOLEAN_EXPRESSION',
  FILLED_IN_TRUTH_TABLE = 'FILLED_IN_TRUTH_TABLE',
  SIMPLIFIED_LOGIC_GATE = 'SIMPLIFIED_LOGIC_GATE',
}

export class Question {
  private _questionType: QuestionType
  // private questionData: BooleanExpression | TruthTable | LogicGate
  private questionData: BooleanExpression

  private _answerType!: AnswerType
  private answerData!: BooleanExpression | string

  constructor(questionType: QuestionType, questionData: any, answerType?: AnswerType, answerData?: any) {
    this._questionType = questionType
    this.questionData = questionData

    if (answerType !== undefined && answerData !== undefined) {
      this._answerType = answerType
      this.answerData = answerData
    } else {
      this.generateAnswer()
    }
  }

  private generateAnswer() {
    switch (this._questionType) {
      case QuestionType.BOOLEAN_EXPRESSION:
        this._answerType = AnswerType.SIMPLIFIED_BOOLEAN_EXPRESSION
        this.answerData = this.questionData.simplify()
        break
      case QuestionType.LOGIC_GATE:
        this._answerType = AnswerType.SIMPLIFIED_LOGIC_GATE
        break
      case QuestionType.TRUTH_TABLE:
        this._answerType = AnswerType.FILLED_IN_TRUTH_TABLE
        break
      default:
        throw new Error('Invalid question type')
    }
  }
}
