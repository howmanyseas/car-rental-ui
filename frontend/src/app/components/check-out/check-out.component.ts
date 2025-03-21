import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDivider,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelect,
    MatOption,
    MatRadioModule,
    MatIcon,
    MatButtonToggleModule,
  ],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  pricingFormGroup!: FormGroup;
  customerFormGroup!: FormGroup;
  selectedFile: File | null = null;
  carInformationFormGroup!: FormGroup;

  summary = {
    rentalId: '0000001',
    firstName: 'HHHHH',
    lastName: 'HHHHH',
    netAmount: 0,
    extras: 0,
    grossAmount: 0,
  };
  showAdditionalFees = false;
  showDiscount = false;

  additionalFeeList = [
    { label: 'Additional Drivers', control: 'additionalDrivers', value: 50 },
    { label: 'Child Seat', control: 'childSeat', value: 30 },
    { label: 'Cross Borders', control: 'crossBorders', value: 40 },
    { label: 'Booster Seat', control: 'boosterSeat', value: 25 },
    { label: 'Insurance Lv.1', control: 'insuranceLv1', value: 60 },
    { label: 'Insurance Lv.1', control: 'insuranceLv2', value: 100 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.pricingFormGroup = this.fb.group({
      pricingOption: ['daily'],
      additionalFees: this.fb.array([]),
      discount: this.fb.group({
        discountPercent: [''],
        reason: [''],
        appliedBy: [''],
      }),
    });
    this.customerFormGroup = this.fb.group({
      academicTitle: [''],
      firstName: [''],
      lastName: [''],
      dob: [''],
      phone: [''],
      email: [''],
      street: [''],
      zip: [''],
      country: [''],
      houseNr: [''],
      city: [''],
      sameBillingAddress: ['yes'],
      companyName: [''],
      idType: [''],
      idNumber: [''],
      licenseNumber: [''],
      licenseCountry: [''],
      licenseExpiry: [''],
      customerNote: [''],
    });
    this.carInformationFormGroup = this.fb.group({
      mva: [''],
      carGroup: [{ value: 'Group A', disabled: true }],
      licensePlate: [{ value: 'AB123CD', disabled: true }],
      fuel: [{ value: 'Diesel', disabled: true }],
      carModel: [{ value: 'Toyota Corolla', disabled: true }],
      millage: [{ value: '25000 km', disabled: true }],
      color: [{ value: 'Blue', disabled: true }],
      status: [{ value: 'Available', disabled: true }],
      transmission: [{ value: 'Manual', disabled: true }],
    });
  }
  get additionalFees(): FormArray {
    return this.pricingFormGroup.get('additionalFees') as FormArray;
  }

  addAdditionalFee() {
    this.additionalFees.push(
      this.fb.group({
        feeType: [''],
        price: [''],
      })
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file.name);
    }
  }
  removeAdditionalFee(index: number) {
    this.additionalFees.removeAt(index);
  }
  toggleAdditionalFees() {
    this.showAdditionalFees = !this.showAdditionalFees;

    if (this.showAdditionalFees && this.additionalFees.length === 0) {
      this.addAdditionalFee();
    }
  }

  toggleDiscount() {
    this.showDiscount = !this.showDiscount;
  }
}
