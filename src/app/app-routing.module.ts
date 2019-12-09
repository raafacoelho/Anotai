import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'comanda', loadChildren: './comanda/comanda.module#ComandaPageModule' },
  { path: 'forma-pgto', loadChildren: './forma-pgto/forma-pgto.module#FormaPgtoPageModule' },
  { path: 'pagamento', loadChildren: './pagamento/pagamento.module#PagamentoPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },




];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

