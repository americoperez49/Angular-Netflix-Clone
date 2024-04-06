import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);
  5;
  const curentUser = supabaseService.currentUser;
  console.log(curentUser());
  if (curentUser()) {
    return true;
  } else {
    return router.createUrlTree(['/']);
  }
};
