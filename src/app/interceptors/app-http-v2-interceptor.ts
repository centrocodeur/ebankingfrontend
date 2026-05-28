import {HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth-service';
import {inject} from '@angular/core';

export function appHttpV2Interceptor (req: HttpRequest<unknown>, next: HttpHandlerFn)  {
  // Inject the current "AuthService" and use it to get an authentication token
  const authToken = inject(AuthService).accessToken

  console.log("************");
  console.log(req.url);

  if(!req.url.includes("/auth/login")) {
    let newRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });

    return next(req);
  }
   else return next(req);

}
