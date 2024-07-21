import { NgModule } from '@angular/core';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSpinModule } from 'ng-zorro-antd/spin';


const modules = [
  NzMenuModule,
  NzLayoutModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzTableModule,
  NzButtonModule,
  NzBreadCrumbModule,
  NzAvatarModule,
  NzDropDownModule,
  NzPaginationModule,
  NzIconModule,
  NzDescriptionsModule,
  NzSpinModule
];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules]
})
export class AntDesignModule { }
