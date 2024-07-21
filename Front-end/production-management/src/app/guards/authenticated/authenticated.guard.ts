import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { of, tap } from 'rxjs';

@Injectable({ providedIn: "root" })
export class AuthenticatedGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    return this.isAuth$();
  }

  private isAuth$() {
    return of(this.authService.isAuthenticated())
    .pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

};
