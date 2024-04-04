import { Component, WritableSignal, signal } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  variant: WritableSignal<string> = signal('login');

  toggleVariant(): void {
    if (this.variant() === 'login') {
      this.variant.set('register');
    } else {
      this.variant.set('login');
    }
  }

  constructor() {}
}
