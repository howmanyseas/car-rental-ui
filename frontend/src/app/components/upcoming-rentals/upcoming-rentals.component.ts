import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

export interface UpcomingRentalListsItem {
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
  selector: 'app-upcoming-rentals',
  templateUrl: './upcoming-rentals.component.html',
  styleUrls: ['./upcoming-rentals.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class UpcomingRentalsComponent implements OnInit, AfterViewInit {
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

  dataSource = new MatTableDataSource<UpcomingRentalListsItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.dataSource.data = [
      {
        rentalId: '1',
        customer: 'John Doe',
        carGroup: 'Toyota Yaris',
        phoneNumber: '+355692223344',
        email: 'john@example.com',
        checkOutPrice: 150,
        checkOut: new Date(),
        checkIn: new Date(),
        status: 'Upcoming',
      },
      {
        rentalId: '2',
        customer: 'Jane Smith',
        carGroup: 'Honda Civic',
        phoneNumber: '+355693334455',
        email: 'jane@example.com',
        checkOutPrice: 200,
        checkOut: new Date(),
        checkIn: new Date(),
        status: 'Active',
      },
    ];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRental(rental: UpcomingRentalListsItem): void {
    console.log('Edit rental:', rental);
  }
  constructor(private router: Router) { }

  gotoNewUpRental(): void {
    this.router.navigate(['new-upcoming-rental']);
  }
}
