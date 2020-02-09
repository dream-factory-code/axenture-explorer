import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { IBlock } from 'src/app/interfaces/block.interface'
import { RecentBlocksService } from 'src/app/services/recent-blocks.service'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-recent-blocks',
  templateUrl: './recent-blocks.component.html',
  styleUrls: ['./recent-blocks.component.scss'],
})
export class RecentBlocksComponent implements OnInit {
  recentBlocks$: Observable<IBlock[]>
  isLoading = true

  constructor(private recentBlocksService: RecentBlocksService) {}

  ngOnInit() {
    this.recentBlocks$ = this.recentBlocksService.getRecentBlocks$().pipe(
      tap(() => {
        this.isLoading = false
      })
    )
  }
}
