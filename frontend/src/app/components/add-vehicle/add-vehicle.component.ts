import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

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

interface DamageHistoryItem {
  part: string;
  damage: string;
}

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss',
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
export class AddVehicleComponent {
  vehicle: Vehicle = {} as Vehicle;
  damageHistory: DamageHistoryItem[] = [];
  displayedColumns = ['CarPart', 'Damage'];

  constructor(private router: Router) {}

  addVehicle() {
    // TODO: Implement backend API call to save the new vehicle
    this.router.navigate(['/vehicle-registration']);
  }

  cancelBtn() {
    this.router.navigate(['/vehicles']);
  }

  addDamage() {
    this.damageHistory.push({ part: '', damage: '' });
  }

  removeDamage(index: number) {
    this.damageHistory.splice(index, 1);
  }
}
