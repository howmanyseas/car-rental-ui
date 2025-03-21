import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent), title: 'Login' },
  { path: 'forgot-password', loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent), title: 'Forgot Password' },
  { path: 'reset-password', loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent), title: 'Reset Password' },

  {
    path: '',
    loadComponent: () => import('./layouts/default-layout/default-layout.component').then(m => m.DefaultLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/dash/dash.component').then(m => m.DashComponent), title: 'Dashboard' },
      { path: 'vehicles', loadComponent: () => import('./components/vehicles-table/vehicles-table.component').then(m => m.VehiclesTableComponent), title: 'Vehicles' },
      { path: 'edit-vehicle/:id', loadComponent: () => import('./components/edit-vehicle/edit-vehicle.component').then(m => m.EditVehicleComponent), title: 'Edit Vehicle' },
      { path: 'add-vehicle', loadComponent: () => import('./components/add-vehicle/add-vehicle.component').then(m => m.AddVehicleComponent), title: 'Add Vehicle' },
      { path: 'vehicle-registration', loadComponent: () => import('./components/vehicle-registration/vehicle-registration.component').then(m => m.VehicleRegistrationComponent), title: 'Vehicle Registration' },
      { path: 'vehicle-rental-history', loadComponent: () => import('./components/vehicle-rental-history/vehicle-rental-history.component').then(m => m.VehicleRentalHistoryComponent), title: 'Vehicle Rental History' },
      { path: 'vehicle-maintenance-history', loadComponent: () => import('./components/vehicle-maintenance-history/vehicle-maintenance-history.component').then(m => m.VehicleMaintenanceHistoryComponent), title: 'Vehicle Maintenance History' },
      { path: 'check-in', loadComponent: () => import('./components/check-in/check-in.component').then(m => m.CheckInComponent), title: 'Check In' },
      { path: 'check-out', loadComponent: () => import('./components/check-out/check-out.component').then(m => m.CheckOutComponent), title: 'Check Out' },

    ]
  },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
