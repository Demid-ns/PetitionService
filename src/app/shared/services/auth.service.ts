import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponse} from '../models/auth_response';
import {tap} from 'rxjs/operators';
import {FacebookResponse} from '../models/facebookResponse';

export const SOCIAL_TOKEN_KEY = 'social_access_token';
export const DEFAULT_TOKEN_KEY = 'default_access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:new-parens
  public user: SocialUser = new SocialUser;


  constructor(private http: HttpClient,
              private authService: SocialAuthService,
              private jwtHelper: JwtHelperService,
              private router: Router) {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  public logout(): any {
    localStorage.removeItem(DEFAULT_TOKEN_KEY);
    const token = localStorage.getItem(SOCIAL_TOKEN_KEY);
    if (token) {
      this.authService.signOut();
      localStorage.removeItem(SOCIAL_TOKEN_KEY);
    }
  }

  public login(user: User): Observable<any> {
    return this.http.post(`${environment.resApi}/auth/jwt/create`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  public isAuthenticated(): boolean {
    const defaultToken = localStorage.getItem(DEFAULT_TOKEN_KEY);
    if (defaultToken && !this.jwtHelper.isTokenExpired(defaultToken)) {
      return true;
    }
    if (this.user?.idToken) {
      return true;
    }

    return false;
  }

  public loginByGoogle(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      localStorage.setItem(SOCIAL_TOKEN_KEY, this.user.idToken);
      this.router.navigate(['dashboard']);
    });
  }

  public loginByFacebook(): any {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((response) => {
      const facebookResponse: FacebookResponse = {
        access_token: response.authToken,
        provider: response.provider.toLowerCase()
      };
      return this.http.post(`${environment.resApi}/api/facebook-auth/`, facebookResponse)
        .pipe(
          tap(this.setToken)
        ).subscribe(() => {
          this.router.navigate(['dashboard']);
        });
    });
  }

  private setToken(response: AuthResponse): void {
    localStorage.setItem(DEFAULT_TOKEN_KEY, response.access);
  }

  // public makeAuthRequest(redirectUri: string): Observable<any> {
  //   return this.http.get<Category[]>(`${environment.resApi}/auth/o/google-oauth2/?redirect_uri=${redirectUri}`,
  //     {withCredentials: true});
  // }
  //
  // public getGoogleJWT(): Observable<any> {
  //   return this.http.post<Category[]>(`${environment.resApi}/auth/o/google-oauth2/?code=`
  //     + `&state=dvhpirdxNwSam6UJo6AqCwcn1qG53Y0B`, null, {withCredentials: true});
  // }
}
