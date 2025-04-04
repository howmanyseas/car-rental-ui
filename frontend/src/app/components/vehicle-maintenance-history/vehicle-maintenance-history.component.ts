import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';  // Import for <mat-divider>
import { MatDatepickerModule } from '@angular/material/datepicker';  // Import for <mat-datepicker>
import { MatNativeDateModule } from '@angular/material/core';  // Date functionality
import { FormsModule } from '@angular/forms';
import { VehicleMaintenanceHistoryDataSource, VehicleMaintenanceHistoryItem } from './vehicle-maintenance-history-datasource';

@Component({
  selector: 'app-vehicle-maintenance-history',
  templateUrl: './vehicle-maintenance-history.component.html',
  styleUrls: ['./vehicle-maintenance-history.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,          // Fix: Import for <mat-divider>
    MatDatepickerModule,       // Fix: Import for <mat-datepicker>
    MatNativeDateModule        // Fix: Import for date functionality
  ],
})
export class VehicleMaintenanceHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<VehicleMaintenanceHistoryItem>;

  dataSource = new VehicleMaintenanceHistoryDataSource();
  displayedColumns = ['dateOfLeave', 'checkOut', 'checkIn', 'days', 'repairType', 'address', 'status'];

  mva: string = ''; // Store the MVA input value

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
