import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Order, OrderItem } from '../../models/order.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  currentOrder: Order | null = null;

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.billingService.getCurrentOrder().subscribe(order => {
      this.currentOrder = order;
    });
  }

  updateQuantity(item: OrderItem, newQuantity: number): void {
    if (newQuantity > 0) {
      this.billingService.updateItemQuantity(item.menuItem.id, newQuantity);
    }
  }

  removeItem(menuItemId: number): void {
    this.billingService.removeItemFromOrder(menuItemId);
  }

  completeOrder(): void {
    this.billingService.completeOrder();
  }

  cancelOrder(): void {
    this.billingService.cancelOrder();
  }
} 