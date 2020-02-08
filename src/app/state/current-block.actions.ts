import { IBlock } from '../interfaces/block.interface'

export namespace CurrentBlockAction {
  export class SetCurrentBlock {
    static type = '[CurrentBlock] SetCurrentBlock'
    constructor(public payload: IBlock) {}
  }
  export class ClearCurrentBlock {
    static type = '[CurrentBlock] ClearCurrentBlock'
  }
}
