import { Component, Input } from '@angular/core';
import { Tables } from '../../../types/supabase';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) data: Tables<'movies'>[] | [] = [];

  constructor() {}
}
