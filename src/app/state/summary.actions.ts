import { ISummary } from '../interfaces/summary.interface'

export namespace SummaryAction {
  export class SetSummary {
    static type = '[Summary] SetSummary'
    constructor(public payload: ISummary) {}
  }
  export class ClearSummary {
    static type = '[Summary] ClearSummary'
  }
}
