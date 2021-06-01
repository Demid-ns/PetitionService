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
import {PetitionComponent} from './pages/petition/petition.component';
import {CreatePetitionComponent} from './pages/create-petition/create-petition.component';
import {AuthComponent} from './pages/auth/auth.component';
import {SignupComponent} from './pages/signup/signup.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {httpSocialInterceptorProviders} from './shared/interceptors/social-interceptor.service';
import {JwtModule} from '@auth0/angular-jwt';
import {DEFAULT_TOKEN_KEY} from './shared/services/auth.service';

const CLIENT_ID = environment.CLIENT_ID;

export function tokenGetter(): string {
  return localStorage.getItem(DEFAULT_TOKEN_KEY);
}

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
    ReactiveFormsModule,
    SocialLoginModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        authScheme: 'JWT '
      },
    }),
  ],
  providers: [
    httpSocialInterceptorProviders,
    {
      provide: RES_API_URL,
      useValue: environment.resApi,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
