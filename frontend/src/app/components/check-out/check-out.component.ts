import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { UploadOptionsComponent } from '../upload-options.component';

const moment = _rollupMoment || _moment;
const FULL_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/YY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMMM YY',
    dateA11yLabel: 'MMMM YY',
    monthYearA11yLabel: 'MMMM YY',
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
    NgxMaterialTimepickerModule,
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
      useValue: FULL_DATE_FORMATS
    }
  ]
})
export class CheckOutComponent implements OnInit {
  isMobile = false;
  pricingFormGroup!: FormGroup;
  customerFormGroup!: FormGroup;
  feeGroup: FormGroup = new FormGroup({});
  carInformationFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;
  CheckOutTimeControl = new FormControl();
  CheckInTimeControl = new FormControl();
  CheckOutDateControl = new FormControl();
  CheckInDateControl = new FormControl();
  checkoutDatetime = new FormControl();
  checkinDatetime = new FormControl();
  selectedFile: File | null = null;
  additionalDriverForms: FormGroup[] = [];

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
    this.feeGroup = this.fb.group({
      feeType: [''],
      price: [''],
    });

    this.customerFormGroup = this.fb.group({
      academicTitle: [''],
      firstName: [''],
      lastName: [''],
      dob: [''],
      phone: [''],
      email: [''],
      street: [''],
      address2: [''],
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
      authorizationCode: [''],
    });

    this.detectDevice();
    window.addEventListener('resize', this.detectDevice.bind(this));


  }
  updateActualCheckOut() {
    const date = this.CheckOutDateControl.value;

    const time = this.CheckOutTimeControl.value;
    if (date && time) {
      const [hours, minutes] = time.split(':');
      const combined = new Date(date);
      combined.setHours(+hours);
      combined.setMinutes(+minutes);
      this.checkoutDatetime.setValue(combined);
    }
  }

  updateActualCheckIn() {
    const date = this.CheckInDateControl.value;
    const time = this.CheckInTimeControl.value;
    if (date && time) {
      const [hours, minutes] = time.split(':');
      const combined = new Date(date);
      combined.setHours(+hours);
      combined.setMinutes(+minutes);
      this.checkinDatetime.setValue(combined);
    }
  }
  detectDevice() {
    this.isMobile = window.innerWidth <= 768;
  }
  focusNext(event: Event) {
    event.preventDefault();

    const target = event.target as HTMLElement;
    const inputs = Array.from(document.querySelectorAll('input, select, textarea'))
      .filter(el => !el.hasAttribute('disabled'));

    const index = inputs.indexOf(target);
    if (index > -1 && index + 1 < inputs.length) {
      (inputs[index + 1] as HTMLElement).focus();
    }
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


  addAdditionalDriverForm() {
    const form = this.fb.group({
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
    });

    this.additionalDriverForms.push(form);
  }

  addAdditionalFee() {
    const feeGroup: FormGroup = this.fb.group({
      feeType: [''],
      price: [''],
      kmCount: [''],
      airportName: [''],
    });


    feeGroup.get('feeType')?.valueChanges.subscribe((value: string) => {
      if (value === 'Additional Drivers') {
        if (this.additionalDriverForms.length < 3) {
          this.addAdditionalDriverForm();
        } else {
          alert('Maximum of 3 additional drivers allowed.');
          feeGroup.get('feeType')?.reset();
        }
      } else {
        // reset extra fields if not selected
        feeGroup.get('kmCount')?.reset();
        feeGroup.get('airportName')?.reset();
      }
    });


    this.additionalFees.push(feeGroup);
  }

  calculateAge(dob: string | Date | null): number | '' {
    if (!dob) return '';

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
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
