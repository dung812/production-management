import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    IconsProviderModule,
    SharedModule
  ]
})
export class MainLayoutModule { }
