export namespace TransactionAction {
  export class SetTransaction {
    static type = '[Transaction] SetTransaction'
    constructor(public payload: any) {}
  }
  export class ClearTransaction {
    static type = '[Transaction] ClearTransaction'
  }
}
