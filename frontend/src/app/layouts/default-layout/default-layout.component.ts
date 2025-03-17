import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    DefaultHeaderComponent
  ]
})
export class DefaultLayoutComponent {
  isExpanded = false;

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Cars', icon: 'directions_car', route: '/vehicles' },
    { label: 'Check Out', route: '/checkout', icon: 'shopping_cart' }, 
    { label: 'Check In', route: '/checkin', icon: 'assignment_turned_in' },
    { label: 'Users', route: '/users', icon: 'group' }, 
    { label: 'Help', route: '/help', icon: 'help_outline' } 
  ];

  constructor(private router: Router , private cdr: ChangeDetectorRef) {
   
      console.log('✅ DefaultLayoutComponent Loaded');
    
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
