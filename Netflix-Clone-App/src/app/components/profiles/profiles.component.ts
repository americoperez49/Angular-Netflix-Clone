import { Component, Signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css',
})
export class ProfilesComponent {
  constructor(supabaseService: SupabaseService) {
    this.currentUser = supabaseService.currentUser;
  }
  currentUser!: Signal<boolean | User | any>;
}
