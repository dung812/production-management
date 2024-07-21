import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { STORAGE_KEYS, StorageService } from 'src/app/core/service/storage.service';
import { AppContextService } from 'src/app/core/state/app-context.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading : boolean = false;

  loginForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private fb: NonNullableFormBuilder,
    private storage: StorageService,
    private authService: AuthService,
    private appContext: AppContextService,
    private readonly router: Router,
  ) {
    // localStorage.clear();
    this.storage.remove(STORAGE_KEYS.TOKEN);
    this.storage.remove(STORAGE_KEYS.USER);

  }


  submitForm(): void {
    if (!this.loginForm.valid) {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.isLoading  = true;

    this.authService.login(
      this.loginForm.value.userName ?? '',
      this.loginForm.value.password ?? ''
    )
     .subscribe({
        next: (currentUserRes: any) => {
          if (!currentUserRes) return;

          this.isLoading  = false;

          // set local storage
          this.storage.set(STORAGE_KEYS.USER, {
            name: currentUserRes.name,
            role: currentUserRes.role,
            email: currentUserRes.email,
            isFirstLogin: currentUserRes.isFirstLogin
          });
          this.storage.set(STORAGE_KEYS.TOKEN, currentUserRes.accessToken);

          // set state
          this.appContext.setAuthenticated(true);

          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;
          alert(err.error.Message);
        }
      });
  }
}
