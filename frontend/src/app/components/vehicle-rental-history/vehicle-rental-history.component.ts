import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { VehicleRentalHistoryDataSource, VehicleRentalHistoryItem } from './vehicle-rental-history-datasource';

@Component({
  selector: 'app-vehicle-rental-history',
  templateUrl: './vehicle-rental-history.component.html',
  styleUrl: './vehicle-rental-history.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatIcon
  ],
})
export class VehicleRentalHistoryComponent implements AfterViewInit {
  constructor(private router: Router) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<VehicleRentalHistoryItem>;

  dataSource = new VehicleRentalHistoryDataSource();

  /** Columns displayed in the table. */
  displayedColumns = ['name', 'lastName', 'carPlate', 'rentalId', 'checkOut', 'checkIn', 'status'];

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
