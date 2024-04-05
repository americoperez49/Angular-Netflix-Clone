import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { inject } from '@angular/core';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  return supabaseService.currenUser.pipe(
    filter((val) => val !== null || val !== undefined),
    take(1),
    map((isAuthenticated) => {
      console.log('isAuthenticated', isAuthenticated);
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['']);
      }
    }),
  );
};
