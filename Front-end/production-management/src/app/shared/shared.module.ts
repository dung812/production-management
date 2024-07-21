import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntDesignModule } from './ant-design/ant-design.module';
import { BreadscrumbComponent } from './components/breadscrumb/breadscrumb.component';

@NgModule({
  declarations: [
    BreadscrumbComponent
  ],
  imports: [
    CommonModule,
    AntDesignModule
  ],
  exports: [
    AntDesignModule,
    BreadscrumbComponent
  ]
})
export class SharedModule { }
