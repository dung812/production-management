import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AuthenticatedGuard } from 'src/app/guards/authenticated/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('src/app/modules/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'welcome',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('src/app/modules/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'user',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule)
      },
      // {
      //   path: "**",
      //   component: NotFoundComponent,
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
