import { Injectable } from '@angular/core'
import { Observable, merge, from, forkJoin } from 'rxjs'
import { delay, repeat, expand } from 'rxjs/operators'
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
}
