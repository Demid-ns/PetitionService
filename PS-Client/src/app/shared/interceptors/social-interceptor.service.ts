import {HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {SOCIAL_TOKEN_KEY} from '../services/auth.service';
import {SocialSecurityConstants} from '../../config/security-constants.config';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const socialToken = localStorage.getItem(SOCIAL_TOKEN_KEY);
    if (socialToken != null) {
      authReq = req.clone({
        headers: req.headers.set(SocialSecurityConstants.TOKEN_HEADER_KEY, `${SocialSecurityConstants.TOKEN_PREFIX} ${socialToken}`)
      });
    }
    return next.handle(authReq);
  }
}

export const httpSocialInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
