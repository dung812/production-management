import { Injectable } from '@angular/core';
import { STORAGE_KEYS, StorageService } from './storage.service';
import { Router } from '@angular/router';
import { AppContextService } from '../state/app-context.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { UtilHelper } from 'src/app/helper/utils.helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginEndpoint = `${environment.apiEndPoint}/auth/login`;
  isLoadingLoginProcess: boolean = false;


  constructor(
    private storage: StorageService,
    private readonly router: Router,
    private appContext: AppContextService,
    private http: HttpClient
  ) {}

  isAuthenticated(): boolean {
    const token = this.storage.get<string>(STORAGE_KEYS.TOKEN);
    const user = this.storage.get<string>(STORAGE_KEYS.USER);
    return Boolean(token && user);
  }

  login(username: string, password: string) : Observable<any> {
    this.isLoadingLoginProcess = true;
    return this.http.post(this.loginEndpoint, { username, password })
  }

  logout() {
    this.storage.remove(STORAGE_KEYS.TOKEN);
    this.storage.remove(STORAGE_KEYS.USER);
    this.appContext.setAuthenticated(false);
    this.appContext.setUser(null);
    this.router.navigate(['/login']);
  }

  haveAccess() {
    const token = this.storage.get<string>(STORAGE_KEYS.TOKEN);
    if (!token) return false;

    let userInfo = UtilHelper.encodedToken(token);
    let role = userInfo['SCHEMAS_ROLE_TOKEN_URL'];
    return role === "Admin" ? true : false;
  }
}
