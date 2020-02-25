import { State, Action, StateContext, Selector } from '@ngxs/store'
import { ImmutableContext } from '@ngxs-labs/immer-adapter'
import { IAddress } from '../interfaces/address.interface'
import { addressInitialState } from '../initial-states/address-initial-state'
import { CurrentAddressAction } from './current-address.actions'

@State<IAddress>({
  name: 'currentAddress',
  defaults: addressInitialState,
})
export class CurrentAddressState {
  @Selector()
  static currentAddress(currentAddressState: IAddress): IAddress {
    const currentAddress = currentAddressState

    return currentAddress
  }

  @Action(CurrentAddressAction.SetCurrentAddress)
  @ImmutableContext()
  setCurrentAddress({ setState }: StateContext<IAddress>, { payload }: CurrentAddressAction.SetCurrentAddress): void {
    setState((draft: IAddress) => {
      draft = payload

      return draft
    })
  }

  @Action(CurrentAddressAction.ClearCurrentAddress)
  @ImmutableContext()
  clearCurrentAddress({ setState }: StateContext<IAddress>): void {
    setState((draft: IAddress) => {
      draft = addressInitialState

      return draft
    })
  }
}
