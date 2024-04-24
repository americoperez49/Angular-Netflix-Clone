import { Component, Input } from '@angular/core';
import { Tables } from '../../../types/supabase';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matPlayArrow } from '@ng-icons/material-icons/baseline';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgIconComponent, FavoriteButtonComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
  providers: [
    provideIcons({
      matPlayArrow,
    }),
  ],
})
export class MovieCardComponent {
  @Input({ required: true }) data!: Tables<'movies'>;
  getMovieId(): number {
    return this.data.id;
  }
}
