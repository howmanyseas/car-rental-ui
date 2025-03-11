import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import the Material modules you need:
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DefaultHeaderComponent } from "./layouts/default-header/default-header.component";
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

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
    MatSidenavModule, // for <mat-sidenav>, <mat-sidenav-container>
    MatListModule,
    //DefaultHeaderComponent,
    DefaultLayoutComponent,
    NgIf
]
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}

  shouldShowLayout(): boolean {
    // Exclude these routes from the default layout
    const excludedRoutes = ['/login', '/register', '/forgot-password'];
    return !excludedRoutes.includes(this.router.url);
  }
}
