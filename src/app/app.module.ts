import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { BillDetailsComponent } from './components/bill-details/bill-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemsComponent,
    OrderSummaryComponent,
    BillDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
