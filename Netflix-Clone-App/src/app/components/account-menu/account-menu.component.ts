import { Component, Input, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-account-menu',
  standalone: true,
  imports: [],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.css',
})
export class AccountMenuComponent {
  constructor(private supabaseService: SupabaseService) {}
  @Input({ required: true }) visible = signal(false);

  async getFavoriteMovies() {
    this.supabaseService.getFavoriteMovies();
  }

  signOut() {
    this.supabaseService.signOut();
  }
}
