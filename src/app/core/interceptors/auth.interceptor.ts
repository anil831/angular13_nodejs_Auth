import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError,tap, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("auth interceptor is executing...");

    // Clone the request and set withCredentials
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          console.error('Error occurred:', error);
          console.error('Error occurred: status:', error.status);
          console.error("url :",request.url);
          

          if ((error.status === 401 || error.status === 403) && (!request.url.endsWith('/auth/login')) ) {
            console.error("calling refresh token");

            return this.authService.refreshAccessToken().pipe(
              switchMap((value) => {                
                // Clone the original request again if needed
                const newRequest = request.clone({withCredentials:true});
                return next.handle(newRequest); // Retry the request with the new token
              }),
              catchError((err:HttpErrorResponse) => {
                console.error("err :", err);
                if (err instanceof HttpErrorResponse) {
                  console.error('Error occurred2:', err);
                  console.error('Error occurred2: status:', err.status);

                  if (err.status === 401 || error.status === 403) {
                    return this.authService.logout().pipe(
                      tap(() => {
                        console.error("Logging out...");
                        localStorage.removeItem('userId'); // Clear any stored user data
                        this.router.navigate(['/login']); // Navigate to the login page
                      }),
                      switchMap(() => throwError(() => err)) // Rethrow the original error without returning a non-HTTP event
                    );
                  }
              
                }
                  
               
                
                return throwError(() => err); // Rethrow other errors
              })
            );
          }
        }

        return throwError(() => error); // Rethrow other errors
      })
    );
  }
}
