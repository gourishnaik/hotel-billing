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
      description: '',
      price: 100,
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzlvXn1Eo3Grwt8Ap2StzIU4k8Mq0JsKP6gg&s',
      category: 'lunch',
      isAvailable: true
    },
    {
      id: 5,
      name: 'Chicken biryani',
      description: '',
      price: 150,
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGWIaLxtyNCFo1W3_Khd_3Q5EUfaJPLzuTw&s',
      category: 'lunch',
      isAvailable: true
    },
    {
      id: 6,
      name: 'Fish thali',
      description: '',
      price: 150,
      imageUrl:'https://static.toiimg.com/thumb/resizemode-72,width-1280,height-720,msid-108802976/108802976.jpg',
      category: 'lunch',
      isAvailable: true
    },
    // {
    //   id: 4,
    //   name: 'Grilled Salmon',
    //   description: 'Fresh salmon with seasonal vegetables',
    //   price: 1899.99,
    //   imageUrl:'',
    //   category: 'dinner',
    //   isAvailable: true
    // },
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
      description: '',
      price: 50,
      category: 'cold-drinks',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOi5pNAbt0TIRSNvh0Va9C0G0wvKRxR_2sUg&s',
      isAvailable: true
    },
    {
      id: 21,
      name: 'Sprite half litre',
      description: '',
      price: 50,
      imageUrl:'data:image/jpeg;base64,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',
      category: 'cold-drinks',
      isAvailable: true
    },
    {
      id: 22,
      name: 'Water 1 litre',
      description: '',
      price: 20,
      category: 'cold-drinks',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ013ZJEzgGHh3Urnwdn631I23ik4EtVmHvQ&s',
      isAvailable: true
    },
    {
      id: 23,
      name: 'Water 2 litre',
      description: '',
      price: 30,
      category: 'cold-drinks',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ013ZJEzgGHh3Urnwdn631I23ik4EtVmHvQ&s',
      isAvailable: true
    },
    {
      id: 24,
      name: 'Cold drink',
      description: '',
      price: 15,
      category: 'cold-drinks',
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqDsF6GvqnCrBXY8scjutJkEpQvwBZL_ILw&s',
      isAvailable: true
    },
    {
      id: 25,
      name: 'Cold drink2',
      description: '',
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
    },
    {
      id: 28,
      name: 'Samosa',
      description: '',
      imageUrl:'data:image/jpeg;base64,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',
      price: 20,
      category: 'breakfast',
      isAvailable: true
    },
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