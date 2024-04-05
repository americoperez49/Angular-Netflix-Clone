import { Injectable } from '@angular/core';
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
import { Database } from '../../types/supabase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  _currenUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(
    null,
  );

  constructor(private router: Router) {
    this.supabase = createClient<Database>(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

    // this.supabase.auth.getUser().then(({ data }) => {
    //   if (data.user) {
    //     this._currenUser.next(data.user);
    //   } else {
    //     this._currenUser.next(false);
    //     this.router.navigate(['/auth']);
    //   }
    // });

    // this.supabase.auth.getSession().then(({ data }) => {
    //   this._session = data.session;
    // });

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      console.log(event);

      if (event == 'SIGNED_IN' || event == 'INITIAL_SESSION') {
        this._currenUser.next(session?.user);
      } else {
        this._currenUser.next(false);
        this.router.navigate(['']);
      }
    });
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  get currenUser() {
    return this._currenUser.asObservable();
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
