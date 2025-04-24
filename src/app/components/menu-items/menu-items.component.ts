import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { BillingService } from '../../services/billing.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  menuItems: MenuItem[] = [];
  selectedCategory: 'breakfast' | 'lunch' | 'dinner' = 'breakfast';

  constructor(
    private menuService: MenuService,
    private billingService: BillingService
  ) { }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuService.getMenuItemsByCategory(this.selectedCategory)
      .subscribe(items => {
        this.menuItems = items;
      });
  }

  onCategoryChange(category: 'breakfast' | 'lunch' | 'dinner'): void {
    this.selectedCategory = category;
    this.loadMenuItems();
  }

  addToOrder(item: MenuItem): void {
    this.billingService.addItemToOrder(item);
  }
} 