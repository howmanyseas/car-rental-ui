import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { UpcomingRentalListsItem } from './upcoming-rentals-datasource';
import { CommonModule } from '@angular/common';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upcoming-rentals',
  templateUrl: './upcoming-rentals.component.html',
  styleUrls: ['./upcoming-rentals.component.scss'],
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule]
})
export class UpcomingRentalsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'rentalId',
    'customer',
    'car',
    'employee',
    'checkOutPrice',
    'checkOut',
    'checkIn',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<UpcomingRentalListsItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.data = [
      {
        rentalId: '1',
        customer: 'John Doe',
        car: 'Toyota',
        employee: 'Alice',
        checkOutPrice: 150,
        checkOut: new Date(),
        checkIn: new Date(),
        status: 'Upcoming'
      },
      {
        rentalId: '2',
        customer: 'Jane Smith',
        car: 'Honda',
        employee: 'Bob',
        checkOutPrice: 200,
        checkOut: new Date(),
        checkIn: new Date(),
        status: 'Upcoming'
      }
    ];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
