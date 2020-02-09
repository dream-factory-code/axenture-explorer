import { Injectable } from '@angular/core'
import { PollingService } from './polling.service'
import { Web3Service } from './web3.service'
import { map, flatMap, withLatestFrom, tap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ISummary } from '../interfaces/summary.interface'
import { Store, Select } from '@ngxs/store'
import { SummaryAction } from '../state/summary.actions'
import { SummaryState } from '../state/summary.state'

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  constructor(private pollingService: PollingService, private web3Service: Web3Service, private store: Store) {}

  @Select(SummaryState.summary)
  summary$: Observable<ISummary>

  private pollSummary$(): Observable<ISummary> {
    return this.pollingService
      .pollMultiplePromises$([
        this.web3Service.web3.eth.getBlockNumber,
        this.web3Service.web3.eth.getProtocolVersion,
        this.web3Service.web3.eth.getNodeInfo,
        this.web3Service.web3.eth.getGasPrice,
        this.web3Service.web3.eth.getHashrate,
        this.web3Service.web3.eth.net.getPeerCount,
      ])
      .pipe(
        map(([blockNumber, protocolVersion, nodeInfo, gasPrice, hashRate, peerCount]) => {
          return {
            blockNumber,
            apiVersion: this.web3Service.web3.version,
            clientNodeVersion: nodeInfo,
            networkProtocolVersion: protocolVersion,
            currentGasPrice: gasPrice,
            hashRate,
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
