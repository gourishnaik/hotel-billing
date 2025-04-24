import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  completedOrders: Order[] = [];
  todayTotal: number = 0;

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.billingService.getOrders().subscribe(orders => {
      this.completedOrders = orders.filter(order => order.status === 'completed');
      this.calculateTodayTotal();
    });
  }

  getOrderDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  private calculateTodayTotal(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.todayTotal = this.completedOrders
      .filter(order => {
        const orderDate = new Date(order.date);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      })
      .reduce((total, order) => total + order.total, 0);
  }
} 