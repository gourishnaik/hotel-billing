import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Order, OrderItem } from '../models/order.model';
import { MenuItem } from '../models/menu-item.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  // Update this URL with your deployed backend URL
  private apiUrl = 'https://hotel-backend-cfsq.onrender.com/api';
  
  private orders: Order[] = [];
  private currentOrder: Order | null = null;
  private ordersSubject = new BehaviorSubject<Order[]>(this.orders);
  private currentOrderSubject = new BehaviorSubject<Order | null>(this.currentOrder);

  constructor(private http: HttpClient) { }

  createNewOrder(tableNumber?: number, customerName?: string): void {
    this.currentOrder = {
      orderId: Date.now(),
      items: [],
      total: 0,
      date: new Date(),
      status: 'pending',
      tableNumber,
      customerName
    };
    this.currentOrderSubject.next(this.currentOrder);
  }

  addItemToOrder(menuItem: MenuItem, quantity: number = 1): void {
    if (!this.currentOrder) {
      this.createNewOrder();
    }

    const existingItem = this.currentOrder!.items.find(item => item.menuItem.id === menuItem.id);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * menuItem.price;
    } else {
      this.currentOrder!.items.push({
        menuItem,
        quantity,
        subtotal: quantity * menuItem.price
      });
    }

    this.updateOrderTotal();
    this.currentOrderSubject.next(this.currentOrder);
  }

  removeItemFromOrder(menuItemId: number): void {
    if (!this.currentOrder) return;

    this.currentOrder.items = this.currentOrder.items.filter(item => item.menuItem.id !== menuItemId);
    this.updateOrderTotal();
    this.currentOrderSubject.next(this.currentOrder);
  }

  updateItemQuantity(menuItemId: number, quantity: number): void {
    if (!this.currentOrder) return;

    const item = this.currentOrder.items.find(item => item.menuItem.id === menuItemId);
    if (item) {
      item.quantity = quantity;
      item.subtotal = quantity * item.menuItem.price;
      this.updateOrderTotal();
      this.currentOrderSubject.next(this.currentOrder);
    }
  }

  private updateOrderTotal(): void {
    if (!this.currentOrder) return;
    this.currentOrder.total = this.currentOrder.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  async completeOrder(): Promise<void> {
    if (!this.currentOrder) return;

    this.currentOrder.status = 'completed';
    try {
      console.log('Sending order to backend:', this.currentOrder);
      const savedOrder = await this.http.post<Order>(`${this.apiUrl}/orders`, this.currentOrder).toPromise();
      console.log('Order saved successfully:', savedOrder);
      if (savedOrder) {
        this.orders.push(savedOrder);
        this.ordersSubject.next(this.orders);
        this.currentOrder = null;
        this.currentOrderSubject.next(null);
      }
    } catch (error) {
      console.error('Error saving order:', error);
      if (error instanceof HttpErrorResponse) {
        console.error('Error details:', error.error);
      }
    }
  }

  cancelOrder(): void {
    if (!this.currentOrder) return;

    this.currentOrder.status = 'cancelled';
    this.orders.push(this.currentOrder);
    this.ordersSubject.next(this.orders);
    this.currentOrder = null;
    this.currentOrderSubject.next(null);
  }

  getCurrentOrder(): Observable<Order | null> {
    return this.currentOrderSubject.asObservable();
  }

  getOrders(): Observable<Order[]> {
    console.log('Fetching orders from backend...');
    return this.http.get<Order[]>(`${this.apiUrl}/orders/completed`).pipe(
      tap(orders => {
        console.log('Orders received:', orders);
        this.orders = orders;
        this.ordersSubject.next(this.orders);
      }),
      catchError(error => {
        console.error('Error fetching orders:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Error details:', error.error);
        }
        return throwError(() => error);
      })
    );
  }
} 