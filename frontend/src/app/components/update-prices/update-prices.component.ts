import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
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
  // Data for grouped select
  feeGroups = [
    {
      name: 'Car Group',
      options: [
        { value: 'groupA', viewValue: 'IDMR' },
        { value: 'groupB', viewValue: 'CDMR' },
      ]
    },
    {
      name: 'Additional Fees',
      options: [
        { value: 'insurance', viewValue: 'Insurance' },
        { value: 'crossBorder', viewValue: 'Cross Border' },
        { value: 'childSeat', viewValue: 'Child Seat' },
      ]
    }
  ];
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
  ) { }

  ngOnInit() {
    this.updatePricesForm = this.fb.group({
      additionalFee: new FormControl(''),
      additionalFeeType: new FormControl(''),
      additionalFeeFrom: new FormControl(''),
      additionalFeeTo: new FormControl(''),
      // ...other form controls
    });
  }

  goback() {
    this.router.navigate(['/user-profile']);
  }
}
