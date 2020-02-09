import { IBlock } from '../interfaces/block.interface'

export namespace AllBlocksAction {
  export class SetAllBlocks {
    static type = '[AllBlocks] SetAllBlocks'
    constructor(public payload: IBlock[]) {}
  }
  export class ClearAllBlocks {
    static type = '[AllBlocks] ClearAllBlocks'
  }
}
