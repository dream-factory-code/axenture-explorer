import { State, Action, StateContext, Selector } from '@ngxs/store'
import { ImmutableContext } from '@ngxs-labs/immer-adapter'
import { IBlock } from '../interfaces/block.interface'
import { AllBlocksAction } from './all-blocks.actions'

@State<IBlock[]>({
  name: 'AllBlocks',
  defaults: [],
})
export class AllBlocksState {
  @Selector()
  static allBlocks(allBlocksState: IBlock[]): IBlock[] {
    const allBlocks = allBlocksState

    return allBlocks
  }

  @Action(AllBlocksAction.SetAllBlocks)
  @ImmutableContext()
  setAllBlocks({ setState }: StateContext<IBlock[]>, { payload }: AllBlocksAction.SetAllBlocks): void {
    setState((draft: IBlock[]) => {
      draft = payload

      return draft
    })
  }

  @Action(AllBlocksAction.ClearAllBlocks)
  @ImmutableContext()
  clearAllBlocks({ setState }: StateContext<IBlock[]>): void {
    setState((draft: IBlock[]) => {
      draft = []

      return draft
    })
  }
}
