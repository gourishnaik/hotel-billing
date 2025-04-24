import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { BillDetailsComponent } from './components/bill-details/bill-details.component';
import { BillingService } from './services/billing.service';
import { MenuService } from './services/menu.service';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { SnackbarService } from './shared/snackbar/snackbar.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemsComponent,
    OrderSummaryComponent,
    BillDetailsComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [BillingService, MenuService, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
