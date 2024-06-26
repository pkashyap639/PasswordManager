import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { VaultComponent } from './components/dashboard/vault/vault.component';
import { PasswordGeneratorComponent } from './components/dashboard/password-generator/password-generator.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { VaultModalComponent } from './components/dashboard/vault/vault-modal/vault-modal.component';
import { VaultTableComponent } from './components/dashboard/vault/vault-table/vault-table.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { EditVaultComponent } from './components/dashboard/vault/edit-vault/edit-vault.component';

export function tokenGetter() {
  return sessionStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    SignInFormComponent,
    DashboardComponent,
    NavbarComponent,
    VaultComponent,
    PasswordGeneratorComponent,
    SettingsComponent,
    VaultModalComponent,
    VaultTableComponent,
    EditVaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://localhost:7250/"],
        disallowedRoutes: [""],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
