import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    
    return this.authService.isLoggedIn().pipe(
      map(response => {
        if (response.isAuthenticated) {
          return true; // Allow access
        } else {
          this.router.navigate(['/login']);
          return false; // Deny access
        }
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        return of(false); // Deny access on error
      })
    );
  }
}
