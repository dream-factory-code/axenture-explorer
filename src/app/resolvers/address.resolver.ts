import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { AddressService } from '../services/address.service'
import { catchError } from 'rxjs/operators'
import { Web3Service } from '../services/web3.service'

@Injectable({ providedIn: 'root' })
export class AddressResolver implements Resolve<any> {
  constructor(private addressService: AddressService, private router: Router, private web3Service: Web3Service) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (!route.params.id || !this.web3Service.web3.utils.isAddress(route.params.id)) {
      this.router.navigate(['/'])
      return of(false)
    }
    return this.addressService.getAddress$(route.params.id).pipe(
      catchError(() => {
        this.router.navigate(['/'])
        return of(false)
      })
    )
  }
}
