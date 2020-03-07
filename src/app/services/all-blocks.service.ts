import { Injectable } from '@angular/core'
import { Web3Service } from './web3.service'
import { from, Observable, forkJoin } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { IBlock } from '../interfaces/block.interface'
import { flatMap, withLatestFrom, map } from 'rxjs/operators'
import { AllBlocksState } from '../state/all-blocks.state'
import { AllBlocksAction } from '../state/all-blocks.actions'
import { SummaryService } from './summary.service'

@Injectable({
  providedIn: 'root',
})
export class AllBlocksService {
  blockNumber$: Observable<number>
  constructor(private store: Store, private web3Service: Web3Service, private summaryService: SummaryService) {}

  @Select(AllBlocksState.allBlocks)
  allBlocks$: Observable<IBlock[]>

  private getBlocks$(number, count): Observable<IBlock[]> {
    const observables$ = new Array(count)
      .fill(0)
      .map((zero, index) => from((this.web3Service.web3.eth.getBlock(number + index) as unknown) as Promise<IBlock>))

    return forkJoin(observables$)
  }

  getAllBlocks$(page = 0, take = 10): Observable<any> {
    return this.getBlocks$((page - 1) * take, take).pipe(
      flatMap((blocks) => this.store.dispatch([new AllBlocksAction.SetAllBlocks(blocks)])),
      withLatestFrom(this.allBlocks$),
      map((results) => results.pop())
    )
  }
}
