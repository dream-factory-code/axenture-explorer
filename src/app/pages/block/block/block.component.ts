import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { map, flatMap } from 'rxjs/operators'
import { BlockService } from '../services/block.service'
import { Observable } from 'rxjs'
import { IBlock } from 'src/app/interfaces/block.interface'

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private blockService: BlockService) {}
  block$: Observable<IBlock>
  blockDisplay$: Observable<IBlockDisplay[]>
  private displayOrder = [
    { key: 'number', title: 'Height' },
    { key: 'timestamp', format: (item) => new Date(item * 1000).toISOString() },
    { key: 'transactions', format: (item) => `${item.length} transactions` },
    'hash',
    'parentHash',
    'sha3Uncles',
    { key: 'miner', title: 'Mined By' },
    'difficulty',
    'totalDifficulty',
    'size',
    'gasUsed',
    'gasLimit',
    'nonce',
    'extraData',
    'logsBloom',
    'mixHash',
    'receiptsRoot',
    'stateRoot',
    'transactionsRoot',
    {
      key: 'uncles',
      format: (item) => {
        item.toString()
      },
    },
  ]
  ngOnInit() {
    this.block$ = this.blockService.block$
    this.blockDisplay$ = this.blockService.block$.pipe(
      map((block) => {
        return this.displayOrder.map((item: any) => {
          const key = item.key || item
          const value = item.format ? item.format(block[key]) : block[key]
          return {
            title:
              item.title ||
              key
                .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                .split(/\s/)
                .join(' '),
            data: value,
          }
        })
      })
    )
    this.route.params
      .pipe(
        flatMap((params) => {
          if (params.id) {
            return this.blockService.getBlock$(params.id as number)
          } else {
            return this.blockService.getBlock$(params.id as number)
          }
        })
      )
      .subscribe()
  }
}

interface IBlockDisplay {
  title: string
  data: any
  isLink?: boolean
  dataType?: string
}
