import { State, Action, StateContext, Selector } from '@ngxs/store'
import { ImmutableContext } from '@ngxs-labs/immer-adapter'
import { summaryInitialState } from '../initial-states/summary-initial-state'
import { ISummary } from '../interfaces/summary.interface'
import { SummaryAction } from './summary.actions'

@State<ISummary>({
  name: 'summary',
  defaults: summaryInitialState,
})
export class SummaryState {
  @Selector()
  static summary(summaryState: ISummary): ISummary {
    const summary = summaryState

    return summary
  }

  @Action(SummaryAction.SetSummary)
  @ImmutableContext()
  setSummary({ setState }: StateContext<ISummary>, { payload }: SummaryAction.SetSummary): void {
    setState((draft: ISummary) => {
      draft = payload

      return draft
    })
  }

  @Action(SummaryAction.ClearSummary)
  @ImmutableContext()
  clearSummary({ setState }: StateContext<ISummary>): void {
    setState((draft: ISummary) => {
      draft = summaryInitialState

      return draft
    })
  }
}
