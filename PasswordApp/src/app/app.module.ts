import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    SignInFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
