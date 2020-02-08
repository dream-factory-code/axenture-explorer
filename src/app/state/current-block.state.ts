import { State, Action, StateContext, Selector } from '@ngxs/store'
import { ImmutableContext } from '@ngxs-labs/immer-adapter'
import { IBlock } from '../interfaces/block.interface'
import { blockInitialState } from './block-initial-state'
import { CurrentBlockAction } from './current-block.actions'

@State<IBlock>({
  name: 'currentBlock',
  defaults: blockInitialState,
})
export class CurrentBlockState {
  @Selector()
  static currentBlock(currentBlockState: IBlock): IBlock {
    const currentBlock = currentBlockState

    return currentBlock
  }

  @Action(CurrentBlockAction.SetCurrentBlock)
  @ImmutableContext()
  setCurrentBlock({ setState }: StateContext<IBlock>, { payload }: CurrentBlockAction.SetCurrentBlock): void {
    setState((draft: IBlock) => {
      draft = payload

      return draft
    })
  }

  @Action(CurrentBlockAction.ClearCurrentBlock)
  @ImmutableContext()
  clearCurrentBlock({ setState }: StateContext<IBlock>): void {
    setState((draft: IBlock) => {
      draft = blockInitialState

      return draft
    })
  }
}
