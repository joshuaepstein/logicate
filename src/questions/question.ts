// import type { QuestionType } from '@logicate/database'

import { BooleanExpression } from "./boolean-expression"

export enum QuestionType {
  BOOLEAN_EXPRESSION = "BOOLEAN_EXPRESSION",
  TRUTH_TABLE = "TRUTH_TABLE",
  LOGIC_GATE = "LOGIC_GATE",
}

export enum AnswerType {
  SIMPLIFIED_BOOLEAN_EXPRESSION = "SIMPLIFIED_BOOLEAN_EXPRESSION",
  FILLED_IN_TRUTH_TABLE = "FILLED_IN_TRUTH_TABLE",
  SIMPLIFIED_LOGIC_GATE = "SIMPLIFIED_LOGIC_GATE",
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
        throw new Error("Invalid question type")
    }
  }

  public toJson() {
    return JSON.stringify({
      questionType: this._questionType,
      questionData: this.questionData,
      ...(this._answerType !== undefined && this.answerData !== undefined && { answerType: this._answerType, answerData: this.answerData }),
    })
  }

  public static fromJson(json: string) {
    const data = JSON.parse(json)
    return new Question(data.questionType, data.questionData, data.answerType, data.answerData)
  }

  public getAnswer() {
    return this.answerData
  }

  public getQuestion() {
    return this.questionData
  }
}
