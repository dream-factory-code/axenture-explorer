import { State, Action, StateContext, Selector } from '@ngxs/store'
import { ImmutableContext } from '@ngxs-labs/immer-adapter'
import { IBlock } from '../interfaces/block.interface'
import { RecentBlocksAction } from './recent-blocks.actions'

@State<IBlock[]>({
  name: 'RecentBlocks',
  defaults: [],
})
export class RecentBlocksState {
  @Selector()
  static RecentBlocks(RecentBlocksState: IBlock[]): IBlock[] {
    const RecentBlocks = RecentBlocksState

    return RecentBlocks
  }

  @Action(RecentBlocksAction.SetRecentBlocks)
  @ImmutableContext()
  setRecentBlocks({ setState }: StateContext<IBlock[]>, { payload }: RecentBlocksAction.SetRecentBlocks): void {
    setState((draft: IBlock[]) => {
      draft = payload

      return draft
    })
  }

  @Action(RecentBlocksAction.ClearRecentBlocks)
  @ImmutableContext()
  clearRecentBlocks({ setState }: StateContext<IBlock[]>): void {
    setState((draft: IBlock[]) => {
      draft = []

      return draft
    })
  }
}
