import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlockComponent } from './block/block.component'

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { BlockRoutingModule } from './block-routing.module'
import { NgxsModule } from '@ngxs/store'
import { BlockState } from './state/block.state'
import { AntdModule } from 'src/app/antd.module'
@NgModule({
  declarations: [BlockComponent],
  imports: [BlockRoutingModule, CommonModule, NzDescriptionsModule, NgxsModule.forFeature([BlockState]), AntdModule],
})
export class BlockModule {}
