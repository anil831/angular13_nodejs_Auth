import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"admin",loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)},
  {path:"vendor",loadChildren: () => import("./vendor/vendor.module").then(m => m.VendorModule)},
  {path:"home",component:LayoutComponent, canActivate:[AuthGuard]},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
