import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination';


import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { SbusersComponent } from './sbusers/sbusers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { AppRoutingModule } from './app-routing.module';
import { ScusersComponent } from './scusers/scusers.component';
import { RpusersComponent } from './rpusers/rpusers.component';
import { StoresComponent } from './stores/stores.component';
import { OrdersComponent } from './orders/orders.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryComponent,
    CategoryListComponent,
    AppNavbarComponent,
    SbusersComponent,
    PageNotFoundComponent,
    ScusersComponent,
    RpusersComponent,
    StoresComponent,
    OrdersComponent,
    WalletComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
