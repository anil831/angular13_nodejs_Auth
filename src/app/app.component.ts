import { Component } from '@angular/core';
import { SessionService } from './core/services/session.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular13-auth';
  constructor(private sessionService:SessionService){}
}
