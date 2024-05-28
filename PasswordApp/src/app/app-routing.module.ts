import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { VaultComponent } from './components/dashboard/vault/vault.component';
import { PasswordGeneratorComponent } from './components/dashboard/password-generator/password-generator.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';

const routes: Routes = [
   {path:'', component: SignInFormComponent},
   {path:'signin', component:SignInFormComponent},
   {path:'signup', component: SignUpFormComponent},
   {path:'dashboard', component: DashboardComponent, canActivate:[authGuard],
    children:[
      {path:'', redirectTo:'vault', pathMatch:'full'},
      {path:'vault', component: VaultComponent, canActivate:[authGuard]},
      {path:'generator', component: PasswordGeneratorComponent, canActivate:[authGuard]},
      {path:'settings', component: SettingsComponent, canActivate:[authGuard]},
    ]
   },
   {path: '**', redirectTo: 'signin', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
