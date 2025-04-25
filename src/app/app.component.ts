import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './shared/snackbar/snackbar.service';
import { BillingService } from './services/billing.service';

interface Tab {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private snackbarService: SnackbarService,private billling:BillingService) {}

  selectedTab: string = 'menu';
  
  tabs: Tab[] = [
    { id: 'menu', name: 'Menu' },
    { id: 'order', name: 'Current Order' },
    { id: 'bills', name: 'Bill Details' }
  ];

  ngOnInit() {
    // Test snackbar on app initialization
    this.snackbarService.showMessage('Welcome to Hotel Billing System');
    this.load();
    
  }


  load(){
  
  
      this.billling.getOrders().subscribe({
        next: (orders) => {
        
        },
        error: (error) => {
        
        }
      });
    
  }
  testSnackbar() {
    this.snackbarService.showWithAction(
      'This is a test snackbar message',
      'Click Me',
      5000
    );
  }
}
