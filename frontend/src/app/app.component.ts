import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import the Material modules you need:
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// Import the child component (your header)
//import { DefaultHeaderComponent } from './layouts/default-header/default-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // Import all the modules and standalone components you need here
  imports: [
    RouterOutlet,
    MatSidenavModule,      // for <mat-sidenav>, <mat-sidenav-container>
    MatListModule,         // for <mat-nav-list>
    //DefaultHeaderComponent // for <app-default-header>
  ]
})
export class AppComponent {
  title = 'frontend';
}
