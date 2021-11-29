import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    ListComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
