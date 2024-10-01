import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { tap, catchError,map } from "rxjs/operators";

import {LoginResponse} from "../../models/login-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  login(email:string,password:string):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`,{email,password}).pipe(
      tap(response =>{
        console.log("login api response:",response);
      }),
      catchError(error => {
        console.log("Error  in login api:",error);
        return throwError(() => error);
        
      })
    );
  }

  isLoggedIn():Observable<{isAuthenticated:boolean, message:string}>{
    return this.http.get<{isAuthenticated:boolean, message:string}>(`${this.baseUrl}/auth/check-auth`)
  }

  refreshAccessToken():Observable<{message:string}>{
    return this.http.get<{message:string}>(`${this.baseUrl}/auth/refresh`);
  }

  logout():Observable<{message:string}>{
    return this.http.get<{message:string}>(`${this.baseUrl}/auth/logout`,{withCredentials:true});
  }
}


// The catchError operator is used to catch any errors that occur during the observable execution (in this case, during the HTTP request).
// throwError(error) re-throws the error so that any component or service that subscribes to the login method can handle the error appropriately 
// (e.g., showing an error message to the user).