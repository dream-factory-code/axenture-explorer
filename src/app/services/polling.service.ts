import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { delay, repeat } from 'rxjs/operators'
import { pollingConf } from '../configs/polling.config'

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  constructor() {}

  poll$(obs$: Observable<any>): Observable<any> {
    return obs$.pipe(delay(pollingConf.delay), repeat())
  }
}
