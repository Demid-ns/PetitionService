import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponse} from '../models/auth_response';
import {tap} from 'rxjs/operators';

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
    this.authService.signOut();
    localStorage.removeItem(SOCIAL_TOKEN_KEY);
  }

  public login(user: User): Observable<any> {
    return this.http.post(`${environment.resApi}/auth/jwt/create`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  public isAuthenticated(): boolean {
    if (this.user) {
      return true;
    }
  }

  public loginByGoogle(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      localStorage.setItem(SOCIAL_TOKEN_KEY, this.user.idToken);
      this.router.navigate(['dashboard']);
    });
  }

  private setToken(response: AuthResponse): void {
    console.log(response.access_token);
    localStorage.setItem(DEFAULT_TOKEN_KEY, response.access_token);
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
