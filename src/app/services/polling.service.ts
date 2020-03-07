import { Injectable } from '@angular/core'
import { Observable, merge, from, forkJoin, concat, Subject } from 'rxjs'
import { delay, repeat, expand, reduce, skip, takeUntil } from 'rxjs/operators'
import { pollingConf } from '../configs/polling.config'

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  private stopPolling$ = new Subject()
  constructor() {}

  poll$(obs$: Observable<any>): Observable<any> {
    return merge(obs$, obs$.pipe(delay(pollingConf.delay), repeat()))
  }
  pollPromise$(promiseFn: any): Observable<any> {
    return from(promiseFn()).pipe(expand(() => from(promiseFn()).pipe(delay(pollingConf.delay))))
  }

  pollMultiplePromises$(promiseFns: any[]) {
    return forkJoin(promiseFns.map((promiseFn) => from(promiseFn()))).pipe(
      takeUntil(this.stopPolling$),
      expand(() => forkJoin(promiseFns.map((promiseFn) => from(promiseFn()))).pipe(takeUntil(this.stopPolling$), delay(pollingConf.delay))),
      takeUntil(this.stopPolling$)
    )
  }
  pollMultiplePromisesInSequence$(promiseFns: any[]) {
    return concat(promiseFns.map((promiseFn) => from(promiseFn())))
      .pipe(
        reduce((res: any, item) => {
          res.push(item)
          return res
        }, []),
        skip(promiseFns.length - 1)
      )
      .pipe(
        expand(() =>
          concat(promiseFns.map((promiseFn) => from(promiseFn())))
            .pipe(
              reduce((res, item) => res.push(item) as any, [] as any),
              skip(promiseFns.length - 1)
            )
            .pipe(delay(pollingConf.delay))
        ),
        takeUntil(this.stopPolling$)
      )
  }
  stopPolling() {
    this.stopPolling$.next()
    this.stopPolling$.complete()
  }
}
