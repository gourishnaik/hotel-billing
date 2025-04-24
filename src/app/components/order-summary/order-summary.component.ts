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

    const orderDate = new Date(this.currentOrder.date).toLocaleString();
    const content = `
      <html>
        <head>
          <title>Bill #${this.currentOrder.id}</title>
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
              border-bottom: 2px solid #1976d2;
              padding-bottom: 10px;
            }
            .bill-items {
              margin-bottom: 20px;
            }
            .bill-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              padding-bottom: 5px;
              border-bottom: 1px dashed #ccc;
            }
            .item-details {
              flex: 1;
            }
            .item-quantity {
              margin: 0 20px;
            }
            .bill-total {
              text-align: right;
              font-weight: bold;
              font-size: 1.2em;
              margin-top: 20px;
              padding-top: 10px;
              border-top: 2px solid #1976d2;
            }
            .bill-footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
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
            <h1>Hotel Billing System</h1>
            <h2>Bill #${this.currentOrder.id}</h2>
            <p>Date: ${orderDate}</p>
          </div>

          <div class="bill-items">
            ${this.currentOrder.items.map(item => `
              <div class="bill-item">
                <div class="item-details">
                  <strong>${item.menuItem.name}</strong>
                  <p>${item.menuItem.description}</p>
                </div>
                <div class="item-quantity">
                  x${item.quantity}
                </div>
                <div class="item-price">
                  ₹${item.subtotal.toFixed(2)}
                </div>
              </div>
            `).join('')}
          </div>

          <div class="bill-total">
            Total Amount: ₹${this.currentOrder.total.toFixed(2)}
          </div>

          <div class="bill-footer">
            <p>Thank you for dining with us!</p>
            <p>Please visit again</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  }
} 