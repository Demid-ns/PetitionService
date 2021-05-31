import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './pages/dasboard/dashboard.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {NavbarNavigationComponent} from './shared/components/navbar-navigation/navbar-navigation.component';
import {TopPetitionsComponent} from './top-petitions/top-petitions.component';
import {PetitionsComponent} from './pages/petitions/petitions.component';
import {environment} from '../environments/environment';
import {RES_API_URL} from './shared/app-injection-tokens';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PetitionComponent } from './pages/petition/petition.component';
import { CreatePetitionComponent } from './pages/create-petition/create-petition.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainLayoutComponent,
    NavbarNavigationComponent,
    TopPetitionsComponent,
    PetitionsComponent,
    PetitionComponent,
    CreatePetitionComponent,
    AuthComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: RES_API_URL,
      useValue: environment.resApi,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
