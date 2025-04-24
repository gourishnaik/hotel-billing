import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order, OrderItem } from '../models/order.model';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private orders: Order[] = [];
  private currentOrder: Order | null = null;
  private ordersSubject = new BehaviorSubject<Order[]>(this.orders);
  private currentOrderSubject = new BehaviorSubject<Order | null>(this.currentOrder);

  constructor() { }

  createNewOrder(tableNumber?: number, customerName?: string): void {
    this.currentOrder = {
      id: Date.now(),
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

  completeOrder(): void {
    if (!this.currentOrder) return;

    this.currentOrder.status = 'completed';
    this.orders.push(this.currentOrder);
    this.ordersSubject.next(this.orders);
    this.currentOrder = null;
    this.currentOrderSubject.next(null);
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
    return this.ordersSubject.asObservable();
  }
} 