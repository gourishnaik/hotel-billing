import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Continental Breakfast',
      description: 'Assorted pastries, fruits, and coffee',
      price: 15.99,
      category: 'breakfast',
      isAvailable: true
    },
    {
      id: 2,
      name: 'Full English Breakfast',
      description: 'Eggs, bacon, sausage, beans, and toast',
      price: 18.99,
      category: 'breakfast',
      isAvailable: true
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing',
      price: 12.99,
      category: 'lunch',
      isAvailable: true
    },
    {
      id: 4,
      name: 'Grilled Salmon',
      description: 'Fresh salmon with seasonal vegetables',
      price: 24.99,
      category: 'dinner',
      isAvailable: true
    }
  ];

  private menuItemsSubject = new BehaviorSubject<MenuItem[]>(this.menuItems);

  constructor() { }

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItemsSubject.asObservable();
  }

  getMenuItemsByCategory(category: 'breakfast' | 'lunch' | 'dinner'): Observable<MenuItem[]> {
    return new Observable(observer => {
      const filteredItems = this.menuItems.filter(item => item.category === category);
      observer.next(filteredItems);
      observer.complete();
    });
  }

  addMenuItem(item: MenuItem): void {
    this.menuItems.push(item);
    this.menuItemsSubject.next(this.menuItems);
  }

  updateMenuItem(item: MenuItem): void {
    const index = this.menuItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.menuItems[index] = item;
      this.menuItemsSubject.next(this.menuItems);
    }
  }

  deleteMenuItem(id: number): void {
    this.menuItems = this.menuItems.filter(item => item.id !== id);
    this.menuItemsSubject.next(this.menuItems);
  }
} 