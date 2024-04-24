import { Component, Signal, computed, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { NavbarComponent } from '../navbar/navbar.component';
import { BillboardComponent } from '../billboard/billboard.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { Tables } from '../../../types/supabase';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    BillboardComponent,
    MovieListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentUser!: Signal<boolean | User | any>;
  movies: Signal<Tables<'movies'>[] | []> = signal([]);
  favoriteMovies: Signal<Tables<'movies'>[] | []> = computed(() => {
    const favs = this.supabaseService.favoriteMovies();
    return this.movies().filter((movie: Tables<'movies'>) => {
      return favs.includes(movie.id as never);
    });
  });

  constructor(private supabaseService: SupabaseService) {
    this.currentUser = supabaseService.currentUser;
  }

  async ngOnInit(): Promise<void> {
    await this.supabaseService.getAllMovies();
    await this.supabaseService.getFavoriteMovies();
    this.movies = this.supabaseService.allMovies;
  }
  logout() {
    this.supabaseService.signOut();
  }
}
