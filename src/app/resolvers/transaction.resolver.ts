import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { TransactionService } from '../services/transaction.service'
import { catchError, tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class TransactionResolver implements Resolve<any> {
  constructor(private transactionService: TransactionService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('resolving')
    if (!route.params.id) {
      this.router.navigate(['/'])
      return of(false)
    }
    return this.transactionService.getTransactionData$(route.params.id).pipe(
      tap(console.log),
      catchError((err) => {
        this.router.navigate(['/'])
        return of(false)
      })
    )
  }
}
