import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BindingComponent } from './components/Binding/binding.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddChefComponent } from './components/add-chef/add-chef.component';


import { SignupComponent } from './components/signup/signup.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AddPlatComponent } from './components/add-plat/add-plat.component';
import { DashboardChefComponent } from './components/dashboard-chef/dashboard-chef.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';



const routes: Routes = [
  {path : "", component : HomeComponent},
  {path : "login", component : LoginComponent},
  {path : "binding", component : BindingComponent},
  {path : "addAdmin", component : AdminComponent},
  {path : "addChef", component : AddChefComponent},
  {path : "signup", component : SignupComponent},
  {path : "dashboardadmin", component : DashboardAdminComponent},
  {path : "addPlat", component : AddPlatComponent},
  {path : "dashboardChef", component : DashboardChefComponent},
  {path : "editUser/:id", component : AdminComponent},
  {path : "editChef/:id", component : AddChefComponent},
  {path : "addPlat/:id", component : AddPlatComponent},
  {path : "displayUser/:id", component : DisplayUserComponent},









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
