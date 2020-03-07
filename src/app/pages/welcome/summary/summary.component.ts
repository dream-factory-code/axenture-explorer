import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { ISummary } from 'src/app/interfaces/summary.interface'
import { SummaryService } from 'src/app/services/summary.service'
import { PollingService } from 'src/app/services/polling.service'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  summary$: Observable<TableRow[]>
  isLoading = true
  constructor(private summaryService: SummaryService, private pollingService: PollingService) {}

  ngOnInit() {
    this.summaryService.getSummary$().subscribe()
    this.summary$ = this.summaryService.summary$.pipe(
      map((summary) => [summary]),
      tap(() => (this.isLoading = false))
    ) as Observable<TableRow[]>
  }
  ngOnDestroy() {
    this.pollingService.stopPolling()
  }
}
interface TableRow extends ISummary {}
