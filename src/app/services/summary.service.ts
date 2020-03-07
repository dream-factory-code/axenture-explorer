import { Injectable } from '@angular/core'
import { PollingService } from './polling.service'
import { Web3Service } from './web3.service'
import { map, flatMap, withLatestFrom } from 'rxjs/operators'
import { Observable, forkJoin } from 'rxjs'
import { ISummary } from '../interfaces/summary.interface'
import { Store, Select } from '@ngxs/store'
import { SummaryAction } from '../state/summary.actions'
import { SummaryState } from '../state/summary.state'

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  staticSummary$: Observable<any>
  constructor(private pollingService: PollingService, private web3Service: Web3Service, private store: Store) {
    this.staticSummary$ = forkJoin(
      this.web3Service.web3.eth.getProtocolVersion(),
      this.web3Service.web3.eth.getNodeInfo(),
      this.web3Service.web3.eth.getGasPrice(),
      this.web3Service.getSealers$().pipe(map((item: any) => item.result.length)),
      this.web3Service.web3.eth.net.getPeerCount()
    )
    this.staticSummary$.subscribe()
  }

  @Select(SummaryState.summary)
  summary$: Observable<ISummary>

  private pollSummary$(): Observable<ISummary> {
    return this.pollingService.pollMultiplePromises$([this.web3Service.web3.eth.getBlockNumber]).pipe(
      withLatestFrom(this.staticSummary$),
      map(([[blockNumber], [...rest]]) => [blockNumber, ...rest]),
      map(([blockNumber, protocolVersion, nodeInfo, gasPrice, noSealers, peerCount]) => {
        return {
          blockNumber,
          apiVersion: this.web3Service.web3.version,
          clientNodeVersion: nodeInfo,
          networkProtocolVersion: protocolVersion,
          currentGasPrice: gasPrice,
          noSealers,
          numberOfPeers: peerCount,
        } as ISummary
      })
    )
  }

  getSummary$(): Observable<ISummary> {
    return this.pollSummary$().pipe(
      flatMap((summary) => this.store.dispatch([new SummaryAction.SetSummary(summary)])),
      withLatestFrom(this.summary$),
      map((results) => results.pop())
    )
  }
}
