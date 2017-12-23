import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { SbusersComponent } from './sbusers/sbusers.component';
import { ScusersComponent } from './scusers/scusers.component';
import { StoresComponent } from './stores/stores.component';
import { OrdersComponent } from './orders/orders.component';
import { WalletComponent } from './wallet/wallet.component';
import { RpusersComponent } from './rpusers/rpusers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'sbusers', component: SbusersComponent },
  { path: 'scusers', component: ScusersComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'rpusers', component: RpusersComponent },
  { path: '', redirectTo: '/', pathMatch:'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
