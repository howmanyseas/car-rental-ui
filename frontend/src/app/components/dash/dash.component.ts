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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



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
    MatSlideToggleModule
  ],
})
export class DashComponent {
  constructor(private router: Router) { }

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
  onFilterChange(value: string) {
    console.log('Filter selected:', value);
    // You can implement logic here to update the cards/data
  }
  goToSmDashboard() {
    this.router.navigate(['/sm-dashboard']); // or whatever your SM route is
  }
  toggleDashboard(isSm: boolean) {
  if (isSm) {
    this.router.navigate(['/sm-dashboard']);
  } else {
    this.router.navigate(['/dashboard']); // or whatever your main dashboard route is
  }
}


}
