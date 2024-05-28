import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
   {path:'', component: SignInFormComponent},
   {path:'signin', component:SignInFormComponent},
   {path:'signup', component: SignUpFormComponent},
   {path:'dashboard', component: DashboardComponent},
   {path: '**', redirectTo: 'signin', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
