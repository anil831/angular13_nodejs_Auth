import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleTableComponent } from './role-table/role-table.component';
import { ScreenFormComponent } from './screen-form/screen-form.component';
import { ScreenTableComponent } from './screen-table/screen-table.component';
import { ScreenAccessFormComponent } from './screen-access-form/screen-access-form.component';
import { ScreenAccessTableComponent } from './screen-access-table/screen-access-table.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [

  
    RoleFormComponent,
        RoleTableComponent,
        ScreenFormComponent,
        ScreenTableComponent,
        ScreenAccessFormComponent,
        ScreenAccessTableComponent,
        AdminDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
