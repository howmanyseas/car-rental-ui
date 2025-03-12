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

  constructor(private route: ActivatedRoute, private router: Router) {}
  displayedColumns = ['CarPart', 'Damage'];

  ngOnInit(): void {
    this.vehicle.carId = this.route.snapshot.paramMap.get('id') || '';
  }
  cancelBtn(){
    this.router.navigate(['/vehicles'])
  }
  addDamage() {
    this.damageHistory.push({ part: '', damage: '' });
  }

  removeDamage(item: DamageHistoryItem) {
    this.damageHistory = this.damageHistory.filter(d => d !== item);
  }
}
