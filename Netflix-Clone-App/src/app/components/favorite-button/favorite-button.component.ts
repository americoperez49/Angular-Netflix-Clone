import { Component, Input, Signal, computed } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAddOutline,
  matCheckOutline,
} from '@ng-icons/material-icons/outline';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css',
  providers: [
    provideIcons({
      matAddOutline,
      matCheckOutline,
    }),
  ],
})
export class FavoriteButtonComponent {
  @Input({ required: true }) movieId!: number;
  isFavorite: Signal<boolean> = computed(() => {
    return this.supabaseService
      .favoriteMovies()
      .includes(this.movieId as never);
  });

  constructor(private supabaseService: SupabaseService) {}

  toggleFavorite() {
    if (this.isFavorite()) {
      this.supabaseService.removeFromFavorites(this.movieId);
    } else {
      this.supabaseService.addToFavorites(this.movieId);
    }
  }
}
