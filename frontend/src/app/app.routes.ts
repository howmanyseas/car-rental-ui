import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { DashComponent } from './components/dash/dash.component';
import { VehiclesTableComponent } from './components/vehicles-table/vehicles-table.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { DamageMarkerComponent } from './components/damage-marker/damage-marker.component';
import { VehicleRegistrationComponent } from './components/vehicle-registration/vehicle-registration.component';
import { VehicleRentalHistoryComponent } from './components/vehicle-rental-history/vehicle-rental-history.component';




export const routes: Routes = [
  // Public Routes
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'vehicles', component: VehiclesTableComponent },
  { path: 'edit-vehicle/:id', component: EditVehicleComponent },
  { path: 'add-vehicle', component: AddVehicleComponent },
  { path: 'vehicle-registration', component: VehicleRegistrationComponent },
  { path: 'vehicle-rental-history', component: VehicleRentalHistoryComponent },




  // Protected Routes (Inside Default Layout)
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'dashboard', component: DashComponent },
      { path: 'vehicles', component: VehiclesTableComponent },
      { path: 'add-vehicle', component: AddVehicleComponent },
      { path: 'vehicle-registration', component: VehicleRegistrationComponent },
      { path: 'vehicle-rental-history', component: VehicleRentalHistoryComponent },


      // Add more pages here
    ]
  },

  // Redirect any unknown route to login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
