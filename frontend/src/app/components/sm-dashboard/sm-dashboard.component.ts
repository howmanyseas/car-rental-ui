import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

interface Stat { label: string; value: number; route?: string; }
interface Row { category: string;[key: string]: any; }

@Component({
  selector: 'app-sm-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './sm-dashboard.component.html',
  styleUrls: ['./sm-dashboard.component.scss']
})
export class SmDashboardComponent implements OnInit {
  constructor(private router: Router) { }

  stats: Stat[] = [
    { label: 'Owned', value: Math.floor(Math.random() * 20) },
    { label: 'Unavailable', value: Math.floor(Math.random() * 20) },
    { label: 'On Rent', value: Math.floor(Math.random() * 20), route: '/rental-lists' },
    { label: 'Closed Rentals', value: Math.floor(Math.random() * 20), },
    { label: 'Overdue', value: Math.floor(Math.random() * 20) },
    { label: 'Idle', value: Math.floor(Math.random() * 20) },
    { label: 'Out of Service', value: Math.floor(Math.random() * 20) },

  ];

  viewModes: ('week' | 'day')[] = ['week', 'day'];
  viewMode: 'week' | 'day' = 'week';
  weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  selectedWeek = this.weeks[0];
  selectedDate = new Date();

  categories = ['On Hand', 'Due In', 'Res D/I', 'Stn-Inv', 'Veh-Rsvd', 'Available'];
  tableData: Row[] = [];

  ngOnInit(): void {
    this.generateTableData();
  }

  onStatClick(stat: Stat): void {
    if (stat.route) {
      this.router.navigate([stat.route]);
    }
  }

  setViewMode(mode: 'week' | 'day'): void {
    this.viewMode = mode;
    this.generateTableData();
  }

  onWeekSelect(week: string): void {
    this.selectedWeek = week;
    this.generateTableData();
  }

  onDateSelect(date: Date): void {
    this.selectedDate = date;
    this.generateTableData();
  }

  private generateTableData(): void {
    const days = this.displayedDays;
    this.tableData = this.categories.map(cat => {
      const row: Row = { category: cat };
      days.forEach(d => row[d] = Math.floor(Math.random() * 10));
      return row;
    });
  }

  private getStartOfWeek(d: Date): Date {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  get displayedDays(): string[] {
    if (this.viewMode === 'day') {
      return [this.selectedDate.toLocaleDateString('en-US', { weekday: 'short' })];
    }
    const start = this.getStartOfWeek(this.selectedDate);
    return Array.from({ length: 7 }).map((_, i) =>
      new Date(start.getTime() + i * 86400000)
        .toLocaleDateString('en-US', { weekday: 'short' })
    );
  }

  get displayedColumns(): string[] {
    return ['category', ...this.displayedDays];
  }
}
