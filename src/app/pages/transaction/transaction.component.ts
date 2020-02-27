import { Component, OnInit } from '@angular/core'
import { TransactionService } from 'src/app/services/transaction.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Web3Service } from 'src/app/services/web3.service'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transaction$: Observable<any>
  transactionDisplay$: Observable<any>
  receiptDisplay$: Observable<any>
  logsDisplay$: Observable<any>

  transactionDisplayOrder: any[] = [
    { key: 'hash', title: 'Transaction Hash' },
    'nonce',
    { key: 'transactionIndex', title: 'STxReceipt Status', format: (item) => (item ? 'Pending' : 'Success') },
    { key: 'blockNumber', title: 'Block Height', linkFn: (item) => (item ? `/block/${item}` : 'pending') },
    'blockHash',
    'transactionIndex',
    { key: 'from', linkFn: (item) => `/address/${item}` },
    { key: 'to', linkFn: (item) => `/address/${item}` },
    'value',
    { key: 'gas', title: 'Gas Limit' },
    { key: 'gasPrice', format: (item) => `${item} (${this.web3Service.web3.utils.fromWei(item, 'gwei')} Gwei)` },
  ]

  constructor(private transactionService: TransactionService, private web3Service: Web3Service) {}

  ngOnInit() {
    this.transaction$ = this.transactionService.transaction$
    this.transactionDisplay$ = this.transactionService.transaction$.pipe(
      map((transactionState) => {
        return this.transactionDisplayOrder.map((item: any) => {
          const key = item.key || item
          const value = item.format ? item.format(transactionState.transaction[key]) : transactionState.transaction[key]
          const linkVal = item.linkFn ? item.linkFn(value) : undefined
          return {
            title:
              item.title ||
              key
                .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                .split(/\s/)
                .join(' '),
            data: value,
            linkVal,
          }
        })
      })
    )

    this.receiptDisplay$ = this.transactionService.transaction$.pipe(
      map((transactionState) => {
        return Object.entries(transactionState.receipt)
          .map(([key, value]) => {
            return {
              title: key
                .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                .split(/\s/)
                .join(' '),
              data: value,
            }
          })
          .filter((item) => {
            item.title !== 'logs'
          })
      })
    )

    this.logsDisplay$ = this.transactionService.transaction$.pipe(map((transactionState) => transactionState.receipt.logs))
  }
}
