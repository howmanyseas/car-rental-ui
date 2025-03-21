import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,

  ]
})
export class CheckInComponent implements OnInit {
  checkInForm!: FormGroup;
  showAdditionalFees = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.checkInForm = this.fb.group({
      rentalNumber: [''],
      mva: [''],
      checkOutPrice: [''],
      checkInPrice: [''],
      actualCheckOut: [''],
      actualCheckIn: [''],
      kmOut: [''],
      kmIn: [''],
      fuelOut: [''],
      fuelIn: [''],
      netAmount: [''],
      tax: [''],
      carTank: [''],
      cleaning: [''],
      damage: [''],
      grossAmount: ['']
    });
  }

  toggleAdditionalFees() {
    this.showAdditionalFees = !this.showAdditionalFees;
  }
}
