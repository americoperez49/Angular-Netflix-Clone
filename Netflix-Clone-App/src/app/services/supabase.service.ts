import { Injectable, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthSession,
  createClient,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Database } from '../../types/supabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  currentUser: WritableSignal<boolean | User | any> = signal(null);

  constructor(private router: Router) {
    this.supabase = createClient<Database>(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      // console.log('session', session);
      // console.log('event', event);

      if (event == 'SIGNED_IN' || event == 'INITIAL_SESSION') {
        this.currentUser.set(session?.user);
      } else {
        this.currentUser.set(false);
        this.router.navigate([''], { replaceUrl: true });
      }
    });
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
      console.log('_session', this._session);
    });
    return this._session;
  }
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

    console.log(data, error);
  }

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log(data, error);
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
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
