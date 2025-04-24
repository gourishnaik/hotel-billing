import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SnackbarService } from './snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  template: `
    <div class="snackbar" [@snackbarState]="state">
      <span>{{ message }}</span>
      <button *ngIf="action" (click)="onAction()">{{ action }}</button>
    </div>
  `,
  styles: [`
    .snackbar {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #323232;
      color: white;
      padding: 14px 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 16px;
      z-index: 1000;
      box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12);
    }
    button {
      background: none;
      border: none;
      color: #bbdefb;
      cursor: pointer;
      font-weight: 500;
      padding: 0;
      text-transform: uppercase;
    }
    button:hover {
      color: #90caf9;
    }
  `],
  animations: [
    trigger('snackbarState', [
      state('void', style({
        transform: 'translate(-50%, 100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translate(-50%, 0)',
        opacity: 1
      })),
      transition('void => visible', animate('300ms ease-out')),
      transition('visible => void', animate('300ms ease-in'))
    ])
  ]
})
export class SnackbarComponent implements OnInit, OnDestroy {
  message: string = '';
  action: string = '';
  state: 'void' | 'visible' = 'void';
  private timeout: any;
  private subscription: Subscription;

  constructor(private snackbarService: SnackbarService) {
    this.subscription = this.snackbarService.snackbar$.subscribe(config => {
      this.show(config.message, config.action, config.duration);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  show(message: string, action?: string, duration: number = 3000) {
    this.message = message;
    this.action = action || '';
    this.state = 'visible';

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    this.state = 'void';
  }

  onAction() {
    // This will be handled by the service
    this.hide();
  }
} 