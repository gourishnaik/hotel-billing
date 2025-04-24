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
      name: 'Idli-sambhar',
      description: '',
      imageUrl:'https://media.istockphoto.com/id/638506124/photo/idli-with-coconut-chutney-and-sambhar.jpg?s=612x612&w=0&k=20&c=ze1ngBM0LY4w9aqWx_tGe2vTAr4uf36elveTDZ83fgw=',
      price: 50,
      category: 'breakfast',
      isAvailable: true
    },
    {
      id: 2,
      name: 'Masala dosa',
      description: '',
      price: 50,
      imageUrl:'https://i.ytimg.com/vi/CCab5oh0ZOc/maxresdefault.jpg',
      category: 'breakfast',
      isAvailable: true
    },
    {
      id: 3,
      name: 'Veg thali',
      description: 'Fresh romaine lettuce with Caesar dressing',
      price: 100,
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzlvXn1Eo3Grwt8Ap2StzIU4k8Mq0JsKP6gg&s',
      category: 'lunch',
      isAvailable: true
    },
    {
      id: 5,
      name: 'Chicken biryani',
      description: 'Fresh romaine lettuce with Caesar dressing',
      price: 150,
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGWIaLxtyNCFo1W3_Khd_3Q5EUfaJPLzuTw&s',
      category: 'lunch',
      isAvailable: true
    },
    {
      id: 6,
      name: 'Fish thali',
      description: 'Fresh romaine lettuce with Caesar dressing',
      price: 150,
      imageUrl:'https://static.toiimg.com/thumb/resizemode-72,width-1280,height-720,msid-108802976/108802976.jpg',
      category: 'lunch',
      isAvailable: true
    },
    {
      id: 4,
      name: 'Grilled Salmon',
      description: 'Fresh salmon with seasonal vegetables',
      price: 1899.99,
      imageUrl:'',
      category: 'dinner',
      isAvailable: true
    },
    {
      id: 15,
      name: 'kebab',
      description: '',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA6kqAHWg5mgb5kgjctNf7tXC0melDchuC2g&s',
      price: 100,
      category: 'lunch',
      isAvailable: true
    },
    {
      id: 10,
      name: 'Poori - bhaji',
      description: '',
      imageUrl:'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/poori-puri-recipe.jpg',
      price: 50,
      category: 'breakfast',
      isAvailable: true
    },
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