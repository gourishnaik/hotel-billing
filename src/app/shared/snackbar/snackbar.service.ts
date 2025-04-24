import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SnackbarConfig {
  message: string;
  action?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarSubject = new Subject<SnackbarConfig>();
  snackbar$ = this.snackbarSubject.asObservable();

  show(config: SnackbarConfig) {
    this.snackbarSubject.next(config);
  }

  showMessage(message: string, duration: number = 3000) {
    this.show({ message, duration });
  }

  showWithAction(message: string, action: string, duration: number = 3000) {
    this.show({ message, action, duration });
  }
} 