import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';



@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class BaseLayoutComponent {
  activePage = '';  // Stores the current active page
  pageTitle = '';   // Stores the current page title

  constructor(private router: Router) {
    // Subscribe to router events to detect page changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePage = event.urlAfterRedirects.split('/')[1]; // Get page name from URL
        this.setPageTitle(this.activePage);
      }
    });
  }

  // Set dynamic page title based on route
  setPageTitle(page: string) {
    const titles: { [key: string]: string } = {
      dashboard: 'Dashboard',
      cars: 'Cars',
      rentals: 'Rentals',
      customers: 'Customers'
    };
    this.pageTitle = titles[page] || 'Page';
  }
}
