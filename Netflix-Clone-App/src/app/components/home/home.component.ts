import { Component, Signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { User } from '@supabase/supabase-js';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  curentUser!: Signal<boolean | User | any>;
  constructor(private supabaseService: SupabaseService) {
    console.log();
  }

  ngOnInit() {
    this.curentUser = this.supabaseService.currentUser;
    console.log(this.curentUser());
  }
  logout() {
    this.supabaseService.signOut();
  }
}
