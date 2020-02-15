import { IBlock } from 'src/app/interfaces/block.interface'

export namespace BlockAction {
  export class SetBlock {
    static type = '[Block] SetBlock'
    constructor(public payload: IBlock) {}
  }
  export class ClearBlock {
    static type = '[Block] ClearBlock'
  }
}
