import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, startWith } from 'rxjs';
import { SimplifiedCurrentUser } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {
  user$: Observable<SimplifiedCurrentUser | null> = new Observable<SimplifiedCurrentUser | null>();
  isAuthenticated$: Observable<boolean>;

  private userSubject = new ReplaySubject<SimplifiedCurrentUser | null>(1);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  constructor() {
    this.user$ = this.userSubject.asObservable();
    this.isAuthenticated$ = this.isAuthenticatedSubject
      .asObservable()
      .pipe(startWith(false));
  }

  setUser(user: SimplifiedCurrentUser | null): void {
    console.log(user);
    this.userSubject.next(user);
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }
}
