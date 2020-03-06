import { Injectable } from '@angular/core'
import { Web3Service } from './web3.service'
import { forkJoin, Observable } from 'rxjs'
import { map, withLatestFrom, flatMap } from 'rxjs/operators'
import { Store, Select } from '@ngxs/store'
import { TransactionAction } from '../state/transaction.actions'
import { TransactionState } from '../state/transaction.state'

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private store: Store, private web3Service: Web3Service) {}

  @Select(TransactionState.transaction)
  transaction$: Observable<any>

  private getTransaction$(transaction: string) {}
  private getTransactionReceipt$(transaction: string) {}
  getTransactionData$(transaction: string) {
    return forkJoin(
      this.web3Service.web3.eth.getTransaction(transaction),
      this.web3Service.web3.eth.getTransactionReceipt(transaction)
    ).pipe(
      map(([transaction, receipt]) => ({ transaction, receipt })),
      flatMap((transaction) => this.store.dispatch([new TransactionAction.SetTransaction(transaction)])),
      withLatestFrom(this.transaction$),
      map((results) => results.pop())
    )
  }
}
