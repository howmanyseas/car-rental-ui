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
    AsyncPipe,
    NgForOf, // Add NgForOf here
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class DashComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Recent Rentals', cols: 1, rows: 1 },
          { title: 'Total Cars Available', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Total Cars Available', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
        { title: 'Recent Rentals', cols: 2, rows: 1 },
      ];
    })
  );

  navigateTo(title: string): void {
    if (title === 'Recent Rentals') {
      this.router.navigate(['/rental-lists']);
    }
  }
}
