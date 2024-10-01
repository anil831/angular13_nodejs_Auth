import { NgModule } from '@angular/core';
import { ToasterService } from './services/toaster.service';
import {AuthService} from "./services/auth.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import{SessionService} from "./services/session.service";



@NgModule({

  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    ToasterService,
    AuthService,
    SessionService
  ], // Provide your service here

})
export class CoreModule { }

// provide:HTTP_INTERCEPTORS: This is a token that tells Angular to use the interceptors in your application.
// useClass: AuthInterceptor: This specifies the actual class that should be used for the interceptors
// multi: true : This tells Angular that you want to allow multiple interceptors to be added.
