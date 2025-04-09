import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,  // Add FormControl if needed for individual fields
} from '@angular/forms';
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
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-prices',
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
    RouterModule,
  ],
  templateUrl: './update-prices.component.html',
  styleUrl: './update-prices.component.scss',
})
export class UpdatePricesComponent implements OnInit {
  updatePricesForm!: FormGroup;

  checkOutVisible = false;
  checkInVisible = false;

  toggleCheckOut() {
    this.checkOutVisible = !this.checkOutVisible;
  }

  toggleCheckIn() {
    this.checkInVisible = !this.checkInVisible;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.updatePricesForm = this.fb.group({
      carGroup: new FormControl(''),
      priceType: new FormControl(''),
      changeFrom: new FormControl(''),
      changeTo: new FormControl(''),
      taxFrom: new FormControl(''),
      taxTo: new FormControl(''),
      additionalFee: new FormControl(''),
      additionalFeeType: new FormControl(''),
      additionalFeeFrom: new FormControl(''),
      additionalFeeTo: new FormControl(''),
      discount: new FormControl(''),
      discountType: new FormControl(''),
      discountFrom: new FormControl(''),
      discountTo: new FormControl(''),
      
        });
  }

  goback() {
    this.router.navigate(['/user-profile']);
  }
}
