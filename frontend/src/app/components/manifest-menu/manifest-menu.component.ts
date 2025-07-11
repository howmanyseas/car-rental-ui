import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

export interface Rental {
  rentalId: string;
  customer: string;
  carGroup: string;
  phoneNumber: string;
  email: string;
  checkOutPrice: number;
  checkOut: Date;
  checkIn: Date;
  status: string;
}
@Component({
  selector: 'app-manifest-menu',
  imports: [CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSortModule,
    MatCardModule,
    MatButtonToggleModule,],
  templateUrl: './manifest-menu.component.html',
  styleUrl: './manifest-menu.component.scss'
})
export class ManifestMenuComponent implements OnInit, AfterViewInit {
  rentalTypes = ['Upcoming', 'Open', 'Closed', 'Returning'];
  selectedType: string = 'Upcoming';

  displayedColumns: string[] = [
    'rentalId',
    'customer',
    'carGroup',
    'checkOutPrice',
    'phonenr',
    'emailadr',
    'checkOut',
    'checkIn',
    'status',
    'actions',
  ];

  dataSource = new MatTableDataSource<Rental>();
  allRentals: Rental[] = [];

  filterStartDate: string = '';
  filterEndDate: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    const todayStr = this.formatDate(new Date());
    this.filterStartDate = todayStr;
    this.filterEndDate = todayStr;
    this.applyDateFilter();



    this.allRentals = [
      {
        rentalId: '1',
        customer: 'John Doe',
        carGroup: 'Toyota Yaris',
        phoneNumber: '+355692223344',
        email: 'john@example.com',
        checkOutPrice: 150,
        checkOut: now,
        checkIn: tomorrow,
        status: 'Upcoming',
      },
      {
        rentalId: '2',
        customer: 'Jane Smith',
        carGroup: 'Honda Civic',
        phoneNumber: '+355693334455',
        email: 'jane@example.com',
        checkOutPrice: 200,
        checkOut: now,
        checkIn: tomorrow,
        status: 'Returning',
      },
      {
        rentalId: '3',
        customer: 'Emily Brown',
        carGroup: 'Ford Focus',
        phoneNumber: '+355694445566',
        email: 'emily@example.com',
        checkOutPrice: 180,
        checkOut: now,
        checkIn: tomorrow,
        status: 'Open',
      },
      {
        rentalId: '4',
        customer: 'Mark Johnson',
        carGroup: 'BMW 3 Series',
        phoneNumber: '+355695556677',
        email: 'mark@example.com',
        checkOutPrice: 300,
        checkOut: new Date(now.setDate(now.getDate() - 5)),
        checkIn: new Date(now.setDate(now.getDate() - 2)),
        status: 'Closed',
      }
    ];


    this.updateTable();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectRentalType(type: string): void {
    this.selectedType = type;
    this.updateTable();
  }
  getActionButtons(): string[] {
    switch (this.selectedType.toLowerCase()) {
      case 'upcoming':
        return ['New Reservation'];
      case 'open':
        return ['New Rental', 'Close Rental'];
      case 'returning':
        return ['Close Rental'];
      case 'closed':
        return [];
      default:
        return [];
    }
  }

  handleAction(action: string): void {
    switch (action) {
      case 'New Reservation':
        this.router.navigate(['/new-upcoming-rental']);
        break;
      case 'New Rental':
        this.router.navigate(['/check-out']);
        break;
      case 'Close Rental':
        this.router.navigate(['/check-in']);
        break;
      default:
        console.warn('Unhandled action:', action);
    }
  }


  updateTable(): void {
    const filtered = this.allRentals.filter(
      (r) => r.status.toLowerCase() === this.selectedType.toLowerCase()
    );
    this.dataSource.data = filtered;
    this.applyDateFilter();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter(): void {
    let start = this.filterStartDate ? new Date(this.filterStartDate) : null;
    let end = this.filterEndDate ? new Date(this.filterEndDate) : null;

    this.dataSource.data = this.allRentals
      .filter((r) => r.status.toLowerCase() === this.selectedType.toLowerCase())
      .filter((r) => {
        const out = new Date(r.checkOut);
        if (start && out < start) return false;
        if (end && out > end) return false;
        return true;
      });
  }

  filterToday(): void {
    const today = new Date();
    this.filterStartDate = this.formatDate(today);
    this.filterEndDate = this.formatDate(today);
    this.applyDateFilter();
  }

  filterTomorrow(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.filterStartDate = this.formatDate(tomorrow);
    this.filterEndDate = this.formatDate(tomorrow);
    this.applyDateFilter();
  }

  formatDate(date: Date): string {
    return date.toISOString().substring(0, 10);
  }

  editRental(): void {
    this.router.navigate(['check-out']);
  }

  gotoNewUpRental(): void {
    this.router.navigate(['new-upcoming-rental']);
  }
  clearDateFilters(): void {
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.updateTable();
  }

}

