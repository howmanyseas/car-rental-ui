import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RentalListsDataSource, RentalListsItem } from './rental-lists-datasource';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-rental-lists',
  templateUrl: './rental-lists.component.html',
  styleUrls: ['./rental-lists.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatButtonModule, 
    MatIconModule,
    RouterModule,

  ]
})
export class RentalListsComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<RentalListsItem>;
  dataSource = new RentalListsDataSource();
  constructor(private router: Router) { }

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

  ngAfterViewInit(): void {
  
    this.table.dataSource = this.dataSource;
  }
  gotoCheckOut(){
    this.router.navigate(['/check-out']);

  }
}
