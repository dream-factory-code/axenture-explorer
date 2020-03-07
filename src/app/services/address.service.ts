import { Injectable } from '@angular/core'
import { Observable, forkJoin, of } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { Web3Service } from 'src/app/services/web3.service'
import { flatMap, withLatestFrom, map } from 'rxjs/operators'
import { CurrentAddressState } from '../state/current-address.state'
import { IAddress } from 'src/app/interfaces/address.interface'
import { CurrentAddressAction } from '../state/current-address.actions'

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private store: Store, private web3Service: Web3Service) {}

  @Select(CurrentAddressState.currentAddress)
  address$: Observable<IAddress>

  getAddress$(address: string): Observable<IAddress> {
    return forkJoin(
      this.web3Service.web3.eth.getBalance(address),
      this.web3Service.web3.eth.getStorageAt(address, 0),
      this.web3Service.web3.eth.getTransactionCount(address),
      of(address)
    ).pipe(
      map(([balance, storage, transactionCount, address]) => ({ balance, storage, transactionCount, address })),
      flatMap((address) => this.store.dispatch([new CurrentAddressAction.SetCurrentAddress(address)])),
      withLatestFrom(this.address$),
      map((results) => results.pop())
    )
  }
}
