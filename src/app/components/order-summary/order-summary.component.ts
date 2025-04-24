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

  printBill(): void {
    if (!this.currentOrder) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const orderDate = this.currentOrder.date.toLocaleString();
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Bill #${this.currentOrder.orderId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .bill-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .bill-items {
              margin-bottom: 20px;
            }
            .bill-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .bill-total {
              text-align: right;
              font-weight: bold;
              margin-top: 20px;
            }
            @media print {
              body {
                padding: 0;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="bill-header">
            <h2>Bill #${this.currentOrder.orderId}</h2>
            <p>Date: ${orderDate}</p>
          </div>

          <div class="bill-items">
            ${this.currentOrder.items.map(item => `
              <div class="bill-item">
                <span>${item.menuItem.name} x ${item.quantity}</span>
                <span>₹${item.subtotal.toFixed(2)}</span>
              </div>
            `).join('')}
          </div>

          <div class="bill-total">
            <p>Total: ₹${this.currentOrder.total.toFixed(2)}</p>
          </div>

          <div class="no-print" style="text-align: center; margin-top: 20px;">
            <button style="    color: #fff;
    /* height: 30px; */
    width: auto;
    background: black;
    font-weight: 700;
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
    border: 1px solid white;" onclick="window.print()">Print Bill</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
} 