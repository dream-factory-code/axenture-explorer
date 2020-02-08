import { Injectable } from '@angular/core'
import Web3 from 'web3'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3: Web3
  constructor() {
    // in node.js use: var Web3 = require('web3');

    this.web3 = new Web3(environment.apiUrl)
  }
}
