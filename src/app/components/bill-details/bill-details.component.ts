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
  isLoading: boolean = true;
  total:any;
  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.getTotal();
    this.loadOrders();

  
  }


  getTotal(){
    this.billingService.getTotal().subscribe({
      next: (res:any) => {
        console.log('Total received:', res);
        this.total = res;
        // Do something with res, e.g., this.total = res;
      },
      error: (err:any) => {
        console.error('Error getting total:', err);
      }
    });
    
  }

  loadOrders(): void {
    this.isLoading = true;
    this.billingService.getOrders().subscribe({
      next: (orders) => {
        this.completedOrders = orders.filter(order => order.status === 'completed');
        this.calculateTodayTotal();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.isLoading = false;
      }
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