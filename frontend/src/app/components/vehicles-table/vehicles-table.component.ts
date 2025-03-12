import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VehiclesTableDataSource, VehiclesTableItem } from './vehicles-table-datasource';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrl: './vehicles-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule]
})
export class VehiclesTableComponent implements AfterViewInit {

  constructor(private router: Router) {}

  editVehicle(vehicle: VehiclesTableItem) {
    this.router.navigate(['/edit-vehicle', vehicle.carId]);
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<VehiclesTableItem>;

  dataSource = new VehiclesTableDataSource();

  /** Columns displayed in the table. */
  displayedColumns = ['carId', 'plate', 'model', 'color', 'year', 'actions'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  gotoNewCar(){
    this.router.navigate(['/add-vehicle']);

  }
}

