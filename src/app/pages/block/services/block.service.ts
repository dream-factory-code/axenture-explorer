import { Injectable } from '@angular/core'
import { from, Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { Web3Service } from 'src/app/services/web3.service'
import { flatMap, withLatestFrom, map, tap } from 'rxjs/operators'
import { BlockState } from '../state/block.state'
import { IBlock } from 'src/app/interfaces/block.interface'
import { BlockAction } from '../state/block.actions'

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  constructor(private store: Store, private web3Service: Web3Service) {}

  @Select(BlockState.block)
  block$: Observable<IBlock>

  private getBlockCall$(number: number | 'latest'): Observable<IBlock> {
    return from((this.web3Service.web3.eth.getBlock(number) as unknown) as Promise<IBlock>)
  }

  getBlock$(number: number | 'latest' = 'latest'): Observable<IBlock> {
    return this.getBlockCall$(number).pipe(
      flatMap((block) => this.store.dispatch([new BlockAction.SetBlock(block)])),
      withLatestFrom(this.block$),
      map((results) => results.pop())
    )
  }
}
