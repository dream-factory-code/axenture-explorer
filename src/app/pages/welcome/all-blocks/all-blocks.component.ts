import { Component, OnInit } from '@angular/core'
import { AllBlocksService } from 'src/app/services/all-blocks.service'
import { Observable } from 'rxjs'
import { IBlock } from 'src/app/interfaces/block.interface'
import { tap, map } from 'rxjs/operators'
import { SummaryService } from 'src/app/services/summary.service'

@Component({
  selector: 'app-all-blocks',
  templateUrl: './all-blocks.component.html',
  styleUrls: ['./all-blocks.component.scss'],
})
export class AllBlocksComponent implements OnInit {
  allBlocks$: Observable<IBlock[]>
  isLoading = true

  constructor(private allBlocksService: AllBlocksService, private summaryService: SummaryService) {}
  total$
  ngOnInit() {
    this.allBlocksService.getAllBlocks$(1, 10).subscribe(() => {
      this.isLoading = false
    })

    this.allBlocks$ = this.allBlocksService.allBlocks$
    this.total$ = this.summaryService.summary$.pipe(map((item) => item.blockNumber))
  }

  navigate(page?, take?) {
    this.allBlocksService.getAllBlocks$(page, take).subscribe(() => {
      this.isLoading = false
    })
  }
}
