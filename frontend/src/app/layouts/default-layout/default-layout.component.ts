import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
import { RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../components/back-button.component';


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
    DefaultHeaderComponent,
    BackButtonComponent
  ]
})
export class DefaultLayoutComponent {
  isExpanded = false;

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Cars', icon: 'directions_car', route: '/vehicles' },
    { label: 'Check Out', route: '/check-out', icon: 'call_missed_outgoing' },
    { label: 'Check In', route: '/check-in', icon: 'check_circle_outline' },
    { label: 'Upcoming Rentals', route: '/upcoming-rentals', icon: 'schedule' },
    { label: 'Users', route: '/users-table', icon: 'group' },
    { label: 'Update Prices', route: '/update-prices', icon: 'attach_money' },
    { label: 'Help', route: '/help-page', icon: 'help_outline' }

  ];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {

    console.log('✅ DefaultLayoutComponent Loaded');

  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
