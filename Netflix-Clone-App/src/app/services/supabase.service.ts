import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Database, Tables } from '../../types/supabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  currentUser: WritableSignal<boolean | User | any> = signal(null);

  allMovies: WritableSignal<Tables<'movies'>[] | []> = signal([]);
  favoriteMovies: WritableSignal<number[] | []> = signal([]);
  billboardMovie: WritableSignal<Tables<'movies'> | null | undefined> =
    signal(null);
  constructor(private router: Router) {
    this.supabase = createClient<Database>(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN' || event == 'INITIAL_SESSION') {
        this.currentUser.set(session?.user);
      } else {
        this.currentUser.set(false);
        this.router.navigateByUrl('', { replaceUrl: true });
      }
    });
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  // user(user: User) {
  //   return this.supabase
  //     .from('profiles')
  //     .select(`username, website, avatar_url`)
  //     .eq('id', user.id)
  //     .single();
  // }

  async signUpNewUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'http://localhost:4200/',
        data: {
          firstName: firstName,
          lastName: lastName,
        },
      },
    });

    console.log({ data, error });
  }

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // console.log({ data, error });
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
  }

  async getLinkToWatchMovie(movieId: string) {
    const { data, error } = await this.supabase.storage
      .from('movies')
      .createSignedUrl(movieId + '.mp4', 10);

    if (error) throw error;

    return data.signedUrl;
  }

  async getBillboardMovie() {
    const { data, error } = await this.supabase.rpc('get_billboard_movie');
    if (error) throw error;
    else {
      this.billboardMovie.set(data);
      const response1 = await this.supabase.storage
        .from('thumbnails')
        .createSignedUrl(this.billboardMovie()?.id + '.png', 3600);
      if (response1.error) throw response1.error;

      this.billboardMovie.update((billboardMovie) => {
        if (billboardMovie) {
          billboardMovie.thumbnailUrl = response1.data?.signedUrl;
        }
        return billboardMovie;
      });

      const response2 = await this.supabase.storage
        .from('movies')
        .createSignedUrl(this.billboardMovie()?.id + '.mp4', 10);

      if (response2.error) throw response2.error;
      this.billboardMovie.update((billboardMovie) => {
        if (billboardMovie) {
          billboardMovie.videoUrl = response2.data?.signedUrl;
        }
        return billboardMovie;
      });
    }
  }

  async getAllMovies() {
    const { data, error } = await this.supabase.rpc('get_movies');
    if (error) throw error;
    const movies: Tables<'movies'>[] | [] = data || [];
    if (movies) {
      for (const movie of movies) {
        const response1 = await this.supabase.storage
          .from('thumbnails')
          .createSignedUrl(movie?.id + '.png', 3600);
        if (response1.error) throw response1.error;
        movie.thumbnailUrl = response1.data?.signedUrl;

        // const response2 = await this.supabase.storage
        //   .from('movies')
        //   .createSignedUrl(
        //     movie?.id + '.mp4',
        //     parseInt(movie?.duration as string) * 60,
        //   );
        // if (response2.error) throw response2.error;
        // movie.videoUrl = response2.data?.signedUrl;
      }
    }
    this.allMovies.set(movies);
    return movies;
  }

  async getFavoriteMovies() {
    const user: User = this.currentUser();
    const { data, error } = await this.supabase.rpc(
      'get_users_favorite_movies',
    );
    if (error) throw error;
    const favoriteMovies: number[] = data || [];
    this.favoriteMovies.set(favoriteMovies);
    // return favoriteMovies;
  }

  async addToFavorites(movieId: number) {
    const user: User = this.currentUser();
    const { data, error } = await this.supabase
      .from('user_favorite_movies')
      .insert([{ user_id: user.id, movie_id: movieId }]);
    await this.getFavoriteMovies();
  }

  async removeFromFavorites(movieId: number) {
    const user: User = this.currentUser();
    const { data, error } = await this.supabase
      .from('user_favorite_movies')
      .delete()
      .eq('user_id', user.id)
      .eq('movie_id', movieId);
    await this.getFavoriteMovies();
  }

  // updateProfile(profile: Profile) {
  //   const update = {
  //     ...profile,
  //     updated_at: new Date(),
  //   };

  //   return this.supabase.from('profiles').upsert(update);
  // }

  // downLoadImage(path: string) {
  //   return this.supabase.storage.from('avatars').download(path);
  // }

  // uploadAvatar(filePath: string, file: File) {
  //   return this.supabase.storage.from('avatars').upload(filePath, file);
  // }
}
