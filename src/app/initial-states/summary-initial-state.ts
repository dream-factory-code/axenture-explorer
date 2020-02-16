import { ISummary } from '../interfaces/summary.interface'

export const summaryInitialState: ISummary = {
  blockNumber: null,
  apiVersion: null,
  clientNodeVersion: null,
  networkProtocolVersion: null,
  currentGasPrice: null,
  noSealers: null,
  numberOfPeers: null,
}
