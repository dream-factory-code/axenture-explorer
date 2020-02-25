import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { AddressService } from '../services/address.service'
import { tap, catchError } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AddressResolver implements Resolve<any> {
  constructor(private addressService: AddressService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (!route.params.id) {
      this.router.navigate(['/'])
      return of(false)
    }
    return this.addressService.getAddress$(route.params.id).pipe(
      catchError((err) => {
        this.router.navigate(['/'])
        return of(false)
      })
    )
  }
}
