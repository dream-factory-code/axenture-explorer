import { Component, OnInit } from '@angular/core'
import { AddressService } from 'src/app/services/address.service'
import { Observable } from 'rxjs'
import { IAddress } from 'src/app/interfaces/address.interface'
import { map } from 'rxjs/operators'
import { Web3Service } from 'src/app/services/web3.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  address$: Observable<IAddress>
  constructor(private addressService: AddressService, private web3Service: Web3Service) {}

  ngOnInit() {
    this.address$ = this.addressService.address$.pipe(
      map(({ balance, storage, transactionCount, address }) => ({
        storage,
        transactionCount,
        address,
        balance: this.web3Service.web3.utils.fromWei(balance, 'ether'),
      }))
    )
  }
}
