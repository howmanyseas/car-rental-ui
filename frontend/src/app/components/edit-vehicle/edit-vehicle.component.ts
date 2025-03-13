import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DamageMarkerComponent } from '../damage-marker/damage-marker.component';


interface DamageHistoryItem {
  part: string;
  damage: string;
}

interface Vehicle {
  carId: string;
  model: string;
  color: string;
  fuel: string;
  millage: string;
  mva: string;
  transmission: string;
  tireType: string;
  fuelLevel: string;
  tuvInspection: string;
  licencePlate: string;
  brand: string;
  equipment: string;
  status: string;
}

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule
  ]
})
export class EditVehicleComponent implements OnInit {
  vehicle: Vehicle = {} as Vehicle;
  damageHistory: DamageHistoryItem[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }
  displayedColumns = ['CarPart', 'Damage'];

  ngOnInit(): void {
    this.vehicle.carId = this.route.snapshot.paramMap.get('id') || '';
  }
  cancelBtn() {
    this.router.navigate(['/vehicles'])
  }

  addDamage() {
    const dialogRef = this.dialog.open(DamageMarkerComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Damage coordinates:', result);
        // TODO: Save to database later
      }
    });
  }

  viewMaintenanceHistory() {
    console.log("View Maintenance History clicked!");
    this.router.navigate(['/vehicle-maintenance-history'])
    // TODO: Open a dialog or navigate to maintenance history page
  }

  removeDamage(item: DamageHistoryItem) {
    this.damageHistory = this.damageHistory.filter(d => d !== item);
  }
}
