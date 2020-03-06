import { State, Action, StateContext, Selector } from '@ngxs/store'
import { ImmutableContext } from '@ngxs-labs/immer-adapter'
import { addressInitialState } from '../initial-states/address-initial-state'
import { TransactionAction } from './transaction.actions'
import { transactionInitialState } from '../initial-states/transaction-initial-state'

@State<any>({
  name: 'transaction',
  defaults: transactionInitialState,
})
export class TransactionState {
  @Selector()
  static transaction(transactionState: any): any {
    const transaction = transactionState

    return transaction
  }

  @Action(TransactionAction.SetTransaction)
  @ImmutableContext()
  setTransaction({ setState }: StateContext<any>, { payload }: TransactionAction.SetTransaction): void {
    setState((draft: any) => {
      draft = payload

      return draft
    })
  }

  @Action(TransactionAction.ClearTransaction)
  @ImmutableContext()
  clearTransaction({ setState }: StateContext<any>): void {
    setState((draft: any) => {
      draft = addressInitialState

      return draft
    })
  }
}
