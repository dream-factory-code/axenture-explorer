import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { Web3Service } from '../services/web3.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Router } from '@angular/router'

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
})
export class MainSearchComponent implements OnInit {
  searchInProgress = false
  constructor(
    private web3Service: Web3Service,
    private notification: NzNotificationService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {}

  search(term) {
    if (this.searchInProgress) return
    this.searchInProgress = true
    this.web3Service.web3.eth.getBlockNumber().then((blockNumber) => {
      if (term.length === 66) {
        this.router.navigate(['transaction', term])
      } else if (term.length === 42 && this.web3Service.web3.utils.isAddress(term)) {
        this.router.navigate(['address', term])
      } else if (term <= blockNumber && term >= 0) {
        this.router.navigate(['block', term])
      } else {
        this.notification.error('Error', 'Incorrect search term!')
      }
      this.searchInProgress = false
      this.cd.markForCheck()
    })
  }
}
