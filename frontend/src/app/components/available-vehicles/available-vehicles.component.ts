import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AvailVehiclesTableDataSource, AvailVehiclesTableItem } from './available-vehicles-datasource';

@Component({
  selector: 'app-available-vehicles',
  templateUrl: './available-vehicles.component.html',
  styleUrls: ['./available-vehicles.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTable
  ]
})
export class AvailableVehiclesComponent implements OnInit, OnInit {
  dataSource: AvailVehiclesTableItem[] = [];
  @ViewChild(MatTable) table!: MatTable<AvailVehiclesTableItem>;
  displayedColumns: string[] = ['carId', 'plate', 'model', 'color', 'status'];


  constructor(private router: Router) {

  }

  ngOnInit(): void {
    const vehiclesTableDataSource = new AvailVehiclesTableDataSource();
    vehiclesTableDataSource.connect().subscribe((data: AvailVehiclesTableItem[]) => {
      this.dataSource = data;
    });
  }

}
