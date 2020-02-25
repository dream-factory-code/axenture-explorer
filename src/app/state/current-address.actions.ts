import { IAddress } from '../interfaces/address.interface'

export namespace CurrentAddressAction {
  export class SetCurrentAddress {
    static type = '[CurrentAddress] SetCurrentAddress'
    constructor(public payload: IAddress) {}
  }
  export class ClearCurrentAddress {
    static type = '[CurrentAddress] ClearCurrentAddress'
  }
}
