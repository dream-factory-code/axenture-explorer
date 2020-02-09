import { NgModule } from '@angular/core'

import { WelcomeRoutingModule } from './welcome-routing.module'

import { WelcomeComponent } from './welcome.component'
import { CommonModule } from '@angular/common'
import { SummaryComponent } from './summary/summary.component'
import { AntdModule } from 'src/app/antd.module';
import { RecentBlocksComponent } from './recent-blocks/recent-blocks.component';
import { AllBlocksComponent } from './all-blocks/all-blocks.component'

@NgModule({
  imports: [WelcomeRoutingModule, CommonModule, AntdModule],
  declarations: [WelcomeComponent, SummaryComponent, RecentBlocksComponent, AllBlocksComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
