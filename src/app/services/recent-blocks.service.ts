import { Injectable } from '@angular/core'
import { Web3Service } from './web3.service'
import { from, Observable, forkJoin, of } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { IBlock } from '../interfaces/block.interface'
import { flatMap, withLatestFrom, map } from 'rxjs/operators'
import { RecentBlocksState } from '../state/recent-blocks.state'
import { RecentBlocksAction } from '../state/recent-blocks.actions'
import { SummaryService } from './summary.service'

@Injectable({
  providedIn: 'root',
})
export class RecentBlocksService {
  blockNumber$: Observable<number>

  constructor(private store: Store, private web3Service: Web3Service, private summaryService: SummaryService) {}

  @Select(RecentBlocksState.RecentBlocks)
  recentBlocks$: Observable<IBlock[]>

  // move to common/service/block
  private getBlocks$(number, count): Observable<IBlock[]> {
    if (count === 0) return of([])

    const observables$ = new Array(count)
      .fill(0)
      .map((zero, index) => from((this.web3Service.web3.eth.getBlock(number - index) as unknown) as Promise<IBlock>))
    return forkJoin(observables$)
  }

  getRecentBlocks$(): Observable<IBlock[]> {
    return this.summaryService.summary$.pipe(
      withLatestFrom(this.recentBlocks$),
      flatMap(([summary, recentBlocks]) => {
        if (!summary.blockNumber) return of([])
        if (!recentBlocks.length || summary.blockNumber - recentBlocks[0].number > 10) {
          return this.getBlocks$(summary.blockNumber, 10)
        } else {
          return this.getBlocks$(summary.blockNumber, summary.blockNumber - recentBlocks[0].number).pipe(
            map((newBlocks) => {
              newBlocks.map((block) => Object.assign(block, { new: true }))
              return newBlocks.concat(recentBlocks.map((block) => Object.assign({ ...block }, { new: false }))).slice(0, 10)
            })
          )
        }
      }),
      flatMap((blocks) => this.store.dispatch([new RecentBlocksAction.SetRecentBlocks(blocks)])),
      withLatestFrom(this.recentBlocks$),
      map((results) => results.pop())
    )
  }
}
