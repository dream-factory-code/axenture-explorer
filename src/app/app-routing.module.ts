import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TransactionComponent } from './pages/transaction/transaction.component'
import { AddressComponent } from './pages/address/address.component'
import { AddressResolver } from './resolvers/address.resolver'
import { TransactionResolver } from './resolvers/transaction.resolver'

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule) },
  { path: 'block', loadChildren: () => import('./pages/block/block.module').then((m) => m.BlockModule) },
  {
    path: 'address/:id',
    component: AddressComponent,
    resolve: {
      address: AddressResolver,
    },
  },
  {
    path: 'transaction/:id',
    component: TransactionComponent,
    resolve: {
      address: TransactionResolver,
    },
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
