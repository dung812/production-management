import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { AntDesignModule } from 'src/app/shared/ant-design/ant-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './components/edit/edit-user.component';



@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    AntDesignModule,
  ]
})
export class UserModule { }
