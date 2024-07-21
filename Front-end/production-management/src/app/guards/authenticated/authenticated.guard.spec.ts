import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticatedGuard } from './authenticated.guard';
import { AuthService } from 'src/app/core/service/auth.service';

describe('authenticateGuard', () => {
  let guard: AuthenticatedGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, Router],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    guard = new AuthenticatedGuard(authService, router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for authenticated user', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(true));
    guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe(result => {
      expect(result).toBe(true);
    });
  });

  it('should navigate to login page for unauthenticated user', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));
    spyOn(router, 'navigate');
    guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe(result => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});

