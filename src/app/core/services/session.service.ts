import { Injectable, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { ToasterService } from './toaster.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private refreshInterval: any;
  private activityTimeout: any;
  private readonly REFRESH_TIME = 20 * 60 * 1000; // Refresh every 20 minutes
  private readonly INACTIVITY_TIME = 2 * 60 * 1000; // Log out after 30 minutes of inactivity

  constructor(private authService: AuthService, private ngZone: NgZone, private router:Router, private toasterService:ToasterService) {
    console.log("session services loaded");
    
    this.startActivityMonitoring();
  }

  startActivityMonitoring() {
    this.resetTimers();

    this.ngZone.runOutsideAngular(() => {
      //runOutsideAngular() method executes code outside of angular zone and do not trigger change detection
      const resetTimers = () => this.resetTimers();

      document.addEventListener('mousemove', resetTimers);
      document.addEventListener('keypress', resetTimers);
      // Add more events as needed
    });
  }

  resetTimers() {
    // console.log("resetting timers");
    
    clearTimeout(this.refreshInterval);
    clearTimeout(this.activityTimeout);

    this.refreshInterval = setTimeout(() => {
      this.authService.refreshAccessToken().subscribe(() => {
        console.log('Access token refreshed');
        // Optionally: Extend refresh token expiration here
      });
    }, this.REFRESH_TIME);

    this.activityTimeout = setTimeout(() => {
      this.authService.logout().subscribe(() => {
        console.log('Logged out due to inactivity');
        this.ngZone.run(() => {
          //run() method executes code in angular zone and changes made with in this provided callback function are detected and updated in the view
          this.toasterService.showInfo("You have been logged out due to inactivity. Please log in again.")
          this.router.navigate(['/login']);
        });
        
      });
    }, this.INACTIVITY_TIME);
  }
}
