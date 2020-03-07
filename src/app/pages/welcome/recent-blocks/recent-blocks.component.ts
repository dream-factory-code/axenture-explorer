import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { RecentBlocksService } from 'src/app/services/recent-blocks.service'
import { tap, map } from 'rxjs/operators'

@Component({
  selector: 'app-recent-blocks',
  templateUrl: './recent-blocks.component.html',
  styleUrls: ['./recent-blocks.component.scss'],
})
export class RecentBlocksComponent implements OnInit {
  recentBlocks$: Observable<TableRow[]>
  isLoading = true

  constructor(private recentBlocksService: RecentBlocksService) {}

  ngOnInit() {
    this.recentBlocks$ = this.recentBlocksService.getRecentBlocks$().pipe(
      map((blocks) => blocks.map((block: any) => Object.assign({}, block, { timestamp: new Date(block.timestamp * 1000) }))),
      tap((items) => {
        if (items.length) this.isLoading = false
      })
    )
  }
}

interface TableRow {
  number: number
  transactions: number
  size: number
  gasLimit: number
  gasUsed: number
  timestamp: Date
}
