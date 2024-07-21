import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AppComponent } from './app.component';
import { AuthenticatedGuard } from './guards/authenticated/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import("./layout/main-layout/main-layout.module").then((m) => m.MainLayoutModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
