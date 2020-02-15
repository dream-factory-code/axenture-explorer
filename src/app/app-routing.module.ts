import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule) },
  { path: 'block', loadChildren: () => import('./pages/block/block.module').then((m) => m.BlockModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
