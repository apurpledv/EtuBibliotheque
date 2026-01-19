import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepting request: " + req.url);

    const token = sessionStorage.getItem('auth_token');

    // Without token: handle normally
    if (!token)
      return next.handle(req);

    //console.log("Using token: " + token);

    // With token: add it to the Authorisation Header
    const authReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });

    return next.handle(authReq);
  }
}