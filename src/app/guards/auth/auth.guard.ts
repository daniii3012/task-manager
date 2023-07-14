import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isLogged()) {
    return true;
  } else {
    console.log('Session not found');
    router.navigate(['/login']);
    return false;
  }

};
