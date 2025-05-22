import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatStepperModule } from '@angular/material/stepper';

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
    NgxMaterialTimepickerModule,
    MatStepperModule
  ],
})
export class CheckInComponent implements OnInit {
  checkInForm!: FormGroup;
  showAdditionalFees = false;
  actualCheckOutDateControl = new FormControl();
  actualCheckOutTimeControl = new FormControl();

  actualCheckInDateControl = new FormControl();
  actualCheckInTimeControl = new FormControl();

  checkoutDatetime = new FormControl();
  checkinDatetime = new FormControl();
  summary = {
    rentalId: '0000001',
    netAmount: 0,
    extras: 0,
    grossAmount: 0,
  };
  feeTypePriceMap: { [key: string]: number } = {
    tax: 50,
    cleaning: 30,
    carTank: 40,
    damage: 25,
    aiport: 25,
    delayed: 10,
  };
  carInformationFormGroup!: FormGroup;


  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.checkInForm = this.fb.group({
      rentalNumber: [''],
      mva: [''],
      checkOutPrice: [''],
      checkInPrice: [''],
      actualCheckOut: [null],
      actualCheckIn: [null],
      actualCheckOutDate: [''],        
      actualCheckOutTime: [''],        
      actualCheckInDate: [''],         
      actualCheckInTime: [''],         
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
      mileageExtra: [''],              
      amountOnHold: [''],             
      paymentStatus: [''],            
      additionalFees: this.fb.array([]),
      fuelExtra: [''],

    });

    this.carInformationFormGroup = this.fb.group({
      mva: [''],
      carGroup: [''],
      licensePlate: [''],
      fuel: [''],
      carModel: [''],
      millage: [''],
      color: [''],
      status: [''],
      transmission: [''],
    });

  }

  get additionalFees(): FormArray {
    return this.checkInForm.get('additionalFees') as FormArray;
  }
  updateActualCheckOut() {
    const date = this.actualCheckOutDateControl.value;
    const time = this.actualCheckOutTimeControl.value;
    if (date && time) {
      const [hours, minutes] = time.split(':');
      const combined = new Date(date);
      combined.setHours(+hours);
      combined.setMinutes(+minutes);
      this.checkoutDatetime.setValue(combined);
    }
  }

  updateActualCheckIn() {
    const date = this.actualCheckInDateControl.value;
    const time = this.actualCheckInTimeControl.value;
    if (date && time) {
      const [hours, minutes] = time.split(':');
      const combined = new Date(date);
      combined.setHours(+hours);
      combined.setMinutes(+minutes);
      this.checkinDatetime.setValue(combined);
    }
  }
  toggleAdditionalFees() {
    this.showAdditionalFees = !this.showAdditionalFees;
    if (this.showAdditionalFees && this.additionalFees.length === 0) {
      this.addAdditionalFees();
    }
  }
  focusNext(event: Event) {
    event.preventDefault();

    const keyboardEvent = event as KeyboardEvent;
    const form = keyboardEvent.currentTarget as HTMLElement;

    const inputs = Array.from(
      form.querySelectorAll('input, select, textarea, button')
    ) as HTMLElement[];

    const index = inputs.indexOf(keyboardEvent.target as HTMLElement);
    if (index > -1 && index + 1 < inputs.length) {
      inputs[index + 1].focus();
    }
  }

  addAdditionalFees() {
    const feeGroup = this.fb.group<{ feeType: FormControl<string | null>, price: FormControl<number | null> }>({
      feeType: this.fb.control(null),
      price: this.fb.control(null),
    });

    const feeTypeControl = feeGroup.get('feeType');
    const priceControl = feeGroup.get('price');

    feeTypeControl?.valueChanges.subscribe((selectedType) => {
      if (selectedType && selectedType in this.feeTypePriceMap && !priceControl?.dirty) {
        priceControl?.setValue(this.feeTypePriceMap[selectedType]);
      } else {
        priceControl?.setValue(null);
      }
    });

    this.additionalFees.push(feeGroup);
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
