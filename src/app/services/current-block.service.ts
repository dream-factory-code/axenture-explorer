import { Injectable } from '@angular/core'
import { Web3Service } from './web3.service'
import { from, Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { CurrentBlockState } from '../state/current-block.state'
import { IBlock } from '../interfaces/block.interface'
import { flatMap, withLatestFrom, map, tap } from 'rxjs/operators'
import { CurrentBlockAction } from '../state/current-block.actions'

@Injectable({
  providedIn: 'root',
})
export class CurrentBlockService {
  constructor(private store: Store, private web3Service: Web3Service) {}
  @Select(CurrentBlockState.currentBlock)
  currentBlock$: Observable<IBlock>

  getBlock$(number: number | 'latest'): Observable<IBlock> {
    return from((this.web3Service.web3.eth.getBlock(number) as unknown) as Promise<IBlock>)
  }

  getCurrentBlock$(): Observable<IBlock> {
    return this.getBlock$('latest').pipe(
      flatMap((block) => this.store.dispatch([new CurrentBlockAction.SetCurrentBlock(block)])),
      withLatestFrom(this.currentBlock$),
      map((results) => results.pop())
    )
  }
}
