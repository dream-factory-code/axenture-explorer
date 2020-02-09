import { Injectable } from '@angular/core'
import Web3 from 'web3'
import { environment } from '../../environments/environment'
import { from } from 'rxjs'
import { flatMap, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3: Web3
  constructor() {
    this.web3 = new Web3(environment.apiUrl)
  }
  reinitiate() {
    this.web3 = new Web3(environment.apiUrl)
  }
}
