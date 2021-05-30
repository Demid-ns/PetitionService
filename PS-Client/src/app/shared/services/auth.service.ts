import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthObject} from '../models/authObject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public makeAuthRequest(redirectUri: string): Observable<any> {
    console.log(`${environment.resApi}/auth/o/google-oauth2/?redirect_uri=${redirectUri}`);
    return this.http.get<Category[]>(`${environment.resApi}/auth/o/google-oauth2/?redirect_uri=${redirectUri}`);
  }

  public getGoogleJWT(authObject: AuthObject): Observable<any> {
    return this.http.get<Category[]>(`${environment.resApi}/auth/o/google-oauth2/?code=${authObject.code}&state=dvhpirdxNwSam6UJo6AqCwcn1qG53Y0B`);
  }
}
