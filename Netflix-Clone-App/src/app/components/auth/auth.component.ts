import { Component, WritableSignal, signal, NgZone } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  firstName: string = '';
  lastName: string = '';

  variant: WritableSignal<string> = signal('login');

  currentUserSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private ngZone: NgZone,
  ) {
    this.currentUserSubscription = this.supabaseService.currenUser.subscribe(
      (user) => {
        if (user) {
          this.ngZone.run(() => {
            this.router.navigate(['/home']);
          });
        }
      },
    );
  }

  toggleVariant(): void {
    if (this.variant() === 'login') {
      this.variant.set('register');
    } else {
      this.variant.set('login');
    }
  }

  signIn(): void {
    this.supabaseService.signInWithEmail(this.email, this.password);
  }

  signUp(): void {
    this.supabaseService.signUpNewUser(
      this.email,
      this.password,
      this.firstName,
      this.lastName,
    );
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }
}
