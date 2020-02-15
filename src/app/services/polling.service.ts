import { Injectable } from '@angular/core'
import { Observable, merge, from, forkJoin } from 'rxjs'
import { delay, repeat, expand, reduce, skip, tap } from 'rxjs/operators'
import { pollingConf } from '../configs/polling.config'

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  constructor() {}

  poll$(obs$: Observable<any>): Observable<any> {
    return merge(obs$, obs$.pipe(delay(pollingConf.delay), repeat()))
  }
  pollPromise$(promiseFn: any): Observable<any> {
    return from(promiseFn()).pipe(expand(() => from(promiseFn()).pipe(delay(pollingConf.delay))))
  }

  pollMultiplePromises$(promiseFns: any[]) {
    return forkJoin(promiseFns.map((promiseFn) => from(promiseFn()))).pipe(
      expand(() => forkJoin(promiseFns.map((promiseFn) => from(promiseFn()))).pipe(delay(pollingConf.delay)))
    )
  }
  pollMultiplePromisesInSequence$(promiseFns: any[]) {
    return merge(promiseFns.map((promiseFn) => from(promiseFn())))
      .pipe(
        tap(console.log),

        reduce((res: any, item) => {
          console.log(res, item)
          res.push(item)
          return res
        }, []),
        skip(promiseFns.length - 1)
      )
      .pipe(
        expand(() =>
          merge(promiseFns.map((promiseFn) => from(promiseFn())))
            .pipe(
              reduce((res, item) => res.push(item) as any, [] as any),
              tap(console.log),
              skip(promiseFns.length - 1)
            )
            .pipe(delay(pollingConf.delay))
        )
      )
  }
}
