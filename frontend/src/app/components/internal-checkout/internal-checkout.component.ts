import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-internal-checkout',
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
    NgxMaterialTimepickerModule,
  ],
  templateUrl: './internal-checkout.component.html',
  styleUrl: './internal-checkout.component.scss'
})
export class InternalCheckoutComponent {
  employeeCheckOutForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeCheckOutForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      department: [''],
      carGroup: [''],
      licensePlate: [''],
      dateTaken: [''],
      timeTaken: [''],
      reason: [''],
      checkoutlocation:[''],
      checkinlocation:[''],


    });
  }

  saveEmployeeForm() {
    console.log('✅ Employee Car Usage:', this.employeeCheckOutForm.value);
    // API call or logic goes here
  }
}
