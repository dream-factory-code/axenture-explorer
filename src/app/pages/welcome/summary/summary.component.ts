import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { ISummary } from 'src/app/interfaces/summary.interface'
import { SummaryService } from 'src/app/services/summary.service'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  summary$: Observable<TableRow[]>
  isLoading = true
  constructor(private summaryService: SummaryService) {}

  ngOnInit() {
    this.summaryService.getSummary$().subscribe()
    this.summary$ = this.summaryService.summary$.pipe(
      map((summary) => [summary]),
      tap(() => (this.isLoading = false))
    ) as Observable<TableRow[]>
  }
}
interface TableRow extends ISummary {}
