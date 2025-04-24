import { Component } from '@angular/core';

interface Tab {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTab: string = 'menu';
  
  tabs: Tab[] = [
    { id: 'menu', name: 'Menu' },
    { id: 'order', name: 'Current Order' },
    { id: 'bills', name: 'Bill Details' }
  ];
}
