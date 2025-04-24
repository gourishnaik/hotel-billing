import { MenuItem } from './menu-item.model';

export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
    subtotal: number;
}

export interface Order {
    orderId: number;
    items: OrderItem[];
    total: number;
    date: Date;
    status: 'pending' | 'completed' | 'cancelled';
    tableNumber?: number;
    customerName?: string;
} 