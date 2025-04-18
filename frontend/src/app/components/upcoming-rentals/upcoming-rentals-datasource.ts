import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

export interface UpcomingRentalListsItem {
  rentalId: string;
  customer: string;
  car: string;
  employee: string;
  checkOutPrice: number;
  checkOut: Date;
  checkIn: Date;
  status: string;
}

export class UpcomingRentalListsDataSource extends DataSource<UpcomingRentalListsItem> {
  data: UpcomingRentalListsItem[] = [
    { rentalId: '1', customer: 'John Doe', car: 'Toyota', employee: 'Alice', checkOutPrice: 150, checkOut: new Date(), checkIn: new Date(), status: 'Upcoming' },
    { rentalId: '2', customer: 'Jane Smith', car: 'Honda', employee: 'Bob', checkOutPrice: 200, checkOut: new Date(), checkIn: new Date(), status: 'Upcoming' },
  ];

  connect(): Observable<UpcomingRentalListsItem[]> {
    return of(this.data);
  }

  disconnect(): void { }
}
