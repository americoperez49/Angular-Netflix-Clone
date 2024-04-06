import {
  Component,
  WritableSignal,
  signal,
  Signal,
  effect,
} from '@angular/core';
import { InputComponent } from '../input/input.component';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { User } from '@supabase/supabase-js';

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

  currentUser: Signal<boolean | User | any> = signal(null);
  // canEnter;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
  ) {
    // this.canEnter = effect(() => {
    //   if (this.currentUser()) {
    //     this.router.routerState.snapshot.url;
    //     this.router.navigate(['/home'], { replaceUrl: true });
    //   }
    // });
  }

  ngOnInit() {
    if (this.supabaseService.currentUser()) {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  toggleVariant(): void {
    if (this.variant() === 'login') {
      this.variant.set('register');
    } else {
      this.variant.set('login');
    }
  }

  async signIn(): Promise<void> {
    await this.supabaseService.signInWithEmail(this.email, this.password);
    if (this.currentUser()) {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
    console.log();
  }

  signUp(): void {
    this.supabaseService.signUpNewUser(
      this.email,
      this.password,
      this.firstName,
      this.lastName,
    );
  }
}
