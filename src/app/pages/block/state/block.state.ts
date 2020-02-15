import { State, Action, StateContext, Selector } from '@ngxs/store'
import { ImmutableContext } from '@ngxs-labs/immer-adapter'
import { BlockAction } from './block.actions'
import { IBlock } from 'src/app/interfaces/block.interface'
import { blockInitialState } from 'src/app/initial-states/block-initial-state'

@State<IBlock>({
  name: 'Block',
  defaults: blockInitialState,
})
export class BlockState {
  @Selector()
  static block(blockState: IBlock): IBlock {
    const block = blockState

    return block
  }

  @Action(BlockAction.SetBlock)
  @ImmutableContext()
  setBlock({ setState }: StateContext<IBlock>, { payload }: BlockAction.SetBlock): void {
    setState((draft: IBlock) => {
      draft = payload

      return draft
    })
  }

  @Action(BlockAction.ClearBlock)
  @ImmutableContext()
  clearBlock({ setState }: StateContext<IBlock>): void {
    setState((draft: IBlock) => {
      draft = blockInitialState

      return draft
    })
  }
}
