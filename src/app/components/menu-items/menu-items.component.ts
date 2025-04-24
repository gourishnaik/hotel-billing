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
  selectedCategory: 'breakfast' | 'lunch' | 'dinner' | 'cold-drinks' | 'bills' = 'breakfast';
  categories: ('breakfast' | 'lunch' | 'dinner' | 'cold-drinks')[] = ['breakfast', 'lunch', 'dinner', 'cold-drinks'];

  constructor(
    private menuService: MenuService,
    private billingService: BillingService
  ) { }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    if (this.selectedCategory !== 'bills') {
      this.menuService.getMenuItemsByCategory(this.selectedCategory as 'breakfast' | 'lunch' | 'dinner' | 'cold-drinks')
        .subscribe(items => {
          this.menuItems = items;
        });
    }
  }

  onCategoryChange(category: string): void {
    if (this.categories.includes(category as 'breakfast' | 'lunch' | 'dinner' | 'cold-drinks') || category === 'bills') {
      this.selectedCategory = category as 'breakfast' | 'lunch' | 'dinner' | 'cold-drinks' | 'bills';
      this.loadMenuItems();
    }
  }

  addToOrder(item: MenuItem): void {
    this.billingService.addItemToOrder(item);
  }
} 