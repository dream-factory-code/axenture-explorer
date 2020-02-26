import { Component, OnInit } from '@angular/core'
import { TransactionService } from 'src/app/services/transaction.service'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    // this.transactionService.transaction$.subscribe(console.log)
  }
}
