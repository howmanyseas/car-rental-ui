import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgForOf } from '@angular/common'; // Import NgForOf
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
  standalone: true,
  imports: [
   
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class DashComponent {
  constructor(private router: Router) {}

  navigateTo(title: string): void {
    if (title === 'Recent Rentals') {
      this.router.navigate(['/rental-lists']);
    }
    if (title === 'Total Cars Available') {
      this.router.navigate(['/available-vehicles']);
    }
    if (title === 'Total Revenue') {
      this.router.navigate(['/revenue']);
    }
  }
}
