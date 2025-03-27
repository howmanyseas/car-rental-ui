import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DamageMarkerComponent } from '../damage-marker/damage-marker.component';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class CheckInComponent implements OnInit {
  checkInForm!: FormGroup;
  showAdditionalFees = false;

  summary = {
    rentalId: '0000001',
    netAmount: 0,
    extras: 0,
    grossAmount: 0,
  };

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

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
      grossAmount: [''],
      additionalFees: this.fb.array([]), 
    });
  }

  get additionalFees(): FormArray {
    return this.checkInForm.get('additionalFees') as FormArray;
  }

  toggleAdditionalFees() {
    this.showAdditionalFees = !this.showAdditionalFees;
    if (this.showAdditionalFees && this.additionalFees.length === 0) {
      this.addAdditionalFees();
    }
  }

  addAdditionalFees() {
    this.additionalFees.push(
      this.fb.group({
        feeType: [''],
        price: [''],
      })
    );
  }

  removeAdditionalFee(index: number) {
    this.additionalFees.removeAt(index);
  }

  addDamage() {
    const dialogRef = this.dialog.open(DamageMarkerComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Damage coordinates:', result);
        // Save to database later
      }
    });
  }
}
