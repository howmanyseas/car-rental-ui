import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, FormsModule } from '@angular/forms';
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
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
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
    NgxMaterialTimepickerModule,
    MatCardModule,
    MatDivider,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelect,
    MatOption,
    FormsModule,
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
      useValue: FULL_DATE_FORMATS // This is for full-date pickers
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
      tax: new FormControl({ value: '', disabled: true }),
      netAmount: new FormControl({ value: '', disabled: true }),
      grossAmount: new FormControl({ value: '', disabled: true }),
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
      idExpiry: [''],
      licenseNumber: [''],
      licenseCountry: [''],
      licenseIssued: [''],
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
      expiryDate: new FormControl(null), // Full date: 2025-08-01
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
      price: new FormControl({ value: '', disabled: true }),
      kmCount: [''],
      airportName: [''],
      feeDuration: [''],     // New field
      maxPrice: new FormControl({ value: '', disabled: true }),        // New field
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
  isIdExpired(): boolean {
    const expiry = this.customerFormGroup.get('idExpiry')?.value;
    if (!expiry) return false;

    const today = new Date();
    return new Date(expiry) < today;
  }

  isLicenseRecent(): 'warning' | 'ok' | '' {
    const issued = this.customerFormGroup.get('licenseIssued')?.value;

    if (!issued) return '';

    const issuedDate = new Date(issued);
    const today = new Date();

    const diffInMonths =
      (today.getFullYear() - issuedDate.getFullYear()) * 12 +
      today.getMonth() - issuedDate.getMonth();

    if (diffInMonths < 3) {
      return 'warning';  // License too recent
    }

    if (diffInMonths >= 6) {
      return 'ok';       // License older than 6 months
    }

    return ''; // Between 3 and 6 months: no icon
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
  get expiryDateControl(): FormControl {
    return this.paymentFormGroup.get('expiryDate') as FormControl;
  }

  get initialExpiryMoment(): Moment {
    const val = this.expiryDateControl.value;
    return val ? moment(val) : moment();
  }

  selectExpiryMonth(month: Moment, datepicker: MatDatepicker<Moment>) {
    const date = month.startOf('month').toDate(); // e.g. 2025-08-01
    this.expiryDateControl.setValue(date);
    datepicker.close();
  }

  preventTyping(event: Event) {
    event.preventDefault();
  }



  showYoungDriverNotice(): boolean {
    const dob = this.customerFormGroup.get('dob')?.value;
    if (!dob) return false;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= 18 && age <= 21;
  }

}
