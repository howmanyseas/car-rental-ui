import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatNativeDateModule,
  MatOption,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
} from '@angular/material/core';
import { default as _rollupMoment, Moment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { UploadOptionsComponent } from '../upload-options.component';

const moment = _rollupMoment || _moment;
const MONTH_YEAR_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
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
    UploadOptionsComponent
  ],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MONTH_YEAR_FORMATS
    }
  ]
})
export class CheckOutComponent implements OnInit {
  isMobile = false;
  pricingFormGroup!: FormGroup;
  customerFormGroup!: FormGroup;
  carInformationFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;

  selectedFile: File | null = null;

  showAdditionalFees = false;
  showDiscount = false;

  summary = {
    rentalId: '0000001',
    firstName: 'HHHHH',
    lastName: 'HHHHH',
    netAmount: 0,
    extras: 0,
    grossAmount: 0,
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.pricingFormGroup = this.fb.group({
      carGroup: [''],
      priceType: [''],
      fixedPrice: [''],
      duration: [''],
      checkOutDate: [''],
      checkInDate: [''],
      tax: [''],
      netAmount: [''],
      grossAmount: [''],
      additionalFees: this.fb.array([]),
      discountPercentage: [''],
      discountReason: [''],
      discountAppliedBy: [''],
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
      driverSameAsRenter: ['yes'],
      driverDetails: this.fb.group({
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
        licenseNumber: [''],
        licenseCountry: [''],
        licenseExpiry: [''],
      })
    });
    this.customerFormGroup.get('driverSameAsRenter')?.valueChanges.subscribe(() => {
      this.updateDriverDetails();
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

    this.paymentFormGroup = this.fb.group({
      cardType: [''],
      cardNumber: [''],
      nameOnCard: [''],
      expiryDate: [''],
      cvv: [''],
      amountOnHold: [''],
      checkoutGrossAmount: [''],
      paymentDate: [''],
      paymentStatus: [''],
    });

    this.detectDevice();
    window.addEventListener('resize', this.detectDevice.bind(this));


  }
  detectDevice() {
    this.isMobile = window.innerWidth <= 768;
  }
  updateDriverDetails() {
    if (this.customerFormGroup.get('driverSameAsRenter')?.value === 'yes') {
      const renterDetails = this.customerFormGroup.value;
      this.customerFormGroup.patchValue({
        driverDetails: {
          academicTitle: renterDetails.academicTitle,
          firstName: renterDetails.firstName,
          lastName: renterDetails.lastName,
          dob: renterDetails.dob,
          phone: renterDetails.phone,
          email: renterDetails.email,
          street: renterDetails.street,
          zip: renterDetails.zip,
          country: renterDetails.country,
          houseNr: renterDetails.houseNr,
          city: renterDetails.city,
          licenseNumber: renterDetails.licenseNumber,
          licenseCountry: renterDetails.licenseCountry,
          licenseExpiry: renterDetails.licenseExpiry,
        }
      });
    } else {
      this.customerFormGroup.get('driverDetails')?.reset();
    }
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

  removeAdditionalFee(index: number) {
    this.additionalFees.removeAt(index);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file.name);
    }
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


  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrl = this.paymentFormGroup.get('expiryDate');
    if (ctrl) {
      // Create a moment object with only month and year
      const selectedDate = moment().year(normalizedMonthAndYear.year())
        .month(normalizedMonthAndYear.month())
        .date(1); // Set to first of the month
      ctrl.setValue(selectedDate);
    }
    datepicker.close();
  }
}
