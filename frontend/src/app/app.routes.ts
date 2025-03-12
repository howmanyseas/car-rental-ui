import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { DashComponent } from './components/dash/dash.component';
import { VehiclesTableComponent } from './components/vehicles-table/vehicles-table.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';

export const routes: Routes = [
  // Public Routes
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'vehicles', component: VehiclesTableComponent },
  { path: 'edit-vehicle/:id', component: EditVehicleComponent }, // Route with vehicle ID


  // Protected Routes (Inside Default Layout)
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'dashboard', component: DashComponent },
      { path: 'vehicles', component: VehiclesTableComponent },

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
