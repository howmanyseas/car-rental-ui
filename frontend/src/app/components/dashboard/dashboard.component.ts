import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ]
})
export class DashboardComponent {
  // Define table columns
/*   displayedColumns: string[] = ['carId', 'model', 'year', 'color', 'plate'];
  rentalColumns: string[] = ['rentalId', 'car', 'status', 'date', 'amount'];

  // Random data for cars
  carData = new MatTableDataSource([
    { carId: 'A1001', model: 'BMW', year: Math.floor(Math.random() * 5) + 2018, color: 'Black', plate: 'XYZ123' },
    { carId: 'A1002', model: 'Audi', year: Math.floor(Math.random() * 5) + 2018, color: 'White', plate: 'ABC987' },
    { carId: 'A1003', model: 'Mercedes', year: Math.floor(Math.random() * 5) + 2018, color: 'Red', plate: 'LMN456' },
    { carId: 'A1004', model: 'Tesla', year: Math.floor(Math.random() * 5) + 2018, color: 'Blue', plate: 'TES456' },
    { carId: 'A1005', model: 'Toyota', year: Math.floor(Math.random() * 5) + 2018, color: 'Gray', plate: 'TOY789' }
  ]);

  // Random data for rentals
  rentalData = new MatTableDataSource([
    { rentalId: 'KL123456', car: 'BMW', status: 'Completed', date: '21/10/2023', amount: `${Math.floor(Math.random() * 500) + 100} €` },
    { rentalId: 'KL123457', car: 'Audi', status: 'Active', date: '22/10/2023', amount: `${Math.floor(Math.random() * 500) + 100} €` },
    { rentalId: 'KL123458', car: 'Mercedes', status: 'Pending', date: '23/10/2023', amount: `${Math.floor(Math.random() * 500) + 100} €` },
    { rentalId: 'KL123459', car: 'Tesla', status: 'Completed', date: '24/10/2023', amount: `${Math.floor(Math.random() * 500) + 100} €` },
    { rentalId: 'KL123460', car: 'Toyota', status: 'Active', date: '25/10/2023', amount: `${Math.floor(Math.random() * 500) + 100} €` }
  ]); */
}