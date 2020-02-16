import { Injectable } from '@angular/core'
import Web3 from 'web3'
import { environment } from '../../environments/environment'
import { from } from 'rxjs'
import { flatMap, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3: Web3
  constructor(private http: HttpClient) {
    this.web3 = new Web3(environment.apiUrl)
  }
  getSealers$() {
    const payload = { jsonrpc: '2.0', method: 'clique_getSigners', params: [], id: 1 }

    return this.http.post(environment.apiUrl, payload)
  }
}
