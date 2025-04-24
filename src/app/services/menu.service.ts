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
    {
      id: 20,
      name: 'Coca Cola half litre',
      description: 'Classic carbonated soft drink',
      price: 50,
      category: 'cold-drinks',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOi5pNAbt0TIRSNvh0Va9C0G0wvKRxR_2sUg&s',
      isAvailable: true
    },
    {
      id: 21,
      name: 'Sprite half litre',
      description: 'Lemon-lime flavored carbonated drink',
      price: 50,
      imageUrl:'data:image/jpeg;base64,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',
      category: 'cold-drinks',
      isAvailable: true
    },
    {
      id: 22,
      name: 'Water 1 litre',
      description: 'Orange flavored carbonated drink',
      price: 20,
      category: 'cold-drinks',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ013ZJEzgGHh3Urnwdn631I23ik4EtVmHvQ&s',
      isAvailable: true
    },
    {
      id: 23,
      name: 'Water 2 litre',
      description: 'Pure mineral water',
      price: 30,
      category: 'cold-drinks',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ013ZJEzgGHh3Urnwdn631I23ik4EtVmHvQ&s',
      isAvailable: true
    },
    {
      id: 24,
      name: 'Cold drink',
      description: 'Pure mineral water',
      price: 15,
      category: 'cold-drinks',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqDsF6GvqnCrBXY8scjutJkEpQvwBZL_ILw&s',
      isAvailable: true
    },
    {
      id: 25,
      name: 'Cold drink2',
      description: 'Pure mineral water',
      price: 10,
      category: 'cold-drinks',
      imageUrl:'https://5.imimg.com/data5/SELLER/Default/2022/10/QL/PB/VT/88365945/slice-mango-drink.jpg',
      isAvailable: true
    },
    {
      id: 27,
      name: 'Cold drink Glass bottle',
      description: '',
      price: 20,
      category: 'cold-drinks',
      imageUrl:'https://tiimg.tistatic.com/fp/1/001/434/cold-drink-glass-bottles-646.jpg',
      isAvailable: true
    }
  ];

  private menuItemsSubject = new BehaviorSubject<MenuItem[]>(this.menuItems);

  constructor() { }

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItemsSubject.asObservable();
  }

  getMenuItemsByCategory(category: 'breakfast' | 'lunch' | 'dinner' | 'cold-drinks'): Observable<MenuItem[]> {
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