import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';
import { MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';

@Component({
  selector: 'app-vehicle-registration',
  templateUrl: './vehicle-registration.component.html',
  styleUrls: ['./vehicle-registration.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,          
    MatCardModule,
    MatDatepickerModule,       
    MatNativeDateModule,       
    MatToolbarModule,
    MatDivider,                
    MatDatepicker,             
    MatDatepickerToggle        
  ]
})
export class VehicleRegistrationComponent {

  constructor(private router: Router) {}

  save() {
    console.log("Vehicle Registration Saved");
    // Add backend API call or other save logic here
  }

  download() {
    console.log("Download button clicked");
    // Add download functionality here
  }
}
