import { Component, OnInit } from '@angular/core'
import { Web3Service } from 'src/app/services/web3.service'
import { CurrentBlockService } from 'src/app/services/current-block.service'
import { PollingService } from 'src/app/services/polling.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  currentBlock$
  constructor(private currentBlockService: CurrentBlockService, private pollingService: PollingService) {}

  ngOnInit() {
    this.currentBlock$ = this.currentBlockService.currentBlock$
    this.pollingService.poll$(this.currentBlockService.getCurrentBlock$()).subscribe()
  }
}
