import { IBlock } from '../interfaces/block.interface'

export namespace RecentBlocksAction {
  export class SetRecentBlocks {
    static type = '[RecentBlocks] SetRecentBlocks'
    constructor(public payload: IBlock[]) {}
  }
  export class ClearRecentBlocks {
    static type = '[RecentBlocks] ClearRecentBlocks'
  }
}
