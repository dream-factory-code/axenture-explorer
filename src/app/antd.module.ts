import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NzTableModule } from 'ng-zorro-antd/table'

@NgModule({
  declarations: [],
  imports: [CommonModule, NzTableModule],
  exports: [NzTableModule],
})
export class AntdModule {}
