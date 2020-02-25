import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IconsProviderModule } from './icons-provider.module'
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import { NgxsModule } from '@ngxs/store'
import { environment } from '../environments/environment'
import { CurrentBlockState } from './state/current-block.state'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { AntdModule } from './antd.module'
import { RecentBlocksState } from './state/recent-blocks.state'
import { SummaryState } from './state/summary.state'
import { AllBlocksState } from './state/all-blocks.state'
import { TransactionComponent } from './pages/transaction/transaction.component'
import { AddressComponent } from './pages/address/address.component'
import { CurrentAddressState } from './state/current-address.state'

registerLocaleData(en)

@NgModule({
  declarations: [AppComponent, TransactionComponent, AddressComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([CurrentBlockState, RecentBlocksState, SummaryState, AllBlocksState, CurrentAddressState], {
      developmentMode: !environment.production,
    }),
    //NgxsLoggerPluginModule.forRoot(),
    AntdModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
